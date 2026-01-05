// Template: Component Test
// Location: tests/components/[component-name].test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FeatureComponent } from "@/components/features/feature/FeatureComponent";

// Test wrapper for providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const createWrapper = () => {
  const queryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Mock data
const mockData = {
  id: "1",
  name: "Test Item",
  description: "Test description",
};

describe("FeatureComponent", () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should display the item name", () => {
      // Arrange
      render(<FeatureComponent data={mockData} />);

      // Assert
      expect(screen.getByText("Test Item")).toBeInTheDocument();
    });

    it("should display the item description", () => {
      // Arrange
      render(<FeatureComponent data={mockData} />);

      // Assert
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      // Arrange
      render(<FeatureComponent data={mockData} className="custom-class" />);

      // Assert
      expect(screen.getByRole("article")).toHaveClass("custom-class");
    });
  });

  describe("Interactions", () => {
    it("should call onAction when clicked", async () => {
      // Arrange
      const onAction = vi.fn();
      render(<FeatureComponent data={mockData} onAction={onAction} />);

      // Act
      await userEvent.click(screen.getByRole("article"));

      // Assert
      expect(onAction).toHaveBeenCalledWith("1");
      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it("should call onAction on Enter key", () => {
      // Arrange
      const onAction = vi.fn();
      render(<FeatureComponent data={mockData} onAction={onAction} />);

      // Act
      fireEvent.keyDown(screen.getByRole("article"), { key: "Enter" });

      // Assert
      expect(onAction).toHaveBeenCalledWith("1");
    });

    it("should call onAction on Space key", () => {
      // Arrange
      const onAction = vi.fn();
      render(<FeatureComponent data={mockData} onAction={onAction} />);

      // Act
      fireEvent.keyDown(screen.getByRole("article"), { key: " " });

      // Assert
      expect(onAction).toHaveBeenCalledWith("1");
    });

    it("should not throw when onAction is not provided", async () => {
      // Arrange
      render(<FeatureComponent data={mockData} />);

      // Act & Assert - should not throw
      await userEvent.click(screen.getByRole("article"));
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA label", () => {
      // Arrange
      render(<FeatureComponent data={mockData} />);

      // Assert
      expect(screen.getByRole("article")).toHaveAttribute(
        "aria-label",
        "Component for Test Item"
      );
    });

    it("should be focusable when interactive", () => {
      // Arrange
      render(<FeatureComponent data={mockData} onAction={vi.fn()} />);

      // Assert
      expect(screen.getByRole("article")).toHaveAttribute("tabIndex", "0");
    });

    it("should not be focusable when not interactive", () => {
      // Arrange
      render(<FeatureComponent data={mockData} />);

      // Assert
      expect(screen.getByRole("article")).not.toHaveAttribute("tabIndex");
    });
  });
});

// Template: Hook Test
// Location: tests/hooks/use-[resource].test.ts

describe("useResources", () => {
  it("should return empty array initially", () => {
    // Arrange
    const { result } = renderHook(() => useResources(), {
      wrapper: createWrapper(),
    });

    // Assert
    expect(result.current.resources).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it("should return resources after loading", async () => {
    // Arrange
    const { result } = renderHook(() => useResources(), {
      wrapper: createWrapper(),
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.resources).toHaveLength(2);
  });
});

// Template: Store Test
// Location: tests/stores/[feature]-store.test.ts

describe("useFeatureStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useFeatureStore.getState().reset();
  });

  it("should add item", () => {
    // Arrange
    const { addItem, items } = useFeatureStore.getState();

    // Act
    addItem({ id: "1", name: "Test", status: "active" });

    // Assert
    expect(useFeatureStore.getState().items).toHaveLength(1);
  });

  it("should select item", () => {
    // Arrange
    const { selectItem } = useFeatureStore.getState();

    // Act
    selectItem("1");

    // Assert
    expect(useFeatureStore.getState().selectedId).toBe("1");
  });
});
