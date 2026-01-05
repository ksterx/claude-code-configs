// Template: Feature Component
// Location: components/features/[feature]/[ComponentName].tsx

"use client";

import { cn } from "@/lib/utils/cn";

// Props interface - always define explicitly
interface FeatureComponentProps {
  // Required props
  data: DataType;
  // Optional callbacks
  onAction?: (id: string) => void;
  // Standard optional props
  className?: string;
}

/**
 * FeatureComponent - Brief description of purpose
 *
 * @example
 * ```tsx
 * <FeatureComponent data={item} onAction={handleAction} />
 * ```
 */
export function FeatureComponent({
  data,
  onAction,
  className,
}: FeatureComponentProps) {
  // Event handlers
  const handleClick = () => {
    onAction?.(data.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onAction?.(data.id);
    }
  };

  return (
    <div
      role="article"
      aria-label={`Component for ${data.name}`}
      tabIndex={onAction ? 0 : undefined}
      className={cn(
        "rounded-lg border bg-card p-4",
        onAction && "cursor-pointer hover:bg-accent",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Content */}
      <h3 className="font-medium">{data.name}</h3>
      <p className="text-sm text-muted-foreground">{data.description}</p>
    </div>
  );
}

// Optional: Skeleton for loading state
export function FeatureComponentSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 animate-pulse">
      <div className="h-5 w-32 bg-muted rounded" />
      <div className="h-4 w-48 bg-muted rounded mt-2" />
    </div>
  );
}
