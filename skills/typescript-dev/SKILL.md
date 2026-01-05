---
name: typescript-dev
version: 1.2.0
description: |
  Use for ALL TypeScript/Next.js frontend development tasks.
  Applies Feature-based Architecture + TDD + Design Consistency with 3-agent workflow.

  Triggers: TypeScript, Next.js, React, Frontend, TSX, Component, shadcn, UI
  Use cases: Frontend development, UI implementation, Next.js App Router

  Tech Stack:
    Framework: Next.js 14+ (App Router)
    State: Zustand (global), TanStack Query (server)
    Forms: React Hook Form + Zod
    UI: shadcn/ui, Framer Motion
    Utils: date-fns, Sonner (toast)
    Test: Vitest, Playwright, MSW

  Extends: dev-workflow-core (shared workflow patterns)
---

# TypeScript Development Skill

## Contents

| Directory | Description |
|-----------|-------------|
| workflow/ | Workflow details, prompt templates, git workflow |
| guides/ | Coding standards, architecture, testing, documentation |
| examples/ | Step-by-step implementation examples |
| templates/ | Code templates (components, hooks, stores, forms, animations) |
| scripts/ | Validation scripts |
| checklists/ | Phase checklists |

## Shared Patterns

@~/.claude/skills/dev-workflow-core/SKILL.md

---

## Prime Directives

### 1. Role Assignment

| Agent | Normal | Codex Unavailable |
|-------|--------|-------------------|
| **Claude** | Orchestration, decisions | Decisions + implementation |
| **Codex** | Code implementation | — |
| **Gemini** | Review, quality assessment | Review (required) |

### 2. Claude Direct Execution

The following do NOT require Codex:
- Git operations (commit, push, PR)
- File creation/deletion
- Minor fixes (1-2 lines)
- Implementation during Codex rate limits

### 3. Codex Fallback

```mermaid
graph TD
    A[Codex invocation] --> B{Success?}
    B -->|Yes| C[Normal flow]
    B -->|No| D[Claude implements]
    D --> E[Gemini review - required]
```

### 4. Complete Resolution Principle

Iterate until Gemini returns "no concerns". Never settle for partial fixes.

@~/.claude/skills/dev-workflow-core/workflow/iteration-control.md

---

## Quick Start

### Basic Flow

```mermaid
graph LR
    subgraph Phase1[Phase 1: Analysis]
        A1[Codex investigation] --> A2[Gemini analysis]
    end
    subgraph Phase2[Phase 2: Design]
        B1[Codex design] --> B2[Gemini review] --> B3[Iterate]
    end
    subgraph Phase3[Phase 3: Implementation]
        C1[Create branch] --> C2[Tests - Red]
        C2 --> C3[Implement - Green]
        C3 --> C4[Refactor]
        C4 --> C5[Storybook + Commit]
        C5 --> C6[PR]
    end
    Phase1 --> Phase2 --> Phase3
```

---

## Coding Standards (Summary)

@~/.claude/skills/typescript-dev/guides/coding-standards.md

### TypeScript Strict Mode

```typescript
// ✅ Strict types
function getUser(id: string): User | null { ... }

// ❌ No any
function getUser(id: any): any { ... }
```

### File Naming

- Routes/Dirs: kebab-case (app/user-settings/)
- Components: PascalCase (UserCard.tsx)
- Hooks/Utils: kebab-case (use-user.ts)

---

## Tech Stack

@~/.claude/skills/typescript-dev/guides/libraries.md

| Category | Library | Purpose |
|----------|---------|---------|
| Framework | Next.js 14+ | App Router, RSC |
| State (Global) | Zustand | Client state |
| State (Server) | TanStack Query | Server state, caching |
| Validation | Zod | Runtime schema |
| UI | shadcn/ui | Base components |
| Forms | React Hook Form | Form management |
| Animation | Framer Motion | Animations |
| Test | Vitest + Playwright | Unit + E2E |

---

## Validation Commands

```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit

# Test (unit)
npm run test

# Test (E2E)
npx playwright test

# Build
npm run build
```
