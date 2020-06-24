use dynomite::{
    dynamodb::{DynamoDb, DynamoDbClient, PutItemInput, UpdateItemInput},
    retry::{Policy, RetryingDynamoDb},
    Retries,
};
use serde_json::Value;
use uuid::Uuid;

use common::project::Project;
use lambda::lambda;

use lambda::handler_fn;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_with_level(log::Level::Debug).expect("This logger hates you");

    let func = handler_fn(create_project);
    lambda::run(func).await?;

    Ok(())
}

async fn create_project(e: Value) -> Result<Value, Error> {
    Ok(e)
}

// #[lambda]
// #[tokio::main]
// async fn main(event: Value) -> Result<Value, Error> {
//     simple_logger::init_with_level(log::Level::Debug)?;
//     let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());

//     let result = db_client
//         .put_item(PutItemInput {
//             table_name: std::env::var("TABLE_NAME")?,
//             return_values: Some("ALL_NEW".to_string()),
//             item: Project {
//                 project_id: String::from("Temp"),
//                 bug_id: 0,
//                 name: event["name"].to_string().clone(),
//             }
//             .into(),
//             ..PutItemInput::default()
//         })
//         .await?;
//     // let result = db_client
//     //     .update_item(UpdateItemInput {
//     //         table_name: std::env::var("TABLE_NAME")?,
//     //         return_values: Some("ALL_NEW".to_string()),
//     //         update_expression: Some(format!(
//     //             "SET {}",
//     //             Project {
//     //                 project_id: Uuid::new_v4(),
//     //                 bug_id: "".to_string(),
//     //                 name: event["name"].to_string().clone(),
//     //             }
//     //             .into()
//     //         )),
//     //         ..UpdateItemInput::default()
//     //     })
//     //     .await?;

//     match result.attributes {
//         Some(update) => Ok("".into()),
//         None => Err("update failed".into()),
//     }
// }

// fn main() -> Result<(), Error> {
//     let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());
//     let table_name = std::env::var("TABLE_NAME").expect("Unable to find table name");

//     lambda!(move |request: Request, context: Context| {
//         create_project(request, context, db_client.clone())
//     });
//     Ok(())
// }

// async fn create_project(
//     request: Request,
//     context: Context,
//     db_client: RetryingDynamoDb<DynamoDbClient>,
// ) -> Result<Response<Body>, HandlerError> {
//     if let Body::Text(body) = request.body() {
//         let body: serde_json::Value = serde_json::from_str(&body)?;
//         let result = db_client
//             .put_item(PutItemInput {
//                 table_name: std::env::var("TABLE_NAME")?,
//                 item: Project {
//                     project_id: Uuid::new_v4(),
//                     bug_id: "".to_string(),
//                     name: body["name"].to_string().clone(),
//                 }
//                 .into(),
//                 ..PutItemInput::default()
//             })
//             .await
//             .unwrap();

//         return Ok(Response::builder()
//             .status(StatusCode::OK)
//             .body("".into())
//             .unwrap());
//     }
//     Ok(Response::builder()
//         .status(StatusCode::INTERNAL_SERVER_ERROR)
//         .body("".into())
//         .unwrap())
// }
