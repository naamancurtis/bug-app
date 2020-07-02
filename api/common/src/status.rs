use dynomite::{dynamodb::AttributeValue, error::AttributeError, Attribute};
use serde::{Deserialize, Serialize};
use std::fmt;
use std::str::FromStr;

#[derive(Deserialize, Serialize, Debug, Clone, Copy)]
pub enum Status {
    Todo,
    InProgress,
    InReview,
    ReadyToDeploy,
    Deployed,
    Done,
}

impl Default for Status {
    fn default() -> Self {
        Self::Todo
    }
}

impl fmt::Display for Status {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self)
    }
}

impl FromStr for Status {
    type Err = AttributeError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "Todo" => Ok(Status::Todo),
            "InProgress" => Ok(Status::InProgress),
            "InReview" => Ok(Status::InReview),
            "ReadyToDeploy" => Ok(Status::ReadyToDeploy),
            "Deployed" => Ok(Status::Deployed),
            "Done" => Ok(Status::Done),
            _ => Err(AttributeError::InvalidType),
        }
    }
}

impl Attribute for Status {
    fn into_attr(self) -> AttributeValue {
        AttributeValue {
            s: Some(self.to_string()),
            ..AttributeValue::default()
        }
    }

    fn from_attr(value: AttributeValue) -> Result<Self, AttributeError> {
        if let Some(status_string) = value.s {
            return Ok(Status::from_str(status_string.as_str())?);
        }
        Err(AttributeError::InvalidType)
    }
}
