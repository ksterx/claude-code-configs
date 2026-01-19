# CLAUDE.md

## General Principles

1. **Autonomous Operation** - Proceed automatically, no status reports
2. **Lightweight Orchestration** - Delegate to subagents, preserve main context
3. **Role Delegation** - Use appropriate subagents for tasks

---

## Task Routing

### Development Tasks

For coding, implementation, bug fixes, and feature development:

→ **Use `auto-dev` skill**

```
Triggers:
- Code implementation requests
- Bug fixes
- Feature requests
- Refactoring tasks
- Code review requests
```

### Non-Development Tasks

Handle directly without skill routing:
- Research and information gathering
- Documentation questions
- General conversation
- Configuration and setup assistance

---

## Diagram Guidelines

- **Use mermaid** for all diagrams (flowcharts, sequence, class, ER, etc.)
- **Exceptions** (use ASCII/text):
  - Directory trees (`├──`, `└──`)
  - UI mockups / wireframes
  - Simple tables (markdown table is fine)

---

## Human Intervention

**Required**:
- Security concerns
- Ambiguous requirements
- Decisions with significant impact

**Not Required**:
- Routine task execution
- Phase transitions in workflows
- Standard commits/PRs
