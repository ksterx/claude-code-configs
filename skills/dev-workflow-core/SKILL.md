---
name: dev-workflow-core
description: Core development workflow with 3-track system (/feat, /patch, /explore). Provides shared patterns, review validation, and iteration control.
version: 2.0.0
---

# Development Workflow Core

Shared foundation for the 3-track development workflow.

## Workflow Tracks

```mermaid
graph TD
    A[User Request] --> B{Complexity?}
    B -->|Feature/Complex| C[/feat]
    B -->|Quick fix 1-2 files| D[/patch]
    B -->|Investigation| E[/explore]

    C --> C1[Intent → Spec → Design → Tasks → Implement]
    C1 --> C2[Gemini Review]

    D --> D1[Direct Implementation]
    D1 --> D2[Claude Subagent Review]

    E --> E1[Read-only Analysis]
    E1 --> E2[Findings output]
```

## Agent Roles

| Agent | /feat | /patch | /explore |
|-------|-------|--------|----------|
| **Claude** | Orchestration, validation | Implementation, coordination | Analysis |
| **Codex** | Complex implementation | — | — |
| **Gemini** | Full review | — | — |
| **Claude Subagent** | — | Light review | — |

## Core Principles

1. **Track Selection**: Choose appropriate track based on complexity
2. **Intent Verification**: Confirm understanding before /feat spec creation
3. **Risk-Based Review**: Full review for /feat, light review for /patch
4. **Iteration Control**: Max 3 cycles (/feat), max 2 cycles (/patch)
5. **Profile Awareness**: Adapt to project type (Clean Arch, CLI, ML, etc.)

## Track Details

### /feat (Full Feature)

```
Intent Summary → Human confirms →
spec.md → Gemini reviews →
plan.md → Gemini reviews →
tasks.md → Gemini reviews →
Implementation → TDD + Gemini reviews →
PR
```

Options:
- Default: Auto-progress after intent confirmation
- `--interactive`: Pause at each phase

### /patch (Quick Fix)

```
Scope check (≤2 files) →
Direct implementation →
Tests →
Claude subagent review →
Commit
```

Constraints:
- Max 2 files
- No architectural changes
- No new runtime dependencies

### /explore (Discovery)

```
Parse question →
Read-only analysis →
Output findings (no file writes)
```

Output formats:
- Conversational (default)
- `--file`: findings.md
- `--spike`: scratchpad.py

## Review Modes

| Track | Reviewer | Max Iterations | On Exceed |
|-------|----------|----------------|-----------|
| /feat | Gemini + Claude validation | 3 | /escalate |
| /patch | Claude subagent | 2 | Suggest /feat |
| /explore | None | — | — |

## References

For detailed documentation, see:
- `workflow/3-agent-overview.md`
- `workflow/iteration-control.md`
- `workflow/review-validation.md`
- `templates/human-intervention.md`
- `templates/adr.md`
