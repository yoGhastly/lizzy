"use client";

import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

export const Button: React.FC<
  PropsWithChildren<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="btn bg-novi-400 text-white text-[16px] font-medium hover:bg-novi-400 hover:bg-opacity-90"
    >
      {children}
    </button>
  );
};
