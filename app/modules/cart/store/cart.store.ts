import { create } from "zustand";

interface CartStore {
  openCart: boolean;
  itemId: number;
  setItemId: (itemId: number) => void;
  itemQuantity: number;
  setItemQuantity: (itemQuantity: number) => void;
  toggleCart: () => void;
  modalContentType: "cart" | "edit";
  setModalContentType: (modalContentType: "cart" | "edit") => void;
}

export const useCartStore = create<CartStore>((set) => ({
  openCart: false,
  itemId: 0,
  setItemId: (itemId) => set({ itemId }),
  toggleCart: () => set((state) => ({ openCart: !state.openCart })),
  itemQuantity: 0,
  setItemQuantity: (itemQuantity) =>
    set((state) => ({
      itemQuantity: Math.max(0, itemQuantity), // Ensure itemQuantity is not negative
    })),
  modalContentType: "cart",
  setModalContentType: (modalContentType) => set({ modalContentType }),
}));
