# Python File Rules

globs: ["*.py"]

## Type Hints

Use Python 3.12+ style type hints.

```python
# ✅ Correct
def process(value: str | None) -> list[str]: ...
def fetch(ids: list[int]) -> dict[str, User]: ...
async def get_user(id: str) -> User | None: ...

# ❌ Incorrect - Legacy style
from typing import Optional, List, Dict, Union
def process(value: Optional[str]) -> List[str]: ...
def fetch(ids: List[int]) -> Dict[str, User]: ...
```

## Pydantic

Use Pydantic v2 patterns.

```python
# ✅ Correct
from pydantic import BaseModel, Field, model_validator

class User(BaseModel):
    name: str
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$")
    
    @model_validator(mode='after')
    def validate_user(self) -> 'User':
        # validation logic
        return self

# ❌ Incorrect - Pydantic v1 style
from pydantic import validator

class User(BaseModel):
    @validator('email')
    def validate_email(cls, v):
        ...
```

## Package Management

Use `uv` for all package operations.

```bash
# ✅ Correct
uv add <package>
uv sync
uv run pytest

# ❌ Incorrect
pip install <package>
poetry add <package>
```

## Async

Use `anyio` for async operations (not `asyncio` directly).

```python
# ✅ Correct
import anyio

async def fetch_data():
    async with anyio.create_task_group() as tg:
        tg.start_soon(fetch_users)
        tg.start_soon(fetch_orders)

# ❌ Avoid direct asyncio
import asyncio
asyncio.gather(...)
```

## Docstrings

Use Google-style docstrings.

```python
def calculate_discount(price: float, rate: float) -> float:
    """Calculate discounted price.
    
    Args:
        price: Original price in dollars.
        rate: Discount rate as decimal (0.1 = 10%).
    
    Returns:
        Discounted price.
    
    Raises:
        ValueError: If rate is not between 0 and 1.
    """
```

## Imports

Follow isort ordering with ruff.

```python
# Standard library
import os
from pathlib import Path

# Third party
import httpx
from pydantic import BaseModel

# Local
from .models import User
from .services import UserService
```

## Architecture Patterns

Reference `@python-dev/guides/architecture.md` for:
- Clean Architecture layer structure
- Domain entity patterns
- Repository interface patterns
- Use case patterns

## Testing

Reference `@python-dev/guides/testing.md` for:
- pytest patterns
- AAA (Arrange/Act/Assert) structure
- Fixture usage
- Mock strategies


