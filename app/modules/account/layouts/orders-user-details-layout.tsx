"use client";
import type { PropsWithChildren } from "react";

export const OrdersUserDetailsLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="bg-[#fafafa] rounded-xl flex flex-col md:flex-row justify-center items-center w-full mx-auto px-3 h-[400px] gap-8 md:gap-0">
      {children}
    </div>
  );
};
