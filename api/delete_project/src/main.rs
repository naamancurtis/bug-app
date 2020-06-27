use dynomite::{
    dynamodb::{DeleteItemInput, DynamoDb, DynamoDbClient},
    retry::{Policy, RetryingDynamoDb},
    Item, Retries,
};

use common::project::ProjectIdentifierWrapper;
use lambda::handler_fn;
use log::{debug, info};
use serde::Deserialize;
use std::env::var;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Deserialize, Debug, Clone, Default)]
struct DeleteProjectRequest {
    #[serde(rename = "projectId")]
    project_id: String,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();

    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let func =
        handler_fn(move |request: DeleteProjectRequest| delete_project(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn delete_project(
    request: DeleteProjectRequest,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<(), Error> {
    debug!("Request: {:?}", request);

    info!("Request to delete Project {:?}", request.project_id);

    let key = ProjectIdentifierWrapper::new(request.project_id);

    let table_name = var("BUG_APP_DYNAMO_TABLE")?;

    let result = db_client
        .delete_item(DeleteItemInput {
            table_name: table_name.clone(),
            key: key.key(),
            ..DeleteItemInput::default()
        })
        .await?;

    info!("Deletion result: {:?}", result);

    Ok(())
}
