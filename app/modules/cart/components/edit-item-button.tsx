"use client";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "../store/cart.store";
import { useEffect } from "react";
import { useModalStore } from "../../modal/modal.store";

export const EditItemButton = ({ productId }: { productId: number }) => {
  const { setItemId } = useCartStore((state) => state);
  const { setModalContentType } = useModalStore((state) => state);

  useEffect(() => {
    setItemId(productId);
  }, [productId]);

  const changeModalContentType = () => {
    try {
      setModalContentType("edit");
    } catch (error) {
      console.error("Error setting modalContentType:", error);
    }
  };

  return (
    <button
      title="Editar Producto"
      aria-label="Editar Producto"
      onClick={changeModalContentType}
    >
      <PencilIcon className="h-4 text-black/60" />
    </button>
  );
};
