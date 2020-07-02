use dynomite::{dynamodb::AttributeValue, error::AttributeError, Attribute};
use serde::{Deserialize, Serialize};
use std::fmt;
use std::str::FromStr;

#[derive(Deserialize, Serialize, Debug, Clone, Copy)]
pub enum Priority {
    Critical,
    High,
    Medium,
    Low,
}

impl Default for Priority {
    fn default() -> Self {
        Self::High
    }
}

impl fmt::Display for Priority {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self)
    }
}

impl FromStr for Priority {
    type Err = AttributeError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "Critical" => Ok(Priority::Critical),
            "High" => Ok(Priority::High),
            "Medium" => Ok(Priority::Medium),
            "Low" => Ok(Priority::Low),
            _ => Err(AttributeError::InvalidType),
        }
    }
}

impl Attribute for Priority {
    fn into_attr(self) -> AttributeValue {
        AttributeValue {
            s: Some(self.to_string()),
            ..AttributeValue::default()
        }
    }

    fn from_attr(value: AttributeValue) -> Result<Self, AttributeError> {
        if let Some(status_string) = value.s {
            return Ok(Priority::from_str(status_string.as_str())?);
        }
        Err(AttributeError::InvalidType)
    }
}
