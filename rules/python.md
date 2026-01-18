---
paths: "**/*.py"
---

# Python File Rules

## Type Hints

Use Python 3.12+ style.

```python
# ✅ Correct
def process(value: str | None) -> list[str]: ...

# ❌ Incorrect
from typing import Optional, List
def process(value: Optional[str]) -> List[str]: ...
```

## Pydantic

Use Pydantic v2.

```python
# ✅ v2 style
from pydantic import BaseModel, Field, model_validator

class User(BaseModel):
    name: str
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$")
    
    @model_validator(mode='after')
    def validate(self) -> 'User': ...

# ❌ v1 style
from pydantic import validator
```

## Package Manager

Use uv.

```bash
uv add <package>
uv sync
uv run pytest
```

## Async

Use anyio (not asyncio directly).