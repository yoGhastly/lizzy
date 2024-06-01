"use client";
import type { ReactNode } from "react";

export const AttractiveText = ({
  element,
  active = true,
}: {
  element: ReactNode | string;
  active?: boolean;
}) => {
  return (
    <div className="relative">
      <span>{element}</span>
      {active && (
        <span className="bg-novi-500 rounded-full w-1.5 h-1.5 absolute top-[0.13rem] -right-[0.10rem]" />
      )}
    </div>
  );
};
