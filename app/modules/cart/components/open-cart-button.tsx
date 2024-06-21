"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useModalStore } from "../../modal/modal.store";

export const OpenCartButton = () => {
  const { toggleModal } = useModalStore((state) => state);
  return (
    <button className="flex items-center" onClick={toggleModal}>
      <ShoppingCartIcon className="h-6 text-muted-gray" />
    </button>
  );
};
