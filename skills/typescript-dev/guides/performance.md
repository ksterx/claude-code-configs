# Performance Optimization Guide (TypeScript/React)

## React Optimization

### Memoization

```typescript
import { memo, useMemo, useCallback } from "react";

// Memoize component (prevents re-render if props unchanged)
const UserCard = memo(function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>;
});

// Memoize expensive calculations
function UserList({ users, filter }: Props) {
  const filteredUsers = useMemo(
    () => users.filter((u) => u.name.includes(filter)),
    [users, filter]
  );

  return filteredUsers.map((u) => <UserCard key={u.id} user={u} />);
}

// Memoize callbacks passed to children
function Parent() {
  const handleClick = useCallback((id: string) => {
    console.log(id);
  }, []);

  return <Child onClick={handleClick} />;
}
```

### When to Memoize

| Scenario | Tool | Use When |
|----------|------|----------|
| Expensive child re-renders | `memo()` | Child renders often with same props |
| Expensive calculations | `useMemo` | Calculation is heavy and deps stable |
| Callback to memoized child | `useCallback` | Child is wrapped in `memo()` |

### When NOT to Memoize

- Simple components with cheap renders
- Props that always change
- Premature optimization without measurement

## Code Splitting

### Dynamic Imports

```typescript
import dynamic from "next/dynamic";

// Lazy load heavy components
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Disable SSR if not needed
});

// Lazy load based on condition
const AdminPanel = dynamic(() => import("@/components/AdminPanel"));

function Dashboard({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div>
      <MainContent />
      {isAdmin && <AdminPanel />}
    </div>
  );
}
```

### Route-Based Splitting

```typescript
// Next.js App Router handles this automatically
// Each page.tsx is a separate chunk

// For shared components that are heavy
// components/features/analytics/index.ts
export const AnalyticsDashboard = dynamic(
  () => import("./AnalyticsDashboard"),
  { ssr: false }
);
```

## Image Optimization

### Next.js Image

```typescript
import Image from "next/image";

// ✅ Optimized
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ❌ Unoptimized
<img src="/hero.jpg" alt="Hero" />
```

### Responsive Images

```typescript
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

## Data Fetching Optimization

### TanStack Query Caching

```typescript
// Aggressive caching for static data
const { data } = useQuery({
  queryKey: ["categories"],
  queryFn: fetchCategories,
  staleTime: 1000 * 60 * 60, // 1 hour
  gcTime: 1000 * 60 * 60 * 24, // 24 hours
});

// Optimistic updates for mutations
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries({ queryKey: ["user", newUser.id] });
    const previous = queryClient.getQueryData(["user", newUser.id]);
    queryClient.setQueryData(["user", newUser.id], newUser);
    return { previous };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(["user", newUser.id], context?.previous);
  },
});
```

### Prefetching

```typescript
// Prefetch on hover
function UserLink({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ["user", userId],
      queryFn: () => fetchUser(userId),
    });
  };

  return (
    <Link href={`/users/${userId}`} onMouseEnter={prefetch}>
      View User
    </Link>
  );
}
```

## Bundle Analysis

### Analyze Bundle Size

```bash
# Install analyzer
npm install -D @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});

# Run analysis
ANALYZE=true npm run build
```

### Import Cost Awareness

```typescript
// ❌ Imports entire library
import { format } from "date-fns";

// ✅ Tree-shakeable import
import format from "date-fns/format";

// ❌ Lodash full import
import _ from "lodash";

// ✅ Lodash specific import
import debounce from "lodash/debounce";
```

## Performance Checklist

- [ ] Heavy components lazy loaded with `dynamic()`
- [ ] `memo()` used for expensive child components
- [ ] `useMemo`/`useCallback` used appropriately
- [ ] Images use `next/image` with proper sizing
- [ ] Data fetching uses appropriate cache strategies
- [ ] Bundle analyzed and optimized
- [ ] Imports are tree-shakeable
- [ ] Above-the-fold content prioritized
