// Template: Playwright E2E Test Example
// Usage: Copy to e2e/example.spec.ts

import { test, expect } from "@playwright/test";

// ============================================
// Basic Navigation Tests
// ============================================

test.describe("Navigation", () => {
  test("should navigate to home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Home/);
  });

  test("should navigate between pages", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL("/about");
  });
});

// ============================================
// Form Tests
// ============================================

test.describe("Login Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("should show validation errors", async ({ page }) => {
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("should login successfully", async ({ page }) => {
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Submit" }).click();

    // Expect redirect to dashboard
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText("Welcome")).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });
});

// ============================================
// Component Interaction Tests
// ============================================

test.describe("User List", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/users");
  });

  test("should display list of users", async ({ page }) => {
    await expect(page.getByRole("list")).toBeVisible();
    const users = page.getByRole("listitem");
    await expect(users).toHaveCount(10);
  });

  test("should filter users", async ({ page }) => {
    await page.getByPlaceholder("Search users").fill("John");
    const users = page.getByRole("listitem");
    await expect(users).toHaveCount(2);
  });

  test("should open user details", async ({ page }) => {
    await page.getByRole("listitem").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("User Details")).toBeVisible();
  });
});

// ============================================
// Accessibility Tests
// ============================================

test.describe("Accessibility", () => {
  test("should have no accessibility violations on home page", async ({
    page,
  }) => {
    await page.goto("/");

    // Basic checks (for full a11y, use @axe-core/playwright)
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("navigation")).toBeVisible();

    // Check focus order
    await page.keyboard.press("Tab");
    const firstFocusable = page.locator(":focus");
    await expect(firstFocusable).toBeVisible();
  });
});

// ============================================
// Mobile Tests
// ============================================

test.describe("Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should show mobile menu", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();

    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("navigation")).toBeVisible();
  });
});

// ============================================
// API Integration Tests
// ============================================

test.describe("API Integration", () => {
  test("should create a new item", async ({ page }) => {
    await page.goto("/items/new");

    await page.getByLabel("Name").fill("New Item");
    await page.getByLabel("Description").fill("Item description");
    await page.getByRole("button", { name: "Create" }).click();

    // Wait for success message
    await expect(page.getByText("Item created")).toBeVisible();

    // Verify redirect
    await expect(page).toHaveURL(/\/items\/\d+/);
  });
});
