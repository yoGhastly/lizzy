"use client";

import { cn } from "@/app/utils/cn";

export const CartLengthLabel = ({ length }: { length: number }) => {
  return <span className={cn({ hidden: length === 0 })}>({length})</span>;
};
