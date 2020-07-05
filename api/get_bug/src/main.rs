use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, GetItemInput},
    retry::{Policy, RetryingDynamoDb},
    FromAttributes, Item, Retries,
};
use lambda::handler_fn;
use log::{debug, info};
use serde::Deserialize;
use uuid::Uuid;

use common::bug::{Bug, BugIdentifierWrapper};

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Deserialize, Debug, Clone, Default)]
struct GetBugRequest {
    #[serde(rename = "projectId")]
    project_id: String,
    #[serde(rename = "bugId")]
    bug_id: Uuid,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let func = handler_fn(move |request: GetBugRequest| get_bug(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn get_bug(
    request: GetBugRequest,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<Bug, Error> {
    info!("[Bug: Get] Request for bug in project: {:?}", request);

    let key = BugIdentifierWrapper::new(request.project_id, request.bug_id);

    let result = db_client
        .get_item(GetItemInput {
            table_name: std::env::var("BUG_APP_BUG_TABLE")?,
            key: key.key(),
            ..GetItemInput::default()
        })
        .await?;

    debug!(
        "[Bug: Get] Made request to database, received: {:?}",
        result
    );

    match result.item {
        Some(bug) => Ok(Bug::from_attrs(bug)?),
        None => Err("failure to find bug".into()),
    }
}
