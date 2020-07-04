use common::bug::Bug;
use dynomite::{
    dynamodb::{AttributeValue, DynamoDb, DynamoDbClient, QueryInput},
    retry::{Policy, RetryingDynamoDb},
    FromAttributes, Retries,
};
use lambda::handler_fn;
use log::{debug, info};
use serde::Deserialize;
use std::collections::HashMap;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Deserialize, Debug, Clone, Default)]
struct GetBugsRequest {
    #[serde(rename = "projectId")]
    project_id: String,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let func = handler_fn(move |request: GetBugsRequest| get_bugs(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn get_bugs(
    request: GetBugsRequest,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<Vec<Bug>, Error> {
    info!("[Bugs: Get] Request for all bugs in project: {:?}", request);

    let mut expression_attribute_values = HashMap::new();
    expression_attribute_values.insert(
        ":projectId".to_string(),
        AttributeValue {
            s: Some(request.project_id),
            ..AttributeValue::default()
        },
    );

    let result = db_client
        .query(QueryInput {
            table_name: std::env::var("BUG_APP_BUG_TABLE")?,
            key_condition_expression: Some("projectId = :projectId".to_string()),
            expression_attribute_values: Some(expression_attribute_values),
            ..QueryInput::default()
        })
        .await?;

    debug!(
        "[Bugs: Get] Made request to database, received: {:?}",
        result
    );

    if result.items.is_some() {
        let bugs: Vec<Bug> = result
            .items
            .expect("already checked this")
            .into_iter()
            .flat_map(Bug::from_attrs)
            .collect();

        debug!("[Bugs: Get] Returning bugs: {:?}", bugs);

        return Ok(bugs);
    }

    Ok(Vec::new())
}
