# Codex Prompt Templates

## MCP Configuration

```python
{
  "approval-policy": "never",
  "sandbox": "danger-full-access",
  "cwd": "/path/to/project"
}
```

---

## Standard Prompt Structure

```
Background: [Context about current task]
Purpose: [What needs to be achieved]
Constraints:
- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

Task: [Specific implementation task]
```

---

## Phase 1: Analysis Templates

### Codebase Investigation

```
Background: Adding [feature] to existing project
Purpose: Understand current project structure and patterns
Constraints:
- Identify Clean Architecture compliance
- Note existing repository patterns
- Check database session management

Task:
1. Analyze src/ directory structure
2. Document existing patterns (entities, repositories)
3. Identify integration points for new feature
```

### Dependency Analysis

```
Background: Need to understand module dependencies
Purpose: Map dependencies for refactoring planning
Constraints:
- Focus on domain/application/infrastructure layers
- Identify any layer violations

Task:
1. List all imports in target module
2. Categorize by layer
3. Flag any violations of Clean Architecture
```

---

## Phase 2: Design Templates

### Interface Design

```
Background: Designing [feature] following Clean Architecture
Purpose: Create type definitions and interfaces
Constraints:
- Python 3.12+ type hints (str | None, NOT Optional)
- Domain layer: NO external dependencies
- Follow existing patterns in domain/entities/

Task:
1. Create value objects in domain/value_objects/
2. Create entity in domain/entities/
3. Create repository interface in domain/repositories/
NO implementation code, interfaces only.
```

### Architecture Research

```
Background: Planning implementation of [feature]
Purpose: Gather information for architecture decisions
Constraints:
- Consider scalability requirements
- Evaluate existing patterns

Task:
1. Research best practices for [specific pattern]
2. Analyze how similar features are implemented
3. Propose 2-3 architectural approaches with trade-offs
```

---

## Phase 3: Implementation Templates

### Test Writing (Red Phase)

```
Background: TDD Red phase for [component]
Purpose: Write failing tests before implementation
Constraints:
- pytest with AAA pattern (Arrange/Act/Assert)
- Test edge cases and error conditions
- Maintain test isolation

Task: Create tests/unit/test_[component].py
Include tests for:
1. Happy path
2. Edge cases (empty input, None values)
3. Error conditions
4. [Specific business rules]
```

### Implementation (Green Phase)

```
Background: TDD Green phase for [component]
Purpose: Write minimal code to pass tests
Constraints:
- Python 3.12+ type hints
- Follow SOLID principles
- Match existing code style

Task: Implement [component] to pass all tests
- Minimal implementation only
- No premature optimization
- All tests must pass
```

### Refactoring

```
Background: TDD Refactor phase for [component]
Purpose: Improve code quality while keeping tests green
Constraints:
- All tests must remain passing
- Follow DRY principle
- Improve readability

Task:
1. Extract common patterns
2. Improve naming
3. Add docstrings where helpful
4. Run tests after each change
```

---

## Common Constraints Block

Copy-paste this for most Python tasks:

```
Constraints:
- Python 3.12+ type hints (str | None, list[str], NOT Optional, List)
- Clean Architecture (Domain → Application → Infrastructure)
- SOLID principles
- Google-style docstrings
- Async with anyio (if async needed)
```
