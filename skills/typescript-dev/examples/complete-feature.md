# Complete Feature Implementation Example

This example demonstrates the full 3-agent workflow for implementing a UserCard component.

## Context

- Project: Next.js 14 + shadcn/ui
- Feature: UserCard component with avatar, name, email display

---

## Phase 1: Analysis & Requirements

### Step 1: Codex Investigation

**Prompt to Codex:**

```
Background: Adding UserCard to existing Next.js project
Purpose: Understand current patterns and component structure
Constraints:
- Identify existing component patterns
- Note shadcn/ui usage
- Check shared layout components

Task:
1. Analyze components/ directory structure
2. Document existing Card component usage
3. Identify integration points
```

**Expected Output:**

```
Project structure:
components/
├── ui/
│   ├── card.tsx (shadcn)
│   ├── avatar.tsx (shadcn)
│   └── button.tsx
├── layout/
│   ├── PageContainer.tsx
│   └── PageHeader.tsx
└── features/
    └── dashboard/
        └── StatsCard.tsx

Patterns:
- shadcn Card as base
- Props interface with optional className
- cn() for class merging
```

### Step 2: Gemini Analysis

**Prompt to Gemini:**

```
Analyze this project structure for adding UserCard component.

[Codex output above]

Evaluate:
- Component pattern consistency
- Suggested location for UserCard
- Integration approach
```

**Expected Response:**

```
## Summary
APPROVED for UserCard implementation

## Recommendations
1. Create in components/features/user/
2. Use shadcn Card and Avatar as base
3. Follow StatsCard pattern for props interface
```

---

## Phase 2: Design

### Step 1: Interface Design (Codex)

**Prompt to Codex:**

```
Background: Designing UserCard component
Purpose: Create type definitions and interfaces
Constraints:
- TypeScript strict mode
- Follow existing patterns
- No implementation

Task:
1. Create lib/types/user.ts
2. Design UserCard props interface
```

**Output:**

```typescript
// lib/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// UserCard props (inline in component)
interface UserCardProps {
  user: User;
  onSelect?: (id: string) => void;
  className?: string;
}
```

### Step 2: Design Review (Gemini)

**Prompt to Gemini:**

```
Review this design with extremely critical attitude.

[Codex output - interfaces]

Evaluate:
- Type completeness
- Props interface design
- Extensibility

Format: APPROVED / NEEDS_REVISION
```

**Response:** `APPROVED - No concerns`

---

## Phase 3: Implementation (TDD)

### Cycle 1: UserCard Component

#### Red Phase (Codex)

**Prompt:**

```
Background: TDD Red phase for UserCard
Purpose: Write failing tests
Constraints:
- Vitest + Testing Library
- AAA pattern
- Test rendering and interactions

Task: Create tests/components/user-card.test.tsx
```

**Output:**

```typescript
// tests/components/user-card.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserCard } from "@/components/features/user/UserCard";

describe("UserCard", () => {
  const mockUser = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  };

  it("should display user name", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should display user email", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("should call onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(<UserCard user={mockUser} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("article"));

    expect(onSelect).toHaveBeenCalledWith("1");
  });

  it("should apply custom className", () => {
    render(<UserCard user={mockUser} className="custom-class" />);
    expect(screen.getByRole("article")).toHaveClass("custom-class");
  });
});
```

#### Claude Runs Tests (RED)

```bash
$ npm run test -- user-card.test.tsx
FAIL - Cannot find module '@/components/features/user/UserCard'
```

✅ Red confirmed

#### Green Phase (Codex)

**Prompt:**

```
Background: TDD Green phase for UserCard
Purpose: Minimal implementation to pass tests
Constraints:
- TypeScript strict mode
- Use shadcn Card
- Minimal code

Task: Implement components/features/user/UserCard.tsx
```

**Output:**

```typescript
// components/features/user/UserCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils/cn";
import type { User } from "@/lib/types/user";

interface UserCardProps {
  user: User;
  onSelect?: (id: string) => void;
  className?: string;
}

export function UserCard({ user, onSelect, className }: UserCardProps) {
  return (
    <Card
      role="article"
      className={cn("cursor-pointer hover:bg-accent", className)}
      onClick={() => onSelect?.(user.id)}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
```

#### Claude Runs Tests (GREEN)

```bash
$ npm run test -- user-card.test.tsx
✓ should display user name
✓ should display user email
✓ should call onSelect when clicked
✓ should apply custom className

4 passed
```

✅ Green confirmed

#### Review (Gemini)

**Prompt:**

```
Review this implementation with extremely critical attitude.

[Code and tests]

Evaluate:
- Component composition
- Accessibility
- Type safety
- Design consistency

Format: APPROVED / NEEDS_REVISION
```

**Response:**

```
## Summary
NEEDS_REVISION

## Concerns
- [Minor] Missing keyboard accessibility (Enter/Space to select)
- [Minor] Should add aria-label for screen readers

## Recommendations
1. Add onKeyDown handler for Enter/Space
2. Add aria-label to Card
```

#### Fix and Re-review

**Codex fixes:**

```typescript
<Card
  role="article"
  aria-label={`User card for ${user.name}`}
  tabIndex={onSelect ? 0 : undefined}
  className={cn("cursor-pointer hover:bg-accent", className)}
  onClick={() => onSelect?.(user.id)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      onSelect?.(user.id);
    }
  }}
>
```

**Gemini re-review:** `APPROVED - No concerns`

---

## Step 3: Documentation

### Add Storybook Story

```typescript
// stories/UserCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "@/components/features/user/UserCard";

const meta: Meta<typeof UserCard> = {
  title: "Features/User/UserCard",
  component: UserCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    },
  },
};

export const WithAvatar: Story = {
  args: {
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "https://example.com/avatar.jpg",
    },
  },
};
```

---

## Step 4: Commit and PR

```bash
# Commits
git add lib/types/user.ts
git commit -m "feat(user): add User type definition"

git add tests/components/user-card.test.tsx
git commit -m "test(user): add UserCard tests"

git add components/features/user/UserCard.tsx
git commit -m "feat(user): implement UserCard component"

git add stories/UserCard.stories.tsx
git commit -m "docs(user): add UserCard Storybook story"

# Push and create PR
git push -u origin feature/123-user-card
```

---

## Final Verification

```bash
# All checks
npx tsc --noEmit && npm run lint && npm run test

# Storybook
npm run storybook
```

## Checklist

- [x] All tests green
- [x] Gemini review: "No concerns"
- [x] Type check passes
- [x] Storybook story added
- [x] Accessibility verified
- [x] Feature branch created
- [x] Commits atomic and complete
