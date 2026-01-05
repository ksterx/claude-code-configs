# Recommended Libraries

## Core Stack

| Category | Library | Purpose |
|----------|---------|---------|
| Framework | Next.js 14+ | App Router, RSC |
| State (Global) | Zustand | Client state |
| State (Server) | TanStack Query | Server state, caching |
| Validation | Zod | Runtime schema validation |
| UI | shadcn/ui | Base components |
| Forms | React Hook Form | Form state management |
| Animation | Framer Motion | Declarative animations |
| Date | date-fns | Date manipulation |
| Icons | Lucide React | Icon set (shadcn default) |
| Toast | Sonner | Notifications (shadcn) |

---

## Form Management

### React Hook Form + Zod

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
```

### With shadcn/ui Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Required"),
});

type FormData = z.infer<typeof schema>;

export function UserForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", name: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

---

## Animation

### Framer Motion Patterns

```typescript
import { motion, AnimatePresence } from "framer-motion";

// Fade in/out
export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Slide up
export function SlideUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// List animation
export function AnimatedList({ items }: { items: Item[] }) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          layout
        >
          {item.content}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// Hover/tap effects
export function InteractiveCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
```

### Common Variants

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
};
```

---

## Date Handling

### date-fns Patterns

```typescript
import {
  format,
  formatDistance,
  formatRelative,
  isValid,
  parseISO,
  addDays,
  startOfWeek,
  endOfWeek,
  differenceInDays,
} from "date-fns";
import { ja } from "date-fns/locale";

// Format date
format(new Date(), "yyyy-MM-dd"); // "2024-01-15"
format(new Date(), "PPP", { locale: ja }); // "2024年1月15日"

// Relative time
formatDistance(new Date(), addDays(new Date(), 3)); // "in 3 days"
formatRelative(new Date(), addDays(new Date(), -1)); // "yesterday at ..."

// Parse and validate
const date = parseISO("2024-01-15");
if (isValid(date)) {
  // Safe to use
}

// Date ranges
const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

// Difference
differenceInDays(new Date("2024-01-20"), new Date("2024-01-15")); // 5
```

### Utility Functions

```typescript
// lib/utils/date.ts
import { format, parseISO, isValid } from "date-fns";
import { ja } from "date-fns/locale";

export function formatDate(
  date: string | Date,
  pattern = "PPP"
): string {
  const parsed = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsed)) return "Invalid date";
  return format(parsed, pattern, { locale: ja });
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, "PPP p");
}

export function formatShortDate(date: string | Date): string {
  return formatDate(date, "MM/dd");
}
```

---

## Toast Notifications

### Sonner Usage

```typescript
import { toast } from "sonner";

// Basic
toast("Event created");

// With description
toast("Event created", {
  description: "Monday, January 15, 2024",
});

// Success/Error/Warning
toast.success("Saved successfully");
toast.error("Failed to save");
toast.warning("Please check your input");

// Loading state
const promise = saveData();
toast.promise(promise, {
  loading: "Saving...",
  success: "Saved!",
  error: "Failed to save",
});

// With action
toast("Event deleted", {
  action: {
    label: "Undo",
    onClick: () => restoreEvent(),
  },
});

// Custom duration
toast("Quick message", { duration: 2000 });

// Dismiss
const toastId = toast("Loading...");
toast.dismiss(toastId);
```

### Setup (layout.tsx)

```typescript
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
```

---

## Testing

### Vitest Setup

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/", "tests/"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

### Test Setup

```typescript
// tests/setup.ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
```

### MSW (API Mocking)

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: "1", name: "John" },
      { id: "2", name: "Jane" },
    ]);
  }),

  http.post("/api/users", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: "3", ...body }, { status: 201 });
  }),

  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json({ id: params.id, name: "John" });
  }),
];

// tests/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// tests/setup.ts (add)
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Playwright E2E

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});

// e2e/login.spec.ts
import { test, expect } from "@playwright/test";

test("user can log in", async ({ page }) => {
  await page.goto("/login");
  await page.fill('[name="email"]', "test@example.com");
  await page.fill('[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
});
```

---

## Additional Libraries

### Tables (TanStack Table)

```typescript
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
```

### Charts (Recharts)

```typescript
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
```

### Drag & Drop (@dnd-kit)

```typescript
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
```

### Rich Text (Tiptap)

```typescript
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
```

### File Upload (react-dropzone)

```typescript
import { useDropzone } from "react-dropzone";

function FileUpload() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => handleFiles(files),
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? "Drop here..." : "Drag files or click"}
    </div>
  );
}
```

---

## Package Installation

```bash
# Core (already in skill)
npm install zustand @tanstack/react-query zod

# Forms
npm install react-hook-form @hookform/resolvers

# Animation
npm install framer-motion

# Date
npm install date-fns

# Toast (via shadcn)
npx shadcn@latest add sonner

# Testing
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom msw
npm install -D @playwright/test

# Optional
npm install @tanstack/react-table recharts @dnd-kit/core @dnd-kit/sortable @tiptap/react @tiptap/starter-kit react-dropzone
```
