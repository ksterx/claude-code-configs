// Template: Zustand Store
// Location: lib/stores/[feature]-store.ts

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// State interface
interface FeatureState {
  // Data
  items: Item[];
  selectedId: string | null;
  filters: FilterOptions;

  // UI state
  isOpen: boolean;
  view: "list" | "grid";
}

// Actions interface (separate for clarity)
interface FeatureActions {
  // Data actions
  setItems: (items: Item[]) => void;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;

  // Selection
  selectItem: (id: string | null) => void;

  // Filters
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;

  // UI actions
  toggleOpen: () => void;
  setView: (view: "list" | "grid") => void;

  // Reset
  reset: () => void;
}

// Combined store type
type FeatureStore = FeatureState & FeatureActions;

// Initial state (for reset)
const initialState: FeatureState = {
  items: [],
  selectedId: null,
  filters: { search: "", status: "all" },
  isOpen: false,
  view: "list",
};

/**
 * Feature store with persistence and devtools
 *
 * @example
 * ```tsx
 * const { items, addItem, selectItem } = useFeatureStore();
 * ```
 */
export const useFeatureStore = create<FeatureStore>()(
  devtools(
    persist(
      immer((set) => ({
        // Initial state
        ...initialState,

        // Data actions
        setItems: (items) =>
          set((state) => {
            state.items = items;
          }),

        addItem: (item) =>
          set((state) => {
            state.items.push(item);
          }),

        removeItem: (id) =>
          set((state) => {
            state.items = state.items.filter((item) => item.id !== id);
            if (state.selectedId === id) {
              state.selectedId = null;
            }
          }),

        updateItem: (id, updates) =>
          set((state) => {
            const index = state.items.findIndex((item) => item.id === id);
            if (index !== -1) {
              state.items[index] = { ...state.items[index], ...updates };
            }
          }),

        // Selection
        selectItem: (id) =>
          set((state) => {
            state.selectedId = id;
          }),

        // Filters
        setFilters: (filters) =>
          set((state) => {
            state.filters = { ...state.filters, ...filters };
          }),

        resetFilters: () =>
          set((state) => {
            state.filters = initialState.filters;
          }),

        // UI actions
        toggleOpen: () =>
          set((state) => {
            state.isOpen = !state.isOpen;
          }),

        setView: (view) =>
          set((state) => {
            state.view = view;
          }),

        // Reset
        reset: () => set(initialState),
      })),
      {
        name: "feature-storage", // localStorage key
        partialize: (state) => ({
          // Only persist specific fields
          view: state.view,
          filters: state.filters,
        }),
      }
    ),
    { name: "FeatureStore" } // devtools name
  )
);

// Selectors (for optimized re-renders)
export const useSelectedItem = () =>
  useFeatureStore((state) =>
    state.items.find((item) => item.id === state.selectedId)
  );

export const useFilteredItems = () =>
  useFeatureStore((state) => {
    const { items, filters } = state;
    return items.filter((item) => {
      if (filters.search && !item.name.includes(filters.search)) return false;
      if (filters.status !== "all" && item.status !== filters.status)
        return false;
      return true;
    });
  });

// Types (define in lib/types/ for real usage)
interface Item {
  id: string;
  name: string;
  status: string;
}

interface FilterOptions {
  search: string;
  status: string;
}
