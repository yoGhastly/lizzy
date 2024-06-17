import { create } from "zustand";

export type ModalContentType = "cart" | "edit" | "filter" | null;

interface CartStore {
  openCart: boolean;
  itemId: number;
  setItemId: (itemId: number) => void;
  itemQuantity: number;
  setItemQuantity: (itemQuantity: number) => void;
  toggleCart: () => void;
  modalContentType: ModalContentType;
  setModalContentType: (modalContentType: ModalContentType) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  openCart: false,
  itemId: 0,
  setItemId: (itemId) => set({ itemId }),
  toggleCart: () => set((state) => ({ openCart: !state.openCart })),
  itemQuantity: 0,
  setItemQuantity: (itemQuantity) =>
    set((_state) => ({
      itemQuantity: Math.max(0, itemQuantity),
    })),
  modalContentType: "cart",
  setModalContentType: (modalContentType) => set({ modalContentType }),
}));
