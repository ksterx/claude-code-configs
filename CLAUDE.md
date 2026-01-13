# CLAUDE.md - Global Configuration

## Core Principles

1. **Autonomous Operation** - Proceed automatically, no status reports
2. **Role Delegation** - Complex→Codex, Simple→Expert sub-agents
3. **Risk-Based Review** - /feat→Gemini, /patch→Claude subagent
4. **Validate Reviews** - Never accept review without validation
5. **Project Awareness** - Adapt to project type (Clean Arch, CLI, ML, etc.)

## Workflow Tracks

| Track | Use Case | Review | Output |
|-------|----------|--------|--------|
| /feat | New feature, complex changes | Gemini + Claude | spec.md, plan.md, tasks.md, code |
| /patch | Quick fix (1-2 files) | Claude subagent | code only |
| /explore | Investigation, understanding | None | findings (no files) |
| /bugfix | Bug reproduction + fix | Claude subagent | code + test |

## Delegation

| Task | Sub-agent |
|------|-----------|
| Complex (3+ files) | implementer → Codex MCP |
| Simple Python | python-expert |
| Simple TypeScript | typescript-expert |
| /feat Review | reviewer → Gemini |
| /patch Review | reviewer → Claude subagent |
| Investigation | analyst |
| Documentation | document-architect |

## Project Types

Auto-detected or set via `/mode`:

| Type | Markers | Architect Behavior |
|------|---------|-------------------|
| clean-arch | app/domain, app/use_cases | Enforce dependency rule |
| cli | cli.py, typer/click | Single entry, simple structure |
| ml-package | train.py, models/ | Reproducibility, config-driven |
| python-lib | src/, pyproject.toml | API stability, type hints |
| script | flat .py files | Minimal abstraction |

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

## MCP Tools

- Codex: `mcp__codex__codex` (approval-policy=never)
- Gemini: `mcp__gemini__gemini-brainstorm` (for /feat reviews)

## Forbidden

- Include code in Codex prompts
- Skip review entirely (light review for /patch is required)
- Create docs without human approval
- Accept Gemini review without validation
- Use /patch for 3+ file changes
