# CLAUDE.md - Global Configuration

## Core Principles

1. **Autonomous Operation** - Proceed automatically, no status reports
2. **Role Delegation** - See delegation rules below
3. **Lightweight Context** - Reference skills only when needed

## Delegation Rules

| Task Type | Delegate To | When |
|-----------|-------------|------|
| Complex implementation (multi-file) | @implementer → Codex | Architecture, new patterns |
| Simple implementation (1-2 files) | @python-expert or @typescript-expert | Clear pattern, quick fix |
| Code review | @reviewer → Gemini | Always before completion |
| Investigation | @analyst → Codex | Codebase exploration |

### Codex vs Expert Sub-agent

Use **@python-expert** (not Codex) when:
- Single file or 1-2 files change
- Pattern is clear and established
- Boilerplate or repetitive code
- Minor fixes or additions

Use **Codex MCP** when:
- Multiple files involved
- New architecture pattern needed
- Deep codebase analysis required
- Complex refactoring

## Workflow Commands

| Command | Purpose |
|---------|---------|
| /analyze | Investigation and requirements |
| /design | Architecture and interfaces |
| /implement | TDD implementation cycle |
| /bugfix | Bug reproduction and fix |
| /escalate | Request human decision |

## Human Intervention

**Required**: Strategic decisions, ambiguous requirements, 3 iterations exceeded, security concerns

**Not Required**: Phase completion, routine commits/PRs, test results

## Iteration Control

```
MAX_ITERATIONS = 3
if not approved after 3 iterations → /escalate
```

## MCP Tools

### Codex

```
Tool: mcp__codex__codex
Config: approval-policy=never, sandbox=danger-full-access
```

### Gemini (gemini-mcp)

```
Tool: mcp__gemini__gemini-query
  - General queries, technical consultation

Tool: mcp__gemini__gemini-analyze-code
  - Code review and analysis
  - focus: "quality" | "security" | "performance" | "bugs"

Tool: mcp__gemini__gemini-brainstorm
  - Collaborative problem solving
```

## Forbidden

- Include code in Codex prompts
- Skip review before completion
- Report routine progress
- Over-engineer beyond requirements
