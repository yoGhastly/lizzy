"use client";
import { useEffect } from "react";
import { useCartStore } from "../../cart/store/cart.store";

export const ProductQuantityLabel = ({ quantity }: { quantity: number }) => {
  const { setItemQuantity } = useCartStore((state) => state);
  if (quantity === 0) {
    return null;
  }

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity]);

  return <span className="text-black/50 ml-2">x{quantity}</span>;
};
