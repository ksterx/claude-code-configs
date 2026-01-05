// Template: Custom Hook with TanStack Query
// Location: lib/hooks/use-[resource].ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type { Resource, CreateResourceInput } from "@/lib/types/resource";

// Query key factory for consistency
const resourceKeys = {
  all: ["resources"] as const,
  lists: () => [...resourceKeys.all, "list"] as const,
  list: (filters: string) => [...resourceKeys.lists(), { filters }] as const,
  details: () => [...resourceKeys.all, "detail"] as const,
  detail: (id: string) => [...resourceKeys.details(), id] as const,
};

/**
 * Hook for fetching resources list
 *
 * @example
 * ```tsx
 * const { resources, isLoading, error } = useResources();
 * ```
 */
export function useResources() {
  const query = useQuery({
    queryKey: resourceKeys.lists(),
    queryFn: () => apiClient.get<Resource[]>("/api/resources"),
  });

  return {
    resources: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  } as const;
}

/**
 * Hook for fetching single resource
 *
 * @param id - Resource ID
 */
export function useResource(id: string) {
  const query = useQuery({
    queryKey: resourceKeys.detail(id),
    queryFn: () => apiClient.get<Resource>(`/api/resources/${id}`),
    enabled: !!id,
  });

  return {
    resource: query.data,
    isLoading: query.isLoading,
    error: query.error,
  } as const;
}

/**
 * Hook for creating resource
 *
 * @example
 * ```tsx
 * const { createResource, isCreating } = useCreateResource();
 * await createResource({ name: "New Resource" });
 * ```
 */
export function useCreateResource() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateResourceInput) =>
      apiClient.post<Resource>("/api/resources", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.lists() });
    },
  });

  return {
    createResource: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  } as const;
}

/**
 * Hook for updating resource
 */
export function useUpdateResource() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resource> }) =>
      apiClient.patch<Resource>(`/api/resources/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: resourceKeys.lists() });
    },
  });

  return {
    updateResource: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
  } as const;
}

/**
 * Hook for deleting resource
 */
export function useDeleteResource() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/api/resources/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.lists() });
    },
  });

  return {
    deleteResource: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error,
  } as const;
}
