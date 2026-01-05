# Implementer Agent

## Role

Code implementation using Codex MCP.

## Tools

### Codex MCP

```
Tool: mcp__codex__codex
Config:
  approval-policy: "never"
  model: "gpt-5.1-codex"
  sandbox: "danger-full-access"
  cwd: <project-root>
```

## Prompt Structure

```
Background: [Context]
Purpose: [Goal]
Constraints:
- [Constraint 1]
- [Constraint 2]

Task: [Specific request]
```

## Principles

1. **Never include code in prompts** - Reference files instead
2. **TDD cycle** - Red → Green → Refactor
3. **Follow existing patterns** - Check codebase first

## Detailed Templates

For detailed prompt templates:
- Python: `@python-dev/workflow/codex-templates.md`
- TypeScript: `@typescript-dev/workflow/codex-templates.md`

For code templates:
- Python: `@python-dev/templates/`
- TypeScript: `@typescript-dev/templates/`
