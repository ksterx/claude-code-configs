# Complete Feature Implementation Example

This example demonstrates the full 3-agent workflow for implementing a User management feature.

## Context

- Project: FastAPI + PostgreSQL
- Feature: User creation with email duplicate check

---

## Phase 1: Analysis & Requirements

### Step 1: Codex Investigation

**Prompt to Codex:**

```
Background: Adding user management to existing project
Purpose: Understand current patterns and integration points
Constraints:
- Identify Clean Architecture compliance
- Note existing repository patterns

Task:
1. Analyze src/ directory structure
2. Document existing entity/repository patterns
3. Identify database session management
```

**Expected Output:**

```
Project structure:
src/
├── domain/
│   ├── entities/product.py
│   └── repositories/product_repository.py
├── application/
│   └── use_cases/
├── infrastructure/
│   ├── database/session.py
│   └── repositories/postgres_product_repository.py

Patterns:
- Repository interface in domain/
- Implementation in infrastructure/
- SQLAlchemy async session via get_db()
```

### Step 2: Gemini Analysis

**Prompt to Gemini:**

```
Analyze this project structure for adding User management.

[Codex output above]

Evaluate:
- Clean Architecture compliance
- Suggested approach for User entity
- Potential concerns
```

**Expected Response:**

```
## Summary
APPROVED for User implementation

## Recommendations
1. Create Email value object for validation
2. Follow existing Product entity pattern
3. Add domain service for duplicate check logic
```

---

## Phase 2: Design

### Step 1: Interface Design (Codex)

**Prompt to Codex:**

```
Background: Designing User entity following existing patterns
Purpose: Create type definitions and interfaces only
Constraints:
- Python 3.13+ type hints
- Domain layer: NO external dependencies
- Follow patterns from domain/entities/product.py

Task:
1. Create domain/value_objects/email.py
2. Create domain/entities/user.py
3. Create domain/repositories/user_repository.py
NO implementation, interfaces only.
```

### Step 2: Design Review (Gemini)

**Prompt to Gemini:**

```
Review this design with extremely critical attitude.

[Codex output - interfaces]

Evaluate:
- Domain layer purity
- Value object immutability
- Interface completeness
- Python 3.13+ compliance

Format: APPROVED / NEEDS_REVISION with concerns list.
```

---

## Phase 3: Implementation (TDD)

### Cycle 1: Email Value Object

#### Red Phase (Codex)

**Prompt:**

```
Background: TDD Red phase for Email value object
Purpose: Write failing tests
Constraints:
- pytest with AAA pattern
- Test validation, equality, immutability

Task: Create tests/unit/domain/test_email.py
```

**Output:**

```python
# tests/unit/domain/test_email.py
import pytest
from domain.value_objects.email import Email

def test_valid_email_creation() -> None:
    email = Email("user@example.com")
    assert email.value == "user@example.com"

def test_invalid_email_raises_error() -> None:
    with pytest.raises(ValueError, match="Invalid email"):
        Email("invalid")

def test_email_equality() -> None:
    assert Email("a@b.com") == Email("a@b.com")
```

#### Claude Runs Tests (RED)

```bash
$ pytest tests/unit/domain/test_email.py
FAILED - ModuleNotFoundError: No module named 'domain.value_objects.email'
```

✅ Red confirmed

#### Green Phase (Codex)

**Prompt:**

```
Background: TDD Green phase for Email
Purpose: Minimal implementation to pass tests
Constraints:
- Python 3.13+ type hints
- Immutable (frozen dataclass)

Task: Implement domain/value_objects/email.py
```

#### Claude Runs Tests (GREEN)

```bash
$ pytest tests/unit/domain/test_email.py
3 passed
```

✅ Green confirmed

#### Review (Gemini)

**Prompt:**

```
Review Email implementation with extremely critical attitude.

[Code and tests]

Format: APPROVED / NEEDS_REVISION
```

**Response:** `APPROVED - No concerns`

---

### Cycle 2: User Entity

*(Same TDD cycle)*

### Cycle 3: Repository Implementation

*(Same TDD cycle)*

### Cycle 4: Use Case

*(Same TDD cycle)*

---

## Final Verification

```bash
# All checks
ruff format && ruff check --fix && mypy src/ --strict && pytest --cov=src

# Expected output
All checks passed ✓
Coverage: 87%
```

## Checklist

- [x] All tests green
- [x] Gemini: "No concerns" on all components
- [x] Type check passes
- [x] Coverage > 80%
- [x] Clean Architecture layers respected
