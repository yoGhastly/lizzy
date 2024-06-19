"use client";
import { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";
import { useCartStore } from "../../store/cart.store";

export const CartLengthLabel = ({ length }: { length: number }) => {
  const [cartLength, setCartLength] = useState(0);
  const { setItemQuantity } = useCartStore((state) => state);

  useEffect(() => {
    setCartLength(length);

    if (length === 0) {
      setItemQuantity(0);
    }
  }, [length]);

  return <span className={cn({ hidden: length === 0 })}>({cartLength})</span>;
};
