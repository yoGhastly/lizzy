import { create } from "zustand";
import { categorySchema } from "../schema/schemas";

export interface CatalogueStore {
  category: string;
  setCategory: (newCategory: string) => void;
  isCatalogueRoute: boolean;
  setIsCatalogueRoute: (isCatalogueRoute: boolean) => void;
}

export const useCatalogueStore = create<CatalogueStore>((set) => ({
  category: "all",
  isCatalogueRoute: false,
  setCategory: (newCategory) => {
    const result = categorySchema.safeParse(newCategory);
    if (!result.success) {
      console.error(result.error.errors);
      set({ category: "all" }); // Default to 'all' if validation fails
      return;
    }
    set({ category: newCategory.toLowerCase() });
  },
  setIsCatalogueRoute: (isCatalogueRoute) => set({ isCatalogueRoute }),
}));
