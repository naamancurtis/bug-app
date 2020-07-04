use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, GetItemInput, PutItemInput},
    retry::{Policy, RetryingDynamoDb},
    FromAttributes, Item, Retries,
};

use lambda::handler_fn;
use log::{debug, info};
use serde::Deserialize;
use std::env::var;
use uuid::Uuid;

use common::bug::Bug;
use common::priority::Priority;
use common::status::Status;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Deserialize, Debug, Clone, Item, Default)]
pub struct CreateBug {
    pub name: String,
    pub description: String,
    pub priority: Priority,
    pub status: Status,
}

impl CreateBug {
    fn convert_to_bug(self, project_id: String) -> Bug {
        Bug {
            id: Uuid::new_v4(),
            project_id,
            name: self.name,
            description: self.description,
            priority: self.priority,
            status: self.status,
        }
    }
}

#[derive(Deserialize, Debug, Clone, Default)]
struct CreateBugRequest {
    #[serde(rename = "projectId")]
    project_id: String,
    bug: CreateBug,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let func = handler_fn(move |request: CreateBugRequest| create_bug(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn create_bug(
    request: CreateBugRequest,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<Bug, Error> {
    info!("[Bug: Create] Request: {:?}", request);
    // Assign a custom ID here - regardless of what the front-end sends
    let bug = request.bug.convert_to_bug(request.project_id);

    let key = bug.key();
    let table_name = var("BUG_APP_BUG_TABLE")?;

    let creation_result = db_client
        .clone()
        .put_item(PutItemInput {
            table_name: table_name.clone(),
            item: bug.into(),
            ..PutItemInput::default()
        })
        .await?;

    debug!("[Bug: Create] PutItem result: {:?}", creation_result);

    let result = db_client
        .get_item(GetItemInput {
            table_name,
            key,
            ..GetItemInput::default()
        })
        .await?;

    info!("[Bug: Create] GetItem result: {:?}", result);

    match result.item {
        Some(new_bug) => Ok(Bug::from_attrs(new_bug)?),
        None => Err("create bug failed".into()),
    }
}
