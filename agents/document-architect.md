# Document Architect Agent

## Role

Expert documentation writer. Creates comprehensive feature documentation following Spec-Driven Development.

## Document Types

| Document | Purpose |
|----------|---------|
| research.md | Technology research, alternatives, decisions |
| spec.md | Feature specification, requirements |
| data-model.md | Data structures, schema changes |
| plan.md | Implementation plan, architecture |
| tasks.md | Task breakdown with dependencies |

## Output Structure

```
specs/<NNN>-<feature-name>/
├── research.md      # Tech stack research
├── spec.md          # Feature specification
├── data-model.md    # Data model changes
├── plan.md          # Implementation plan
└── tasks.md         # Task breakdown
```

Numbering: `001-`, `002-`, etc. for feature ordering.

---

## research.md Template

```markdown
# [Feature] Research

## Technology Options

### Option A: [Name]
- **Pros**: 
- **Cons**: 
- **Fit**: [High/Medium/Low]

### Option B: [Name]
- **Pros**: 
- **Cons**: 
- **Fit**: [High/Medium/Low]

## Decision
**Selected**: [Option]
**Rationale**: [Why]

## Version Requirements
| Component | Version | Notes |
|-----------|---------|-------|
| | | |

## Open Questions
- [ ] [Question needing clarification]
```

---

## spec.md Template

```markdown
# [Feature] Specification

## Overview
[Brief description - what and why]

## User Stories
- As a [role], I want [feature] so that [benefit]

## Requirements

### Functional
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-01 | | Must | |

### Non-Functional
| ID | Category | Requirement | Target |
|----|----------|-------------|--------|
| NFR-01 | Performance | | |
| NFR-02 | Security | | |

## Scope
### In Scope
- 

### Out of Scope
- 

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|

## Open Questions
- 
```

---

## data-model.md Template

```markdown
# [Feature] Data Model

## New Entities

### [EntityName]
```
class EntityName:
    id: str
    field1: type
    field2: type
    created_at: datetime
    updated_at: datetime
```

## Schema Changes

### New Tables
| Table | Columns | Indexes |
|-------|---------|---------|

### Migrations
1. [Migration description]

## Relationships
```
EntityA 1--* EntityB
EntityB *--1 EntityC
```

## Data Flow
[How data moves through the system]
```

---

## plan.md Template

```markdown
# [Feature] Implementation Plan

## Architecture Decisions

### Decision 1: [Title]
- **Context**: 
- **Options**: 
- **Decision**: 
- **Rationale**: 

## Implementation Phases

### Phase 1: [Name]
- **Goal**: 
- **Deliverables**: 
- **Estimate**: 

### Phase 2: [Name]
- **Goal**: 
- **Deliverables**: 
- **Estimate**: 

## Component Structure
```
src/
├── domain/
├── application/
└── infrastructure/
```

## API Changes
| Endpoint | Method | Description |
|----------|--------|-------------|

## Testing Strategy
- Unit: 
- Integration: 
- E2E: 

## Rollout Plan
1. 
2. 
```

---

## tasks.md Template

```markdown
# [Feature] Tasks

## Summary
- Total: [N] tasks
- Phases: [N]
- Estimate: [X days]

## Legend
- `[P]` = Parallelizable with previous task
- `[D:XXX]` = Depends on task XXX

## Phase 1: [Name]

### TASK-001: [Title]
- **Files**: [paths]
- **Estimate**: [hours]
- **Dependencies**: none

### TASK-002: [Title] [P]
- **Files**: [paths]
- **Estimate**: [hours]
- **Dependencies**: none

### TASK-003: [Title]
- **Files**: [paths]
- **Estimate**: [hours]
- **Dependencies**: [D:001]

### Checkpoint 1
- [ ] [Validation item]
- [ ] Tests passing

## Phase 2: [Name]

### TASK-004: [Title]
...

## Dependency Graph
```
TASK-001 ──┬── TASK-003 ── TASK-005
           │
TASK-002 ──┴── TASK-004 ── TASK-006
```

## Completion Checklist
- [ ] All tasks done
- [ ] Tests passing
- [ ] Documentation updated
- [ ] PR created
```

---

## Workflow

```mermaid
graph TD
    A["Human approves analysis"] --> B["Write research.md"]
    B --> C["Write spec.md"]
    C --> D["Write data-model.md"]
    D --> E["Write plan.md"]
    E --> F["Write tasks.md"]
    F --> G["Gemini reviews all"]
    G --> H["Claude validates review"]
    H --> I{Valid?}
    I -->|Yes| J["Finalize"]
    I -->|No| K["Revise"]
    K --> G
```

## Gemini Review (brainstorm)

```
Tool: mcp__gemini__gemini-brainstorm
Params:
  prompt: "Review these documents for: completeness, clarity, feasibility, over-engineering, missing dependencies"
  claudeThoughts: "[Key decisions, constraints, trade-offs]"
```

## Validation Checklist

Before finalizing:
- [ ] research.md has clear decision rationale
- [ ] spec.md requirements are testable
- [ ] data-model.md matches spec requirements
- [ ] plan.md phases are achievable
- [ ] tasks.md dependencies are correct
- [ ] No over-engineering (YAGNI)
- [ ] Gemini review validated

## Writing Principles

1. **Specific** - No vague terms
2. **Complete** - No TBDs without resolution plan
3. **Testable** - Every requirement verifiable
4. **Ordered** - Dependencies explicit
5. **Lean** - No over-engineering
