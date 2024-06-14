"use client";
import { useEffect } from "react";
import { useCartStore } from "../../cart/store/cart.store";

export const ProductQuantityLabel = ({ quantity }: { quantity: number }) => {
  const { setItemQuantity } = useCartStore((state) => state);

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity]);

  if (quantity === 0) {
    return null;
  }

  return <span className="text-black/50 ml-2">x{quantity}</span>;
};
