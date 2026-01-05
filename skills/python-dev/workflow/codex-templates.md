# Codex Prompt Templates

## When to Use Codex vs @python-expert

| Complexity | Use | Reason |
|------------|-----|--------|
| Simple (1-2 files, clear pattern) | @python-expert | Faster, no MCP overhead |
| Complex (multi-file, architecture) | Codex MCP | Deep analysis capability |
| Investigation/Research | Codex MCP | Codebase exploration |

---

## MCP Configuration

```
Tool: mcp__codex__codex
Config:
  approval-policy: "never"
  sandbox: "danger-full-access"
  cwd: "/path/to/project"
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

## Common Constraints Block

Copy-paste this for most Python tasks:

```
Constraints:
- Python 3.12+ type hints (str | None, list[str], NOT Optional, List)
- Clean Architecture (Domain → Application → Infrastructure)
- SOLID principles
- Google-style docstrings
- Async with anyio (if async needed)
- Security: Input validation, no hardcoded secrets
- Performance: Avoid N+1 queries, use generators for large data
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
- Include property-based tests with hypothesis (if applicable)
- Target 95%+ coverage

Task: Create tests/unit/test_[component].py
Include tests for:
1. Happy path
2. Edge cases (empty input, None values)
3. Error conditions
4. Security edge cases (injection, overflow)
5. [Specific business rules]
```

### Implementation (Green Phase)

```
Background: TDD Green phase for [component]
Purpose: Write minimal code to pass tests
Constraints:
- Python 3.12+ type hints
- Follow SOLID principles
- Match existing code style
- Input validation for all external data
- No hardcoded secrets or credentials

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

## Security-Focused Templates

### Security Review Implementation

```
Background: Implementing [feature] with security requirements
Purpose: Security-hardened implementation
Constraints:
- OWASP Top 10 compliance
- Input validation on all entry points
- Output encoding for user-facing data
- No SQL injection vulnerabilities
- Secure secret handling (env vars, not hardcoded)
- Rate limiting consideration

Task:
1. Implement with input validation
2. Add security-focused tests
3. Document security considerations
```

### Authentication/Authorization

```
Background: Implementing auth for [feature]
Purpose: Secure access control
Constraints:
- Principle of least privilege
- Fail-secure (deny by default)
- Audit logging for sensitive operations
- Token/session security best practices

Task:
1. Implement access control checks
2. Add audit logging
3. Test authorization edge cases
```

---

## Performance-Focused Templates

### Performance-Critical Implementation

```
Background: Implementing [feature] with performance requirements
Purpose: Optimized implementation
Constraints:
- Profile before optimizing
- Avoid N+1 queries
- Use generators for large datasets
- Consider caching strategy
- Async for I/O-bound operations

Task:
1. Implement with performance considerations
2. Add benchmarks in tests
3. Document performance characteristics
```

### Database Optimization

```
Background: Optimizing database operations for [feature]
Purpose: Efficient data access
Constraints:
- Minimize query count
- Use appropriate indexes
- Batch operations where possible
- Connection pooling

Task:
1. Analyze current query patterns
2. Implement optimized queries
3. Add performance tests
```
