---
name: dev-workflow-core
description: Core 3-agent development workflow (Claude→Codex→Gemini). Provides shared workflow patterns, review validation, and iteration control. Referenced by python-dev and typescript-dev skills.
version: 1.0.0
---

# Development Workflow Core

Shared foundation for the 3-agent development workflow.

## Overview

```mermaid
graph TB
    subgraph Claude["CLAUDE (Orchestrator)"]
        C1[Task decomposition]
        C2[Context management]
        C3[Agent coordination]
        C4[Quality gate control]
    end

    subgraph Codex["CODEX (Implementer)"]
        X1[Code generation]
        X2[Test implementation]
        X3[Pattern following]
    end

    subgraph Gemini["GEMINI (Reviewer)"]
        G1[Code review]
        G2[Quality assessment]
        G3[Security analysis]
    end

    Claude --> Codex
    Claude --> Gemini
    Codex --> Gemini
    Gemini --> Claude
```

## Core Principles

1. **Separation of Concerns**: Each agent has distinct responsibilities
2. **Iteration Control**: Maximum 3 cycles before human intervention
3. **Review Validation**: Gemini reviews are validated, not blindly accepted
4. **Evidence-Based**: All decisions backed by code or documentation

## References

For detailed documentation, see:
- `workflow/3-agent-overview.md`
- `workflow/iteration-control.md`
- `workflow/review-validation.md`
- `workflow/bug-fix.md`
- `templates/human-intervention.md`
- `templates/adr.md`
