"use client";
import { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";

export const CartLengthLabel = ({ length }: { length: number }) => {
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    setCartLength(length);
  }, [length]);

  return <span className={cn({ hidden: length === 0 })}>({cartLength})</span>;
};
