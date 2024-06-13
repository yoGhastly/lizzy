"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "../store/cart.store";

export const OpenCartButton = () => {
  const { toggleCart } = useCartStore((state) => state);
  return (
    <button className="flex items-center" onClick={toggleCart}>
      <ShoppingCartIcon className="h-6 text-muted-gray" />
    </button>
  );
};
