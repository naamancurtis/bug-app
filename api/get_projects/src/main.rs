use common::project::Project;
use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, ScanInput},
    retry::Policy,
    FromAttributes, Retries,
};
use lambda::handler_fn;
use log::debug;
use serde_json::Value;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_with_level(log::Level::Debug).expect("This logger hates you");

    let func = handler_fn(get_projects);
    lambda::run(func).await?;

    Ok(())
}

async fn get_projects(_: Value) -> Result<Vec<Project>, Error> {
    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

    let result = db_client
        .clone()
        .scan(ScanInput {
            table_name: std::env::var("BUG_APP_DYNAMO_TABLE")?,
            ..ScanInput::default()
        })
        .await?;

    debug!("Made request to lambda: {:?}", result);

    if result.items.is_some() {
        let projects: Vec<Project> = result
            .items
            .expect("already checked this")
            .into_iter()
            .flat_map(Project::from_attrs)
            .collect();

        debug!("Projects: {:?}", projects);

        return Ok(projects);
    }

    Ok(Vec::new())
}

// #[tokio::main]
// async fn main() -> Result<(), Error> {
//     simple_logger::init_with_level(log::Level::Debug)?;

//     lambda!(get_projects);
//     Ok(())
// }

// async fn get_projects(
//     request: Request,
//     context: Context,
// ) -> Result<impl IntoResponse, HandlerError> {
//     let db_client = DynamoDbClient::new(Default::default());

//     match db_client
//         .scan(ScanInput {
//             table_name: std::env::var("TABLE_NAME")?,
//             filter_expression: Some("bugId = :bug_id".into()),
//             expression_attribute_values: Some(attr_map!(
//                     "bug_id" => "".to_string()
//             )),
//             ..ScanInput::default()
//         })
//         .await
//     {
//         Ok(result) => {
//             let projects: Vec<Project> = result
//                 .items
//                 .unwrap()
//                 .into_iter()
//                 .filter_map(|project| Project::from_attrs(project).ok())
//                 .collect();

//             Ok(serde_json::json!(&projects).into_response())
//         }
//         Err(e) => {
//             error!("Internal Error: {:?}", e);
//             Ok(Response::builder()
//             .status(StatusCode::INTERNAL_SERVER_ERROR)
//             .body("internal error".into())
//             .unwrap())
//     }
// }
// }
