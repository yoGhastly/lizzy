import { create } from "zustand";

interface CartStore {
  itemId: string;
  setItemId: (itemId: string) => void;
  itemQuantity: number;
  setItemQuantity: (itemQuantity: number) => void;
  subtotal: number;
  cartLength: number;
  setCartLength: (cartLength: number) => void;
  setSubtotal: (subtotal: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  itemId: "",
  setItemId: (itemId) => set({ itemId }),
  itemQuantity: 0,
  setItemQuantity: (itemQuantity) =>
    set((_state) => ({
      itemQuantity: Math.max(0, itemQuantity),
    })),
  subtotal: 0,
  setSubtotal: (subtotal) => set({ subtotal }),
  cartLength: 0,
  setCartLength: (cartLength) => set({ cartLength }),
}));
