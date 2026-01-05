"""Value Object template.

Location: domain/value_objects/
"""

from typing import Self

from pydantic import BaseModel, field_validator


class ValueObjectName(BaseModel):
    """Value object description.

    Immutable object identified by its attributes, not by identity.
    Two value objects with same attributes are equal.
    """

    model_config = {"frozen": True}

    value: str

    @field_validator("value")
    @classmethod
    def validate_value(cls, v: str) -> str:
        """Validate value.

        Raises:
            ValueError: If validation fails.
        """
        if not v:
            raise ValueError("Value cannot be empty")
        # Add validation rules here
        return v

    def __str__(self) -> str:
        return self.value

    def __hash__(self) -> int:
        return hash(self.value)
