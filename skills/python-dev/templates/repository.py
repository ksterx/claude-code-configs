"""Repository interface template.

Location: domain/repositories/
"""

from abc import ABC, abstractmethod
from uuid import UUID

# from domain.entities.entity_name import EntityName


class EntityNameRepository(ABC):
    """Repository interface for EntityName.

    Defines the contract for persistence operations.
    Implementation goes in infrastructure/repositories/.
    """

    @abstractmethod
    def save(self, entity: "EntityName") -> None:
        """Persist entity."""
        ...

    @abstractmethod
    def find_by_id(self, entity_id: UUID) -> "EntityName | None":
        """Find entity by ID."""
        ...

    @abstractmethod
    def find_all(self) -> list["EntityName"]:
        """Find all entities."""
        ...

    @abstractmethod
    def delete(self, entity_id: UUID) -> None:
        """Delete entity."""
        ...
