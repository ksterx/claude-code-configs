# CLAUDE.md - Global Configuration

## Core Principles

1. **Autonomous Operation** - Proceed automatically, no status reports
2. **Role Delegation** - Complex→Codex, Simple→Expert sub-agents, Review→Gemini
3. **Lightweight Context** - Reference skills only when needed
4. **Validate Reviews** - Never accept Gemini review without validation

## Delegation

| Task | Delegate |
|------|----------|
| Complex implementation | @implementer → Codex |
| Simple (1-2 files) | @python-expert / @typescript-expert |
| Review | @reviewer → Gemini |
| Investigation | @analyst |
| Documentation | @document-architect |

## Commands

/analyze, /design, /implement, /bugfix, /escalate

## Human Intervention

**Required**: /analyze approval, strategic decisions, 3 iterations exceeded, security

**Not Required**: Phase transitions, routine commits/PRs

## MCP Tools

- Codex: `mcp__codex__codex` (approval-policy=never)
- Gemini: `mcp__gemini__gemini-brainstorm` (primary for reviews)

## Forbidden

- Include code in Codex prompts
- Skip review
- Create docs without human approval
- Accept Gemini review without validation
