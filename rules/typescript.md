---
paths: "**/*.{ts,tsx}"
---

# TypeScript File Rules

## Strict Mode

Always use strict TypeScript. Never use any.

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

Prefer type over interface for flexibility with union types.

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

- Routes/Directories: kebab-case (app/user-settings/)
- Components: PascalCase (UserCard.tsx)
- Hooks: kebab-case (use-user.ts)
- Utils: kebab-case (format-date.ts)
- Types: kebab-case (user-types.ts)

## React Components

Use function declarations, not React.FC.

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

Custom hooks must start with use.

```typescript
export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  return { user, isLoading, error };
}
```