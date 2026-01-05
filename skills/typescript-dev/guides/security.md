# Security Guide (TypeScript/React)

## Input Validation

### Zod Validation

```typescript
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(1).max(100).trim(),
  age: z.number().int().min(0).max(150),
});

type UserInput = z.infer<typeof userSchema>;

// Usage
const result = userSchema.safeParse(formData);
if (!result.success) {
  console.error(result.error.flatten().fieldErrors);
}
```

### Server-Side Validation (Next.js)

```typescript
// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = userSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Process validated data
  const user = result.data;
}
```

## XSS Prevention

### Avoid dangerouslySetInnerHTML

```typescript
// ❌ Vulnerable
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Safe - React escapes by default
<div>{userContent}</div>

// ✅ If HTML is needed, sanitize first
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

### URL Sanitization

```typescript
// ❌ Vulnerable to javascript: URLs
<a href={userProvidedUrl}>Link</a>

// ✅ Validate URL protocol
function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "#";
    }
    return url;
  } catch {
    return "#";
  }
}
```

## CSRF Protection

### Next.js Server Actions

```typescript
// Next.js 14+ handles CSRF automatically for Server Actions
"use server";

export async function createUser(formData: FormData) {
  // CSRF token validated automatically
  const name = formData.get("name");
}
```

### API Routes with Tokens

```typescript
// Validate CSRF token in API routes
import { headers } from "next/headers";

export async function POST(request: Request) {
  const csrfToken = headers().get("x-csrf-token");
  if (!validateCsrfToken(csrfToken)) {
    return new Response("Invalid CSRF token", { status: 403 });
  }
}
```

## Authentication

### Secure Cookie Settings

```typescript
// next.config.js or middleware
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24, // 1 day
  path: "/",
};
```

### Protected Routes

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};
```

## Environment Variables

### Client vs Server

```typescript
// ✅ Server-only (not exposed to client)
const apiSecret = process.env.API_SECRET;

// ✅ Client-accessible (prefixed with NEXT_PUBLIC_)
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;

// ❌ Never expose secrets to client
// NEXT_PUBLIC_SECRET = "bad-idea"
```

### Validation at Startup

```typescript
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_SECRET: z.string().min(32),
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

## Dependency Security

### Audit Dependencies

```bash
# Check for vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Update dependencies
npm update
```

### Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
    `.replace(/\n/g, ""),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];
```

## Security Checklist

- [ ] All user inputs validated with Zod
- [ ] No dangerouslySetInnerHTML with user content
- [ ] URLs sanitized before use
- [ ] Authentication tokens in httpOnly cookies
- [ ] Protected routes use middleware
- [ ] Secrets not prefixed with NEXT_PUBLIC_
- [ ] Environment variables validated at startup
- [ ] Dependencies audited for vulnerabilities
- [ ] CSP headers configured
- [ ] X-Frame-Options set to DENY
