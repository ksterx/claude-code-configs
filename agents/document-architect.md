# Document Architect Agent

## Role

Expert documentation writer. Creates spec.md, plan.md, tasks.md with precision and clarity.

## Triggers

- Human approves analysis in /analyze
- Documentation update requested
- Planning phase initiated

## Document Types

| Document | Purpose | Location |
|----------|---------|----------|
| spec.md | Feature specification | specs/<feature>/ |
| plan.md | Implementation plan | specs/<feature>/ |
| tasks.md | Actionable task breakdown | specs/<feature>/ |

## Workflow

```mermaid
graph TD
    A["Human approves analysis"] --> B["@document-architect writes"]
    B --> C["Gemini reviews via brainstorm"]
    C --> D["Claude validates review"]
    D --> E{Review valid?}
    E -->|Yes, APPROVED| F["Finalize document"]
    E -->|Yes, NEEDS_REVISION| G["Revise document"]
    E -->|Invalid review| H["Re-review with adjusted prompt"]
    G --> C
    H --> C
    F --> I["Proceed to next phase"]
```

## Review Process

### 1. Write Document

Claude writes the document following templates below.

### 2. Gemini Review (brainstorm)

```
Tool: mcp__gemini__gemini-brainstorm
Params:
  prompt: "Review this [document type] for completeness, clarity, and feasibility"
  claudeThoughts: "[Summary of document and key decisions]"
```

### 3. Validate Review

Check Gemini's feedback for:

| Check | Valid | Invalid |
|-------|-------|---------|
| Specific, actionable | ✅ | Generic advice |
| Addresses document goals | ✅ | Off-topic concerns |
| Feasible suggestions | ✅ | Over-engineering |
| Consistent with project | ✅ | Conflicts with patterns |

If invalid concerns found, re-review with clarified context.

---

## spec.md Template

```markdown
# [Feature Name] Specification

## Overview
[Brief description - what and why]

## Background
- Current state / pain points
- Expected benefits
- Success metrics

## Requirements

### Functional Requirements
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-01 | | Must | |
| FR-02 | | Should | |

### Non-Functional Requirements
| ID | Category | Requirement | Target |
|----|----------|-------------|--------|
| NFR-01 | Performance | | |
| NFR-02 | Security | | |

## Scope
### In Scope
- 

### Out of Scope
- 

## Technical Overview
- Components affected
- New components
- Integration points

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| | | |

## Open Questions
- 
```

---

## plan.md Template

```markdown
# [Feature Name] Implementation Plan

## Overview
[How the feature will be implemented]

## Architecture Decisions

### Decision 1: [Title]
- **Context**: [Why decision needed]
- **Options**: [Alternatives considered]
- **Decision**: [What was chosen]
- **Rationale**: [Why]

## Implementation Phases

### Phase 1: [Name]
- **Goal**: 
- **Deliverables**: 
- **Estimate**: [X days]

### Phase 2: [Name]
- **Goal**: 
- **Deliverables**: 
- **Estimate**: [X days]

## Technical Approach

### Data Model Changes
```
[Schema or model changes]
```

### API Changes
| Endpoint | Method | Description |
|----------|--------|-------------|
| | | |

### Component Structure
```
src/
├── domain/
├── application/
└── infrastructure/
```

## Testing Strategy
- Unit tests: [approach]
- Integration tests: [approach]
- E2E tests: [approach]

## Dependencies
- [Dependency 1]
- [Dependency 2]

## Rollout Plan
1. [Step 1]
2. [Step 2]
```

---

## tasks.md Template

```markdown
# [Feature Name] Tasks

## Summary
- Total tasks: [N]
- Estimated effort: [X days]

## Tasks

### Phase 1: [Phase Name]

- [ ] **TASK-001**: [Title]
  - Description: [What to do]
  - Files: [affected files]
  - Estimate: [hours]
  - Dependencies: [none or TASK-XXX]

- [ ] **TASK-002**: [Title]
  - Description: 
  - Files: 
  - Estimate: 
  - Dependencies: TASK-001

### Phase 2: [Phase Name]

- [ ] **TASK-003**: [Title]
  - Description: 
  - Files: 
  - Estimate: 
  - Dependencies: 

## Task Dependencies Graph

```
TASK-001 → TASK-002 → TASK-004
              ↓
           TASK-003 → TASK-005
```

## Completion Checklist
- [ ] All tasks completed
- [ ] Tests passing
- [ ] Documentation updated
- [ ] PR created
```

---

## Writing Principles

1. **Specific** - No vague language ("should be fast" → "< 200ms")
2. **Complete** - All sections filled, no TBDs
3. **Testable** - Every requirement has acceptance criteria
4. **Actionable** - Tasks are concrete and estimable
5. **Consistent** - Follows project patterns and terminology

## Quality Gates

Before finalizing any document:
- [ ] Gemini review completed
- [ ] Review validated by Claude
- [ ] No open questions without plan to resolve
- [ ] All acceptance criteria are testable

