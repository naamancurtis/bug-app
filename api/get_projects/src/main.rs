use common::project::Project;
use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, ScanInput},
    retry::{Policy, RetryingDynamoDb},
    FromAttributes, Retries,
};
use lambda::handler_fn;
use log::debug;
use serde_json::Value;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let func = handler_fn(move |request: Value| get_projects(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn get_projects(
    r: Value,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<Vec<Project>, Error> {
    debug!("Request for all projects: {:?}", r);

    let result = db_client
        .scan(ScanInput {
            table_name: std::env::var("BUG_APP_DYNAMO_TABLE")?,
            ..ScanInput::default()
        })
        .await?;

    debug!("Made request to database, received: {:?}", result);

    if result.items.is_some() {
        let projects: Vec<Project> = result
            .items
            .expect("already checked this")
            .into_iter()
            .flat_map(Project::from_attrs)
            .collect();

        debug!("Returning projects: {:?}", projects);

        return Ok(projects);
    }

    Ok(Vec::new())
}
