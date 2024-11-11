"use client";
import { useEffect } from "react";
import { useCartStore } from "../../cart/store/cart.store";

export const ProductQuantityLabel = ({ quantity }: { quantity: number }) => {
  const { setItemQuantity } = useCartStore((state) => state);

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity, setItemQuantity]);

  return <span className="text-black/50 ml-2 lowercase">x{quantity}</span>;
};
