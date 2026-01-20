# TypeScript/React Tech Stack

When working on TypeScript/React frontend projects, use this stack unless the project already has different choices established.

## Core Stack

| Category | Technology | Notes |
|----------|-----------|-------|
| **Framework** | Next.js (App Router) | For new projects; don't migrate existing Pages Router unless asked |
| **State** | Zustand | Lightweight, hooks-based |
| **UI Components** | shadcn/ui | Requires Tailwind CSS; copy-paste components |
| **Animation** | Framer Motion | For complex animations |
| **Validation** | Zod | Schema validation, type inference |
| **E2E Testing** | Playwright | Cross-browser testing |
| **Unit Testing** | Vitest | Fast, ESM-native test runner |

## When to Apply

- New TypeScript/React project creation
- Adding new features to existing TS/React projects (respect existing choices)
- User hasn't specified alternative technologies

## When NOT to Apply

- Project already uses different state management (Redux, Jotai, etc.)
- Project uses different UI library (MUI, Chakra, etc.)
- User explicitly requests different stack
- Backend-only TypeScript projects

## Best Practices

### Next.js App Router (when `next` detected)
- Use Server Components by default
- Client Components only when needed (`"use client"`)
- Leverage Server Actions for mutations
- For existing Pages Router projects: don't migrate unless explicitly requested

### React-only (Vite/CRA, no `next`)
- Follow existing project structure
- Use client-side patterns as normal
- Next.js-specific guidance does not apply

### Zustand
- One store per domain/feature
- Use slices pattern for large stores
- Persist middleware for local storage

### shadcn/ui
- **Prerequisite**: Tailwind CSS must be configured
- Install components as needed: `npx shadcn@latest add [component]`
- Customize in `components/ui/`
- Follow existing theme configuration

### Zod
- Define schemas alongside types
- Use `.infer<>` for type extraction
- Integrate with React Hook Form via `@hookform/resolvers`

### Testing
- Vitest for unit/integration tests (works with both Vite and Next.js)
- Playwright for E2E and visual testing
- Co-locate test files with source (`*.test.ts`)
