# TypeScript File Rules

globs: ["*.ts", "*.tsx"]

## Strict Mode

Always use strict TypeScript. Never use `any`.

```typescript
// ✅ Correct
function getUser(id: string): User | null { ... }
function processData(data: unknown): ProcessedData {
  if (isValidData(data)) {
    return transform(data);
  }
  throw new Error('Invalid data');
}

// ❌ Incorrect
function getUser(id: any): any { ... }
```

## Type Definitions

Prefer `type` over `interface` for flexibility with union types.

```typescript
// ✅ Preferred
type User = {
  id: string;
  name: string;
  role: 'admin' | 'user';
};

type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// ⚠️ Use interface only when extending is needed
interface Repository<T> {
  get(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
}
```

## File Naming

```
Routes/Directories:  kebab-case    (app/user-settings/)
Components:          PascalCase    (UserCard.tsx)
Hooks:               kebab-case    (use-user.ts)
Utils:               kebab-case    (format-date.ts)
Types:               kebab-case    (user-types.ts)
```

## React Components

Use function declarations, not `React.FC`.

```typescript
// ✅ Correct
type UserCardProps = {
  user: User;
  onSelect?: (user: User) => void;
};

export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div onClick={() => onSelect?.(user)}>
      {user.name}
    </div>
  );
}

// ❌ Incorrect
export const UserCard: React.FC<UserCardProps> = ({ user }) => { ... }
```

## Hooks

Custom hooks must start with `use`.

```typescript
// ✅ Correct
export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  // ...
  return { user, isLoading, error };
}

// Return object for multiple values
// Return single value if only one thing returned
```

## State Management

Reference `@typescript-dev/guides/libraries.md` for patterns:

```typescript
// Global state: Zustand
import { create } from 'zustand';

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Server state: TanStack Query
import { useQuery } from '@tanstack/react-query';

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });
}
```

## Forms

Use React Hook Form + Zod.

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  // ...
}
```

## Imports

```typescript
// React/Next
import { useState, useEffect } from 'react';
import Link from 'next/link';

// External libraries
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// Internal - absolute imports
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';

// Internal - relative imports
import { UserCard } from './user-card';
import type { User } from './types';
```

## Architecture

Reference `@typescript-dev/guides/architecture.md` for:
- Feature-based structure
- Component composition patterns
- Server/Client component separation (Next.js)

## Testing

Reference `@typescript-dev/guides/testing.md` for:
- Vitest setup
- React Testing Library patterns
- MSW for API mocking
- Playwright for E2E


