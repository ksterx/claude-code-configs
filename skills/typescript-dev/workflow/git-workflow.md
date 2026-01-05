# Git Workflow

## Branch Strategy

### Branch Types

| Type | Pattern | Purpose | Lifetime |
|------|---------|---------|----------|
| `main` | `main` | Production-ready code | Permanent |
| `develop` | `develop` | Integration branch | Permanent |
| `feature` | `feature/<ticket>-<description>` | New features | Until merged |
| `fix` | `fix/<ticket>-<description>` | Bug fixes | Until merged |
| `refactor` | `refactor/<description>` | Code improvements | Until merged |
| `docs` | `docs/<description>` | Documentation only | Until merged |

### Branch Naming

```
feature/123-user-authentication
fix/456-login-timeout
refactor/extract-validation-logic
docs/storybook-update
```

### Branch Flow

```mermaid
gitGraph
    commit id: "initial"
    branch develop
    checkout develop
    commit id: "setup"
    branch feature/123-user-form
    checkout feature/123-user-form
    commit id: "feat: add UserForm component"
    commit id: "test: add UserForm tests"
    commit id: "feat: add form validation"
    commit id: "docs: add UserForm story"
    checkout develop
    merge feature/123-user-form
    branch fix/456-modal
    checkout fix/456-modal
    commit id: "fix: resolve modal z-index"
    commit id: "test: add modal tests"
    checkout develop
    merge fix/456-modal
    checkout main
    merge develop
```

---

## Commit Strategy

### Commit Granularity

Each commit should be:
- **Atomic**: One logical change
- **Complete**: Tests pass, build succeeds
- **Documented**: Includes doc updates if needed

### Commit Types (Conventional Commits)

| Type | Description | Triggers Doc Update? |
|------|-------------|---------------------|
| `feat` | New feature/component | Yes - Storybook story |
| `fix` | Bug fix | Maybe - if behavior changes |
| `refactor` | Code restructure | No |
| `test` | Add/update tests | No |
| `docs` | Documentation only | N/A |
| `style` | Formatting, CSS | Maybe - Storybook |
| `chore` | Maintenance | No |

### Commit Message Format

```
<type>(<scope>): <description>

[body]

[footer]
```

### Examples

```bash
# Feature with Storybook
feat(user): add UserCard component

Implement UserCard with avatar, name, and email display.
Uses shadcn Card component as base.

Docs: Added Storybook story for UserCard.

# Bug fix
fix(modal): resolve z-index stacking issue

Modal was appearing behind sidebar on mobile.
Fixed by updating z-index in dialog component.

Fixes #456

# Refactor (no docs needed)
refactor(hooks): extract useFormValidation

Moved validation logic from UserForm to dedicated hook.
No behavior changes.
```

---

## Commit Checklist

Before each commit:

- [ ] Code changes complete
- [ ] Tests pass: `npm run test`
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] Lint passes: `npm run lint`
- [ ] Documentation updated (if applicable)
  - [ ] New component → Add Storybook story
  - [ ] Component API change → Update story args
  - [ ] New feature → Add tutorial or how-to
  - [ ] Hook/utility change → Update TypeDoc comments

### Documentation Decision Tree

```mermaid
graph TD
    A{Commit type?} --> B[New component]
    A --> C[Component API change]
    A --> D[New hook/utility]
    A --> E[New feature]
    A --> F[Config change]
    A --> G[Internal refactor]

    B --> B1[Add: Storybook story<br/>in stories/]
    C --> C1[Update: Storybook<br/>story args/docs]
    D --> D1[Add: TSDoc comments<br/>TypeDoc generates]
    E --> E1[Add: tutorials/<br/>or how-to/]
    F --> F1[Update: reference/<br/>configuration.md]
    G --> G1[Skip docs<br/>unless API changes]
```

---

## Pull Request Strategy

### PR Scope

One PR should contain:
- **One feature** or **one fix**
- Related tests
- Related Storybook stories
- Max 400 lines changed (excluding auto-generated)

### PR Naming

```
feat(user): implement user profile page (#123)
fix(modal): resolve z-index issue (#456)
docs: add authentication tutorial
refactor: extract form validation hooks
```

### PR Template

```markdown
## Summary
[Brief description of changes]

## Type
- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation

## Changes
- [Change 1]
- [Change 2]

## Screenshots
[If UI changes, add before/after screenshots]

## Documentation
- [ ] No docs needed
- [ ] Storybook story added/updated
- [ ] TypeDoc comments added

## Testing
- [ ] Unit tests added/updated
- [ ] Component tests added/updated
- [ ] All tests pass

## Checklist
- [ ] Code follows project standards
- [ ] Self-reviewed
- [ ] Gemini review passed
- [ ] Accessibility checked
- [ ] Responsive design verified
```

### PR Flow

```mermaid
graph TD
    A[Create feature branch<br/>from develop] --> B[Implement with<br/>atomic commits]
    B --> C[Push and create PR]
    C --> D[Gemini reviews code]
    D --> E[Gemini validates review]
    E --> F{Concerns?}
    F -->|Yes| G[Address feedback]
    G --> D
    F -->|No| H[Squash merge to develop]
    H --> I[Delete feature branch]
```

---

## Workflow Integration

### Phase 3 with Git

```mermaid
graph TD
    subgraph Step1[Step 1: Create Branch]
        A1[git checkout -b feature/123-user-card]
    end

    subgraph Step2[Step 2: TDD Cycle]
        B1[Write tests] --> B2[commit: test: add UserCard tests]
        B2 --> B3[Implement] --> B4[commit: feat: implement UserCard]
        B4 --> B5[Refactor] --> B6[commit: refactor: extract props]
    end

    subgraph Step3[Step 3: Documentation]
        C1[Add Storybook story] --> C2[commit: docs: add UserCard story]
    end

    subgraph Step4[Step 4: Push & PR]
        D1[git push -u origin feature/123-user-card]
    end

    subgraph Step5[Step 5: Review Cycle]
        E1[Gemini review] --> E2[Gemini validate]
        E2 --> E3{Issues?}
        E3 -->|Yes| E4[Fix] --> E5[commit: fix: address feedback]
        E5 --> E1
        E3 -->|No| E6[Done]
    end

    subgraph Step6[Step 6: Merge]
        F1[Squash merge to develop] --> F2[Delete branch]
    end

    Step1 --> Step2 --> Step3 --> Step4 --> Step5 --> Step6
```

### Commit Frequency Guidelines

| Change Type | Commit After |
|-------------|--------------|
| Test file created | Each test file |
| Component complete | Each component |
| Hook implemented | Each hook |
| Story added | Each story |
| Bug fixed | Each fix |
