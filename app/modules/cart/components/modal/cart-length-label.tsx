"use client";
import { useEffect } from "react";
import { cn } from "@/app/utils/cn";
import { useCartStore } from "../../store/cart.store";

export const CartLengthLabel = ({ length }: { length: number }) => {
  const { setCartLength } = useCartStore((state) => state);

  useEffect(() => {
    setCartLength(length);
  }, [length, setCartLength]);

  return <span className={cn({ hidden: length === 0 })}>({length})</span>;
};
