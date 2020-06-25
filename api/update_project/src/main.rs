use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, PutItemInput},
    retry::Policy,
    FromAttributes, Retries,
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
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());
    debug!("Request: {:?}", request);

    let project: Project = request.into();
    let project_name = project.name.clone();

    let result = db_client
        .put_item(PutItemInput {
            table_name: std::env::var("BUG_APP_DYNAMO_TABLE")?,
            item: project.into(),
            ..PutItemInput::default()
        })
        .await?;

    debug!("Result: {:?}", result);

    match result.attributes {
        Some(update) => Ok(Project::from_attrs(update)?),
        None => Err("update failed".into()),
    }
}
