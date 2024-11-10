import { create } from "zustand";

export type OrderByFilters = "Precio ascendente" | "Precio descendente";

interface FiltersStore {
  orderBy: OrderByFilters;
  setOrderBy: (orderBy: OrderByFilters) => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  orderBy: "Precio ascendente", // Set a default value that matches the type
  setOrderBy: (orderBy: OrderByFilters) => set({ orderBy }),
}));
