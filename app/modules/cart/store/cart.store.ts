import { create } from "zustand";

interface CartStore {
  items: string[];
  openCart: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  openCart: false,
  toggleCart: () => set((state) => ({ openCart: !state.openCart })),
}));
