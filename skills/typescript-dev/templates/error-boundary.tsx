// Template: Error Boundary
// Location: components/error/ErrorBoundary.tsx

"use client";

import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for catching React rendering errors
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <RiskyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log to error reporting service
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <DefaultErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

// Default fallback UI
interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

function DefaultErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <h2 className="mt-4 text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-center text-muted-foreground">
        {error?.message || "An unexpected error occurred"}
      </p>
      <Button onClick={onReset} className="mt-6">
        Try again
      </Button>
    </div>
  );
}

// Hook-based error boundary wrapper for functional components
// Use with React 19's use() or error handling patterns

/**
 * HOC to wrap components with error boundary
 *
 * @example
 * ```tsx
 * const SafeComponent = withErrorBoundary(RiskyComponent, {
 *   fallback: <div>Error occurred</div>,
 * });
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Next.js App Router error.tsx template
// Location: app/[route]/error.tsx

/**
 * Next.js Error Page Component
 *
 * @example
 * ```tsx
 * // app/dashboard/error.tsx
 * export { default } from "@/components/error/NextErrorPage";
 * ```
 */
export function NextErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <AlertTriangle className="h-16 w-16 text-destructive" />
      <h1 className="mt-6 text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-center text-muted-foreground">
        {error.message || "An unexpected error occurred"}
      </p>
      {error.digest && (
        <p className="mt-1 text-sm text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  );
}
