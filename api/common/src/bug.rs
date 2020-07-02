use crate::priority::Priority;
use crate::status::Status;
use dynomite::Item;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct Bug {
    #[serde(rename = "projectId")]
    #[dynomite(rename = "projectId")]
    #[dynomite(partition_key)]
    pub project_id: String,
    #[serde(rename = "bugId")]
    #[dynomite(rename = "bugId")]
    #[dynomite(sort_key)]
    pub bugId: u32,
    pub name: String,
    pub description: String,
    pub priority: Priority,
    pub status: Status,
}
