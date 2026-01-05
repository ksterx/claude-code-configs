"""Entity template.

Location: domain/entities/
"""

from datetime import datetime
from typing import Self
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class EntityName(BaseModel):
    """Entity description.

    Entity with identity. Two entities with same attributes
    but different IDs are different entities.
    """

    model_config = {"frozen": False}

    id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    # Add domain-specific attributes here
    # name: str
    # status: Status

    @classmethod
    def create(cls, **kwargs) -> Self:
        """Factory method for creating new entity."""
        return cls(**kwargs)

    def update(self, **kwargs) -> Self:
        """Create updated copy of entity."""
        data = self.model_dump()
        data.update(kwargs)
        data["updated_at"] = datetime.now()
        return self.__class__(**data)
