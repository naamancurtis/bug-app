use dynomite::Item;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct Project {
    #[serde(rename = "projectId")]
    #[dynomite(rename = "projectId")]
    #[dynomite(partition_key)]
    pub project_id: String,
    #[serde(rename = "bugId")]
    #[dynomite(rename = "bugId")]
    #[dynomite(sort_key)]
    pub bug_id: u32,
    pub name: String,
    pub members: HashSet<String>,
}

impl Project {
    pub fn new(project_id: String, name: String) -> Self {
        let mut members = HashSet::new();
        // Todo - Need to add in whoever created this project when integrated with cognito
        // This is to do with the fact that DynamoDB can't have an empty string set.
        members.insert("Root User".to_string());
        Self {
            project_id,
            name,
            members,
            ..Project::default()
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct ProjectIdentifierWrapper {
    #[dynomite(rename = "projectId")]
    #[dynomite(partition_key)]
    #[serde(rename = "projectId")]
    pub project_id: String,
    #[dynomite(rename = "bugId")]
    #[serde(rename = "bugId")]
    #[dynomite(sort_key)]
    pub bug_id: u32,
}

impl ProjectIdentifierWrapper {
    pub fn new(project_id: String) -> Self {
        Self {
            project_id,
            bug_id: 0,
        }
    }
}
