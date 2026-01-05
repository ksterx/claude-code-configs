# Claude Code Workflow Design

## Overview

Autonomous workflow using Claude Code's 6 extension features. Main Claude focuses on flow control, delegates detailed work to sub-agents.

## Context Management Strategy

```
┌─────────────────────────────────────────────────────────────┐
│ CLAUDE.md (Always Loaded - Keep Minimal)                   │
│ - Core principles                                          │
│ - MCP tool configuration                                   │
│ - Workflow commands reference                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ agents/, commands/ (On Delegation - Compact)               │
│ - Role definitions only                                    │
│ - Flow steps only                                          │
│ - Reference to skills for details                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ skills/ (On Demand - Detailed)                             │
│ - Detailed prompt templates                                │
│ - Code templates                                           │
│ - Checklists                                               │
│ - Guides                                                   │
└─────────────────────────────────────────────────────────────┘
```

## 6 Features Classification

| Feature | When Loaded | Content |
|---------|-------------|---------|
| **CLAUDE.md** | Always | Minimal rules, MCP config |
| **rules/** | On file edit | Language-specific rules |
| **agents/** | On delegation | Role definition (compact) |
| **commands/** | On trigger | Flow steps (compact) |
| **skills/** | On demand | Detailed templates, guides |
| **MCP** | On tool call | External service connection |

## Directory Structure

```
~/.claude/
├── CLAUDE.md              # Always loaded (minimal)
├── agents/                # Compact role definitions
│   ├── implementer.md     # → refs @python-dev, @typescript-dev
│   ├── reviewer.md        # → refs skills/*/workflow/gemini-templates.md
│   └── analyst.md
├── commands/              # Compact flow definitions
│   ├── analyze.md
│   ├── design.md
│   ├── implement.md
│   ├── bugfix.md
│   └── escalate.md        # → refs @dev-workflow-core/templates/
├── rules/                 # Conditional rules
│   ├── python.md
│   └── typescript.md
└── skills/                # Detailed knowledge (on-demand)
    ├── conventional-commits/
    ├── dev-workflow-core/
    │   ├── templates/     # ADR, escalation report
    │   └── workflow/      # Iteration control, review validation
    ├── python-dev/
    │   ├── guides/        # Standards, architecture, testing
    │   ├── templates/     # Entity, repository, use case
    │   ├── workflow/      # Codex/Gemini prompt templates
    │   └── checklists/
    └── typescript-dev/
        ├── guides/
        ├── templates/
        ├── workflow/
        └── checklists/
```

## MCP Tools

### Codex

```
Tool: mcp__codex__codex
Use: Implementation, investigation
Config: approval-policy=never, sandbox=danger-full-access
```

### Gemini (gemini-mcp)

```
Tool: mcp__gemini__gemini-query
Use: General queries, technical consultation
Params: model="pro", prompt=<prompt>

Tool: mcp__gemini__gemini-analyze-code
Use: Code review
Params: code=<code>, language=<lang>, focus=<focus>

Tool: mcp__gemini__gemini-brainstorm
Use: Problem solving, option exploration
Params: prompt=<topic>, claudeThoughts=<context>

Tool: mcp__gemini__gemini-summarize
Use: Document summarization
Params: content=<text>, length=<brief|moderate|detailed>
```

## Workflow Commands

| Command | Purpose | Auto-proceed |
|---------|---------|--------------|
| `/analyze` | Investigation, requirements | → /design |
| `/design` | Architecture, interfaces | → /implement |
| `/implement` | TDD cycle | → PR |
| `/bugfix` | Bug fix | → PR |
| `/escalate` | Human decision | Wait |

## Autonomous Operation

### Human Intervention Required

- Strategic architecture decisions
- Ambiguous requirements
- 3 iterations without APPROVED
- Security concerns

### No Intervention Needed

- Phase completion (auto-proceed)
- Routine commits/PRs
- Test results
- Standard review cycles

## Example Flow

```
User: Implement user authentication

Main Claude:
  /analyze → @analyst investigates
          → @reviewer validates
          → auto-proceed
  
  /design  → @analyst researches options
          → @reviewer evaluates
          → @implementer creates interfaces
          → @reviewer: APPROVED
          → auto-proceed
  
  /implement → branch
            → @implementer: tests (Red)
            → verify fail
            → @implementer: implement (Green)
            → verify pass
            → @reviewer: NEEDS_REVISION
            → @implementer: fix
            → @reviewer: APPROVED
            → commit, PR

(No status reports, PR signals completion)
```

## References

- [Claude Code Extension Guide](https://zenn.dev/tmasuyama1114/articles/claude_code_extension_guide)
- [gemini-mcp](https://github.com/RLabs-Inc/gemini-mcp)
