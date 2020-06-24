use dynomite::Item;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct Project {
    #[dynomite(partition_key)]
    #[dynomite(rename = "projectId")]
    #[serde(rename = "projectId")]
    pub project_id: String,
    #[dynomite(sort_key)]
    #[dynomite(rename = "bugId")]
    #[serde(rename = "bugId")]
    pub bug_id: u32,
    pub name: String,
}
