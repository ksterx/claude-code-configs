# Codex Prompt Templates

## MCP Configuration

```typescript
{
  "approval-policy": "never",
  "sandbox": "danger-full-access",
  "cwd": "/path/to/project"
}
```

---

## Standard Prompt Structure

```
Background: [Context about current task]
Purpose: [What needs to be achieved]
Constraints:
- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

Task: [Specific implementation task]
```

---

## Phase 1: Analysis Templates

### Codebase Investigation

```
Background: Adding [feature] to existing Next.js project
Purpose: Understand current project structure and patterns
Constraints:
- Identify Feature-based Architecture compliance
- Note existing component patterns
- Check shared layout usage

Task:
1. Analyze app/ and components/ directory structure
2. Document existing patterns (hooks, stores, UI components)
3. Identify integration points for new feature
```

### Component Pattern Analysis

```
Background: Need to understand existing component patterns
Purpose: Ensure consistency with existing code
Constraints:
- Focus on components/features/ and components/ui/
- Identify hook usage patterns

Task:
1. List existing feature components
2. Document prop patterns and interfaces
3. Note custom hook usage
```

---

## Phase 2: Design Templates

### Interface Design

```
Background: Designing [feature] following Feature-based Architecture
Purpose: Create type definitions and interfaces
Constraints:
- TypeScript strict mode (no `any`)
- Follow existing type patterns in lib/types/
- Use Zod for runtime validation schemas

Task:
1. Create types in lib/types/[feature].ts
2. Create Zod schemas in lib/validation/[feature]-schema.ts
NO implementation code, types/interfaces only.
```

### Component Structure Design

```
Background: Planning component structure for [feature]
Purpose: Design component hierarchy
Constraints:
- Container/Presentational split
- Use shared layout components (PageContainer, PageHeader)
- shadcn/ui for base primitives

Task:
1. Design component tree
2. Define props interfaces
3. Identify hooks needed
4. Plan Storybook stories
```

---

## Phase 3: Implementation Templates

### Test Writing (Red Phase)

```
Background: TDD Red phase for [component]
Purpose: Write failing tests before implementation
Constraints:
- Vitest + Testing Library
- AAA pattern (Arrange/Act/Assert)
- Test user interactions and accessibility

Task: Create tests/components/[Component].test.tsx
Include tests for:
1. Rendering with required props
2. User interactions (click, input)
3. Loading/error states
4. Accessibility (role, aria-label)
```

### Component Implementation (Green Phase)

```
Background: TDD Green phase for [component]
Purpose: Write minimal code to pass tests
Constraints:
- TypeScript strict mode
- Use shadcn/ui components
- Follow existing patterns in components/features/

Task: Implement [component] to pass all tests
- Minimal implementation only
- No premature optimization
- All tests must pass
```

### Hook Implementation

```
Background: Implementing custom hook for [feature]
Purpose: Extract logic from component
Constraints:
- TypeScript strict mode
- Use TanStack Query for data fetching
- Follow patterns in lib/hooks/

Task: Implement lib/hooks/use-[feature].ts
- Return typed object
- Handle loading/error states
- Use query invalidation for mutations
```

### Storybook Story

```
Background: Adding Storybook documentation for [component]
Purpose: Document component variants and usage
Constraints:
- Use CSF3 format
- Include all prop variants
- Add accessibility addon

Task: Create stories/[Component].stories.tsx
- Default story
- Variant stories (loading, error, empty)
- Interactive controls
- Documentation in MDX if complex
```

---

## Common Constraints Block

Copy-paste this for most TypeScript tasks:

```
Constraints:
- TypeScript strict mode (no `any`, explicit return types)
- Feature-based Architecture (Pages → Features → Hooks → UI)
- Use shadcn/ui components
- Use shared layouts (PageContainer, PageHeader)
- kebab-case for files (except PascalCase components)
- TanStack Query for data fetching
- Zustand for global state
- React Hook Form + Zod for forms
- Framer Motion for animations
- date-fns for date handling
- Sonner for toast notifications
```

---

## Form Implementation Template

```
Background: Implementing form for [feature]
Purpose: Create validated form with proper UX
Constraints:
- React Hook Form + @hookform/resolvers
- Zod schema validation
- shadcn/ui Form components
- Sonner for success/error feedback
- Accessible form fields

Task: Create components/features/[feature]/[Feature]Form.tsx
- Define Zod schema
- Use useForm with zodResolver
- Include loading state
- Handle errors gracefully
- Show toast on success/error
```

---

## Animation Implementation Template

```
Background: Adding animations to [component]
Purpose: Enhance UX with smooth transitions
Constraints:
- Framer Motion for animations
- Use shared animation components from lib/animations/
- Performance-conscious (avoid layout thrashing)
- Respect reduced-motion preferences

Task: Add animations to [component]
- Entry/exit animations
- Hover/tap feedback
- List stagger animations (if applicable)
- Check prefers-reduced-motion
```
