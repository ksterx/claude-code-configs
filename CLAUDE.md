# CLAUDE.md

## General Principles

1. **Autonomous Operation** - Proceed automatically, no status reports
2. **Lightweight Orchestration** - Delegate to subagents, preserve main context
3. **Role Delegation** - Use appropriate subagents for tasks

---

## Task Routing

### Development Tasks

**Use `auto-dev` skill** when task involves:
- Multiple files to modify
- Architecture or design decisions
- Non-trivial debugging (root cause unclear)
- New feature implementation
- Refactoring across components

**Handle directly** (no skill needed):
- Single-file, few-line fixes
- Obvious typos or syntax errors
- Simple config changes
- Clear one-liner bugs

**Judgment criteria**:
- If you need to explore the codebase → use `auto-dev`
- If the fix is immediately obvious → handle directly

### Non-Development Tasks

Handle directly without skill routing:
- Research and information gathering
- Documentation questions
- General conversation
- Configuration and setup assistance

---

## Code Review

**Subagent review is required for Simple+ complexity changes.**

**Implementation complete ≠ workflow complete.** You MUST NOT produce a completion summary until the review loop has executed. See `skills/auto-dev/SKILL.md` "Review Gate Rules" for the full protocol.

The reviewer subagent is a second opinion, not an authority. You are responsible for the final judgment.

---

## Diagram Guidelines

- **Use mermaid** for all diagrams (flowcharts, sequence, class, ER, etc.)
- **Exceptions** (use ASCII/text):
  - Directory trees (`├──`, `└──`)
  - UI mockups / wireframes
  - Simple tables (markdown table is fine)

---

## Human Intervention

**Upfront (Discovery phase)**:
- Ask clarifying questions to understand the user's true intent
- Challenge assumptions — the user may request a solution based on incomplete knowledge
- Propose better alternatives when they exist

**During development — ask when**:
- A decision would significantly change the final output's behavior
- Security implications need human judgment

**Do NOT stop for**:
- Phase transitions or approval gates
- Routine review cycles
- Standard commits/PRs
