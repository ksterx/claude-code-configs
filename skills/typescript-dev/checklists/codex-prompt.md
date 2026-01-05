# Codex Prompt Checklist

Use before sending prompts to Codex.

---

## Required Elements

### Context Section

- [ ] **Background**: Clear context about current state
- [ ] **Purpose**: Specific goal of the task
- [ ] **Constraints**: Technical limitations and requirements

### Task Definition

- [ ] **Scope**: Clearly defined boundaries
- [ ] **Output format**: Expected file structure or code format
- [ ] **Integration points**: Where code connects to existing system

---

## Prompt Structure

```
Background: [Current state and context]
Purpose: [Specific goal]
Constraints:
- [Constraint 1]
- [Constraint 2]

Task:
1. [Step 1]
2. [Step 2]
```

---

## By Task Type

### Investigation

- [ ] Specify what patterns to look for
- [ ] Define output format (file list, summary, analysis)
- [ ] Set scope boundaries (directories, file types)

### Design

- [ ] Reference existing patterns
- [ ] Specify TypeScript strict mode requirements
- [ ] Define interface/type expectations
- [ ] Request "no implementation"

### Implementation

- [ ] Specify TDD phase (Red/Green/Refactor)
- [ ] Reference test file if Green phase
- [ ] Specify "minimal code" for Green phase
- [ ] Include shadcn/ui components to use

### Test Creation

- [ ] Specify testing library (Vitest + Testing Library)
- [ ] Request AAA pattern (Arrange-Act-Assert)
- [ ] Include accessibility test requirements
- [ ] List test scenarios expected

---

## Quality Markers

- [ ] No ambiguous terms
- [ ] No assumed knowledge
- [ ] Explicit file paths
- [ ] Clear success criteria

---

## Anti-patterns

Avoid these in prompts:

- "Make it good" → Specify quality criteria
- "Handle errors" → Specify error scenarios
- "Follow best practices" → Reference specific patterns
- "Similar to..." without providing the reference

---

## Example Prompt

```
Background: Adding UserCard to Next.js 14 project with shadcn/ui
Purpose: TDD Red phase - create failing tests
Constraints:
- Vitest + @testing-library/react
- AAA pattern (Arrange-Act-Assert)
- Test file in tests/components/user-card.test.tsx
- Must test: rendering, click interaction, keyboard accessibility

Task:
1. Create test file with describe block for UserCard
2. Write tests for: display name, display email, onSelect callback, className prop
3. Include accessibility test for keyboard navigation
```
