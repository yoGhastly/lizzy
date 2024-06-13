import { create } from "zustand";
import { Product } from "../../products/domain/Product";

interface CartStore {
  items: Product[];
  setItems: (items: Product[]) => void;
  openCart: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  openCart: false,
  toggleCart: () => set((state) => ({ openCart: !state.openCart })),
}));
