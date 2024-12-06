"use client";
import type { PropsWithChildren } from "react";

export const ItemsContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="grid grid-cols-4 gap-5 w-full">{children}</div>;
};
