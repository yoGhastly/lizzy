"use client";

import { cn } from "@/app/utils/cn";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

export const Button: React.FC<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > & {
      secondary?: boolean;
    }
  >
> = ({ children, secondary, className, ...props }) => {
  const secondaryClasses =
    "bg-white border border-novi-400 text-novi-400 hover:bg-white hover:text-novi-400 hover:border-novi-400";

  return (
    <button
      {...props}
      className={cn(className, "btn", {
        "bg-novi-400 text-white text-[16px] font-medium hover:bg-novi-400 hover:bg-opacity-90":
          !secondary,
        [secondaryClasses]: secondary,
      })}
    >
      {children}
    </button>
  );
};
