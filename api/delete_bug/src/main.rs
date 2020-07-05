use dynomite::{
    dynamodb::{DeleteItemInput, DynamoDb, DynamoDbClient},
    retry::{Policy, RetryingDynamoDb},
    Item, Retries,
};
use lambda::handler_fn;
use log::{debug, info};
use serde::Deserialize;
use uuid::Uuid;

use common::bug::BugIdentifierWrapper;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Deserialize, Debug, Clone, Default)]
struct DeleteBugRequest {
    #[serde(rename = "projectId")]
    project_id: String,
    #[serde(rename = "bugId")]
    bug_id: Uuid,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let func = handler_fn(move |request: DeleteBugRequest| delete_bug(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn delete_bug(
    request: DeleteBugRequest,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<(), Error> {
    info!(
        "[Bug: Delete] Request to delete bug in project: {:?}",
        request
    );

    let key = BugIdentifierWrapper::new(request.project_id, request.bug_id);

    let result = db_client
        .delete_item(DeleteItemInput {
            table_name: std::env::var("BUG_APP_BUG_TABLE")?,
            key: key.key(),
            ..DeleteItemInput::default()
        })
        .await?;

    debug!("[Bug: Delete] Deletion Result: {:?}", result);

    Ok(())
}
