use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, GetItemInput, PutItemInput},
    retry::{Policy, RetryingDynamoDb},
    FromAttributes, Item, Retries,
};

use common::bug::Bug;
use lambda::handler_fn;
use log::{debug, info};
use std::env::var;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let func = handler_fn(move |request: Bug| create_bug(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn create_bug(bug: Bug, db_client: RetryingDynamoDb<DynamoDbClient>) -> Result<Bug, Error> {
    info!("[Bug: Create] Request: {:?}", bug);

    let key = bug.key();
    let table_name = var("BUG_APP_DYNAMO_TABLE")?;

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
        Some(new_project) => Ok(Bug::from_attrs(new_project)?),
        None => Err("create bug failed".into()),
    }
}
