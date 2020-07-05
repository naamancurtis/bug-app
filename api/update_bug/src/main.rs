use common::bug::{Bug, BugIdentifierWrapper};
use common::priority::Priority;
use common::status::Status;
use dynomite::{
    dynamodb::{
        AttributeValue, DynamoDb, DynamoDbClient, GetItemInput, PutItemInput, UpdateItemInput,
    },
    retry::{Policy, RetryingDynamoDb},
    Attributes, FromAttributes, Item, Retries,
};

use lambda::handler_fn;
use log::{debug, info};
use serde::Deserialize;
use std::collections::HashMap;
use std::env;
use uuid::Uuid;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Deserialize, Debug, Clone)]
struct UpdateBugRequest {
    #[serde(rename = "projectId")]
    project_id: String,
    #[serde(rename = "bugId")]
    bug_id: Uuid,
    update: UpdateBug,
}

#[derive(Deserialize, Debug, Clone)]
enum UpdateBug {
    Bug(Bug),
    Status(Status),
    Priority(Priority),
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();

    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());
    let func = handler_fn(move |request: UpdateBugRequest| update_bug(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn update_bug(
    request: UpdateBugRequest,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<Bug, Error> {
    debug!("[Bug: Update] Request: {:?}", request);

    let key = BugIdentifierWrapper::new(request.project_id.clone(), request.bug_id);
    let table_name = env::var("BUG_APP_BUG_TABLE")?;

    // If the request is to update the whole bug, do that
    if let UpdateBug::Bug(bug) = request.update {
        info!("[Bug: Update] Updating whole bug {:?}", bug);
        let key = bug.key();
        let result = db_client
            .put_item(PutItemInput {
                table_name: table_name.clone(),
                item: bug.into(),
                ..PutItemInput::default()
            })
            .await?;

        debug!("[Bug: Update] PutItem Result: {:?}", result);

        let result = db_client
            .get_item(GetItemInput {
                table_name,
                key,
                ..GetItemInput::default()
            })
            .await?;

        return match result.item {
            Some(update) => Ok(Bug::from_attrs(update)?),
            None => Err("update failed".into()),
        };
    }

    // Otherwise, create the specific update
    let mut dynamo_db_update = UpdateItemInput {
        table_name,
        key: key.key(),
        return_values: Some("ALL_NEW".to_string()),
        ..UpdateItemInput::default()
    };
    // Set up the types for the specific arguments required in the input
    let mut expression_attribute_names = HashMap::new();
    let mut expression_attribute_values = Attributes::new();

    match request.update {
        UpdateBug::Status(status) => {
            info!("[Bug: Update] Changing Status of: {} to {}", key.id, status);
            expression_attribute_names.insert("#status".to_string(), "status".to_string());

            expression_attribute_values.insert(
                ":status".to_string(),
                AttributeValue {
                    s: Some(status.to_string()),
                    ..AttributeValue::default()
                },
            );

            dynamo_db_update.update_expression = Some("SET #status =  :status".to_string());
        }
        UpdateBug::Priority(priority) => {
            info!(
                "[Bug: Update] Changing Priority of {} to {}",
                key.id, priority,
            );
            expression_attribute_names.insert("#priority".to_string(), "priority".to_string());

            expression_attribute_values.insert(
                ":priority".to_string(),
                AttributeValue {
                    s: Some(priority.to_string()),
                    ..AttributeValue::default()
                },
            );

            dynamo_db_update.update_expression = Some("SET #priority = :priority".to_string());
        }
        _ => unreachable!(), // Case is already covered above
    };

    // Update the actual update item with whatever was configured
    if !expression_attribute_names.is_empty() {
        dynamo_db_update.expression_attribute_names = Some(expression_attribute_names);
    }
    if !expression_attribute_values.is_empty() {
        dynamo_db_update.expression_attribute_values = Some(expression_attribute_values);
    }

    debug!("[Bug: Update] Built Update Request {:?}", dynamo_db_update);

    let result = db_client.update_item(dynamo_db_update).await?;

    debug!("[Bug: Update] UpdateItem Result: {:?}", result);

    match result.attributes {
        Some(update) => Ok(Bug::from_attrs(update)?),
        None => Err("update failed".into()),
    }
}
