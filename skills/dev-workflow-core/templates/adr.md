# Architecture Decision Record Template

## Template

```markdown
# ADR-[NUMBER]: [TITLE]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Date
[YYYY-MM-DD]

## Context
[What is the issue that we're seeing that is motivating this decision or change?]

## Decision Drivers
- [Driver 1: e.g., performance requirements]
- [Driver 2: e.g., team expertise]
- [Driver 3: e.g., maintainability]
- [Driver 4: e.g., cost constraints]

## Considered Options
1. [Option 1]
2. [Option 2]
3. [Option 3]

## Decision
[What is the change that we're proposing and/or doing?]

## Rationale
[Why is this change being proposed? What justifies it? Why is this the best option?]

### Option 1: [Name]
**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

### Option 2: [Name]
**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

### Option 3: [Name]
**Pros:**
- [Pro 1]
- [Pro 2]

**Cons:**
- [Con 1]
- [Con 2]

## Consequences

### Positive
- [Positive consequence 1]
- [Positive consequence 2]

### Negative
- [Negative consequence 1]
- [Negative consequence 2]

### Neutral
- [Neutral consequence 1]

## Related Decisions
- [ADR-XXX: Related decision]
- [ADR-YYY: Another related decision]

## Notes
[Any additional notes, links, or references]
```

## Usage Guidelines

### When to Create an ADR

Create an ADR when:
- Choosing a major framework or library
- Changing system architecture
- Establishing a new pattern or convention
- Making decisions that will be hard to reverse
- Resolving a human escalation with architectural impact

### Naming Convention

```
docs/adr/
├── 0001-use-react-for-frontend.md
├── 0002-adopt-clean-architecture.md
├── 0003-choose-postgresql-over-mongodb.md
└── README.md (index of all ADRs)
```

### Status Lifecycle

```
Proposed → Accepted → [Deprecated | Superseded]
```

- **Proposed**: Under discussion
- **Accepted**: Decision made and being implemented
- **Deprecated**: No longer applies (explain why)
- **Superseded**: Replaced by another ADR (link to it)

### Integration with Workflow

1. **During Human Escalation**: If decision is architectural, create ADR
2. **Before Major Changes**: Propose ADR for review
3. **After Implementation**: Update ADR status to Accepted
4. **When Reversing**: Create new ADR that supersedes old one
