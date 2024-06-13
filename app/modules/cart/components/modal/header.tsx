"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "../../store/cart.store";

export const ModalHeader = ({
  cartItemsLength,
}: {
  cartItemsLength: number;
}) => {
  const { toggleCart } = useCartStore((state) => state);
  function closeCart() {
    toggleCart();
  }

  return (
    <div className="w-full flex justify-between">
      <div className="w-full flex items-center gap-1 justify-center">
        <p>Cesta</p>
        <span className="text-xs">({cartItemsLength})</span>
      </div>
      <button onClick={closeCart}>
        <XMarkIcon className="h-6" />
      </button>
    </div>
  );
};
