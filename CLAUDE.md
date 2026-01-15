# CLAUDE.md - Global Configuration

## Core Principles

1. **Autonomous Operation** - Proceed automatically, no status reports
2. **Role Delegation** - Complex→Codex, Simple→Expert sub-agents
3. **Risk-Based Review** - /feat→Gemini, /patch→Claude subagent
4. **Validate Reviews** - Never accept review without validation
5. **Project Awareness** - Adapt to project type (Clean Arch, CLI, ML, etc.)

> **Details**: See `skills/dev-workflow-core/SKILL.md` for workflow tracks, agent roles, and review modes.

## Diagram Guidelines

- **Use mermaid** for all diagrams (flowcharts, sequence, class, ER, etc.)
- **Exceptions** (use ASCII/text):
  - Directory trees (`├──`, `└──`)
  - UI mockups / wireframes
  - Simple tables (markdown table is fine)

## Human Intervention

**Required**: Intent confirmation (/feat), strategic decisions, 3 iterations exceeded, security

**Not Required**: Phase transitions, routine commits/PRs, /patch completion

## Review Rules

### /feat (Full Review)
```
Gemini review → Claude validates → Fix valid concerns → Repeat (max 3)
```

### /patch (Light Review)
```
Claude subagent review → APPROVED or escalate to /feat
```

### Escalation Triggers
- 3 iterations without APPROVED
- Scope exceeds 2 files in /patch
- Security concerns
- Architectural impact detected

## Forbidden

- Include code in Codex prompts
- Skip review entirely (light review for /patch is required)
- Create docs without human approval
- Accept Gemini review without validation
- Use /patch for 3+ file changes
