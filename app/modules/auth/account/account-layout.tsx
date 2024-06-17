"use client";
import type { PropsWithChildren } from "react";

export const AccountLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-full mx-auto justify-center items-center mt-14 gap-12 px-3">
      {children}
    </div>
  );
};
