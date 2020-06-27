use common::project::{Project, ProjectIdentifierWrapper};
use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, GetItemInput},
    retry::{Policy, RetryingDynamoDb},
    FromAttributes, Item, Retries,
};
use lambda::handler_fn;
use log::debug;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct GetProjectRequest {
    #[serde(rename = "projectId")]
    project_id: String,
}

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();

    // let func = handler_fn(get_project);
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());
    let func =
        handler_fn(move |request: GetProjectRequest| get_project(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn get_project(
    request: GetProjectRequest,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<Project, Error> {
    debug!("Request to get project: {:?}", request);
    let key = ProjectIdentifierWrapper::new(request.project_id.clone());

    let result = db_client
        .get_item(GetItemInput {
            table_name: std::env::var("BUG_APP_DYNAMO_TABLE")?,
            key: key.key(),
            ..GetItemInput::default()
        })
        .await?;

    debug!("Made request to database, received: {:?}", result);

    match result.item {
        Some(project) => Ok(Project::from_attrs(project)?),
        None => Err("failure to fetch project".into()),
    }
}
