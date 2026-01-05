# Workflow Overview

## Agent Roles

| Agent | Role | Tools |
|-------|------|-------|
| **Claude** | Orchestration, decisions, git/file ops | Native |
| **Codex** | Code implementation | `mcp__codex__codex` |
| **Gemini** | Review, quality assessment | `gemini-review-file`, `gemini-query` |

## Execution Patterns

### Pattern A: Normal (Codex Available)

```mermaid
graph LR
    A[Claude] --> B[Codex]
    B --> C[Claude<br/>run tests]
    C --> D[Gemini Review]
    D --> E[Validate]
    E --> F{OK?}
    F -->|No| B
    F -->|Yes| G[Done]
```

### Pattern B: Fallback (Codex Unavailable)

```mermaid
graph LR
    A[Claude<br/>implement] --> B[Claude<br/>run tests]
    B --> C[Gemini Review]
    C --> D[Validate]
    D --> E{OK?}
    E -->|No| A
    E -->|Yes| F[Done]
```

### Pattern C: Simple Operations (No Codex Needed)

```mermaid
graph LR
    A[Claude<br/>git/file ops] --> B[Done]
```

---

## Phase Details

### Phase 1: Analysis & Requirements

**Goal**: Understand current state and confirm requirements.

```mermaid
graph TD
    A[Codex investigates codebase] --> B[Gemini analyzes findings]
    B --> C[Codex revises based on feedback]
    C --> D[Requirements confirmed]
```

### Phase 2: Design

**Goal**: Design architecture and define types/interfaces.

```mermaid
graph TD
    A[Codex gathers architecture info] --> B[Gemini makes decisions]
    B --> C[Codex implements types/interfaces]
    C --> D[Gemini reviews design]
    D --> E{Concerns?}
    E -->|Yes| C
    E -->|No| F[Design complete]
```

### Phase 3: Implementation (TDD)

**Goal**: Implement with test-first approach.

```mermaid
graph TD
    subgraph Step1[Step 1: Branch]
        A1[Create feature branch]
    end

    subgraph Step2[Step 2: TDD Cycle]
        B1[Codex writes tests] --> B2[Claude runs - RED]
        B2 --> B3[Codex implements]
        B3 --> B4[Claude runs - GREEN]
        B4 --> B5[Codex refactors]
        B5 --> B6[Commit]
    end

    subgraph Step3[Step 3: Docs]
        C1[Update Storybook] --> C2[Commit docs]
    end

    subgraph Step4[Step 4: Review]
        D1[Gemini reviews] --> D2[Validate review]
        D2 --> D3{Valid concerns?}
        D3 -->|Yes| D4[Fix and commit]
        D4 --> D1
        D3 -->|No| D5[Review complete]
    end

    subgraph Step5[Step 5: PR]
        E1[Push branch] --> E2[Create PR]
        E2 --> E3[Merge]
    end

    Step1 --> Step2 --> Step3 --> Step4 --> Step5
```

See `git-workflow.md` for branch/commit details.
See `guides/documentation.md` for doc update rules.

---

## Fallback Decision Tree

```mermaid
graph TD
    A{Need code<br/>implementation?} -->|No| B[Claude executes directly]
    A -->|Yes| C{Codex available?}
    C -->|Yes| D[Use Codex]
    C -->|No| E[Claude implements]
    D --> F[Gemini review<br/>ALWAYS required]
    E --> F
```

---

## Review Validation Flow

After Gemini review, validate the review itself:

```mermaid
graph TD
    A[Gemini Review Result] --> B{Critical/Major<br/>concerns?}
    B -->|Yes| C[Gemini Validate Review]
    C --> D{Outcome}
    D --> E[REVIEW_ACCEPTED<br/>Fix all concerns]
    D --> F[REVIEW_ADJUSTED<br/>Fix valid concerns only]
    D --> G[REVIEW_REJECTED<br/>Request new review]
    B -->|Only Minor| H[Apply at discretion]
```

See `gemini-templates.md` for validation prompt template.

---

## Notes

- **Gemini review is never skipped**, even in fallback mode
- **Always validate Critical/Major concerns** before acting on them
- **Rate limits usually recover in a few minutes** — consider waiting
- **Claude can handle simple file operations** without delegation
