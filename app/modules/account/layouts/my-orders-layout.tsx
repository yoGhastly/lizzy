"use client";
import type { PropsWithChildren } from "react";

export const MyOrdersLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full max-w-5xl h-full flex flex-col md:flex-row gap-12">
      {children}
    </div>
  );
};
