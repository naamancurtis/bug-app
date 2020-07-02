use dynomite::{
    dynamodb::{AttributeValue, DynamoDb, DynamoDbClient, UpdateItemInput},
    retry::{Policy, RetryingDynamoDb},
    Attributes, FromAttributes, Item, Retries,
};

use common::project::{Project, ProjectIdentifierWrapper};
use lambda::handler_fn;
use log::{debug, info};
use serde::Deserialize;
use std::collections::HashMap;
use std::env::var;

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[derive(Deserialize, Debug, Clone)]
struct UpdateProjectRequest {
    #[serde(rename = "projectId")]
    project_id: String,
    update: UpdateProject,
}

#[derive(Deserialize, Debug, Clone)]
enum UpdateProject {
    AddProjectMember(String),
    RemoveProjectMember(String),
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::init_by_env();

    let db_client = DynamoDbClient::new(Default::default()).with_retries(Policy::default());
    let func =
        handler_fn(move |request: UpdateProjectRequest| update_project(request, db_client.clone()));
    lambda::run(func).await?;

    Ok(())
}

async fn update_project(
    request: UpdateProjectRequest,
    db_client: RetryingDynamoDb<DynamoDbClient>,
) -> Result<Project, Error> {
    debug!("[Project: Update] Request: {:?}", request);

    let project_key = ProjectIdentifierWrapper::new(request.project_id.clone());

    let mut dynamo_db_update = UpdateItemInput {
        table_name: var("BUG_APP_DYNAMO_TABLE")?,
        key: project_key.key(),
        return_values: Some("ALL_NEW".to_string()),
        ..UpdateItemInput::default()
    };
    // Set up the types for the specific arguments required in the input
    let mut expression_attribute_names = HashMap::new();
    let mut expression_attribute_values = Attributes::new();

    match request.update {
        UpdateProject::AddProjectMember(member) => {
            info!(
                "[Project: Update] Adding Member: {} to Project {}",
                member, project_key.project_id
            );
            expression_attribute_names.insert("#members".to_string(), "members".to_string());

            expression_attribute_values.insert(
                ":member".to_string(),
                string_set_attribute_value_creator(member),
            );

            dynamo_db_update.update_expression = Some("ADD #members :member".to_string());
        }
        UpdateProject::RemoveProjectMember(member) => {
            info!(
                "[Project: Update] Deleting Member: {} from Project {}",
                member, project_key.project_id
            );
            expression_attribute_names.insert("#members".to_string(), "members".to_string());

            expression_attribute_values.insert(
                ":deletedMember".to_string(),
                string_set_attribute_value_creator(member),
            );

            dynamo_db_update.update_expression = Some("Delete #members :deletedMember".to_string());
        }
    };

    // Update the actual update item with whatever was configured
    if !expression_attribute_names.is_empty() {
        dynamo_db_update.expression_attribute_names = Some(expression_attribute_names);
    }
    if !expression_attribute_values.is_empty() {
        dynamo_db_update.expression_attribute_values = Some(expression_attribute_values);
    }

    debug!(
        "[Project: Update] Built Update Request {:?}",
        dynamo_db_update
    );

    let result = db_client.update_item(dynamo_db_update).await?;

    debug!("[Project: Update] UpdateItem Result: {:?}", result);

    match result.attributes {
        Some(update) => Ok(Project::from_attrs(update)?),
        None => Err("update failed".into()),
    }
}

fn string_set_attribute_value_creator(string: String) -> AttributeValue {
    AttributeValue {
        ss: Some(vec![string]),
        ..AttributeValue::default()
    }
}
