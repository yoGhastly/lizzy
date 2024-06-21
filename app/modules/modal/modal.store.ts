import { create } from "zustand";

export type ModalContentType = "cart" | "edit" | "filter" | "favorites" | null;

interface ModalStore {
  modalContentType: ModalContentType;
  setModalContentType: (modalContentType: ModalContentType) => void;
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalContentType: "cart",
  setModalContentType: (modalContentType) => set({ modalContentType }),
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
