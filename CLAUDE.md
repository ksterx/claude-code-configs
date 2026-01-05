# CLAUDE.md - Global Configuration

## Core Principles

1. **Autonomous Operation** - Proceed automatically, no status reports
2. **Role Delegation** - Implementation→@implementer, Review→@reviewer, Analysis→@analyst
3. **Lightweight Context** - Reference skills only when needed

## Workflow Commands

| Command | Purpose |
|---------|---------|
| `/analyze` | Investigation and requirements |
| `/design` | Architecture and interfaces |
| `/implement` | TDD implementation cycle |
| `/bugfix` | Bug reproduction and fix |
| `/escalate` | Request human decision |

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
  - model: "pro" (default)

Tool: mcp__gemini__gemini-analyze-code
  - Code review and analysis
  - focus: "quality" | "security" | "performance" | "bugs"

Tool: mcp__gemini__gemini-brainstorm
  - Collaborative problem solving

Tool: mcp__gemini__gemini-summarize
  - Document/content summarization
```

## Forbidden

- Include code in Codex prompts
- Skip review before completion
- Report routine progress
- Over-engineer beyond requirements
