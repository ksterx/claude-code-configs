// Template: MSW Request Handlers
// Usage: Copy to tests/mocks/handlers.ts

import { http, HttpResponse, delay } from "msw";

// ============================================
// Type Definitions
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserInput {
  name: string;
  email: string;
}

// ============================================
// Mock Data
// ============================================

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

// ============================================
// Handlers
// ============================================

export const handlers = [
  // GET /api/users - List users
  http.get("/api/users", async () => {
    await delay(100); // Simulate network latency
    return HttpResponse.json(mockUsers);
  }),

  // GET /api/users/:id - Get single user
  http.get("/api/users/:id", async ({ params }) => {
    await delay(100);
    const user = mockUsers.find((u) => u.id === params.id);

    if (!user) {
      return HttpResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(user);
  }),

  // POST /api/users - Create user
  http.post("/api/users", async ({ request }) => {
    await delay(100);
    const body = (await request.json()) as CreateUserInput;

    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...body,
    };

    return HttpResponse.json(newUser, { status: 201 });
  }),

  // PUT /api/users/:id - Update user
  http.put("/api/users/:id", async ({ params, request }) => {
    await delay(100);
    const body = (await request.json()) as Partial<User>;
    const userIndex = mockUsers.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      return HttpResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const updatedUser = { ...mockUsers[userIndex], ...body };
    return HttpResponse.json(updatedUser);
  }),

  // DELETE /api/users/:id - Delete user
  http.delete("/api/users/:id", async ({ params }) => {
    await delay(100);
    const userIndex = mockUsers.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      return HttpResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json({ success: true });
  }),
];

// ============================================
// Error Handlers (for testing error states)
// ============================================

export const errorHandlers = {
  networkError: http.get("/api/users", () => {
    return HttpResponse.error();
  }),

  serverError: http.get("/api/users", () => {
    return HttpResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }),

  unauthorized: http.get("/api/users", () => {
    return HttpResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }),
};
