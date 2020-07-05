use crate::priority::Priority;
use crate::status::Status;
use dynomite::Item;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct Bug {
    #[serde(rename = "projectId")]
    #[dynomite(rename = "projectId")]
    #[dynomite(partition_key)]
    pub project_id: String,
    #[dynomite(sort_key)]
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub priority: Priority,
    pub status: Status,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct BugIdentifierWrapper {
    #[serde(rename = "projectId")]
    #[dynomite(rename = "projectId")]
    #[dynomite(partition_key)]
    pub project_id: String,
    #[dynomite(sort_key)]
    pub id: Uuid,
}

impl BugIdentifierWrapper {
    pub fn new(project_id: String, bug_id: Uuid) -> Self {
        Self {
            project_id,
            id: bug_id,
        }
    }
}
