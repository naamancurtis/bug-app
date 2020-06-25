use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, GetItemInput, PutItemInput},
    retry::Policy,
    FromAttributes, Item, Retries,
};

use common::project::{CreateNewProjectRequest, Project};
use lambda::handler_fn;
use log::debug;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();

    let func = handler_fn(create_project);
    lambda::run(func).await?;

    Ok(())
}

async fn create_project(request: CreateNewProjectRequest) -> Result<Project, Error> {
    debug!("Request: {:?}", request);
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let project: Project = request.into();
    let key = project.key();
    let table_name = std::env::var("BUG_APP_DYNAMO_TABLE")?;

    let creation_result = db_client
        .clone()
        .put_item(PutItemInput {
            table_name: table_name.clone(),
            item: project.into(),
            ..PutItemInput::default()
        })
        .await?;

    debug!("Creation result: {:?}", creation_result);

    debug!("Key for GetItem(), {:?}", key);

    let result = db_client
        .get_item(GetItemInput {
            table_name,
            key,
            ..GetItemInput::default()
        })
        .await?;

    debug!("Get result: {:?}", result);

    match result.item {
        Some(new_project) => Ok(Project::from_attrs(new_project)?),
        None => Err("creation failed".into()),
    }
}
