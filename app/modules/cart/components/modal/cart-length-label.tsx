"use client";
import { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";
import { useCartStore } from "../../store/cart.store";

export const CartLengthLabel = ({ length }: { length: number }) => {
  const { setCartLength } = useCartStore((state) => state);
  const [cartLength] = useState(() => length);

  useEffect(() => {
    setCartLength(length);
  }, [length]);

  return <span className={cn({ hidden: length === 0 })}>({cartLength})</span>;
};
