import { create } from "zustand";

interface CartStore {
  items: string[];
  addItem: (item: string) => void;
  openCart: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  openCart: false,
  toggleCart: () => set((state) => ({ openCart: !state.openCart })),
}));
