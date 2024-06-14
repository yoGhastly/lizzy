"use client";
import type { PropsWithChildren } from "react";

export const CartFooter: React.FC<
  PropsWithChildren<{ buttonLabel?: string; action?: () => void }>
> = ({ children, buttonLabel, action: onClick }) => {
  return (
    <footer className="flex flex-col gap-6">
      <section className="flex flex-col items-center">{children}</section>
      <button
        className="btn bg-novi-400 text-white text-[16px] font-medium hover:bg-novi-400 hover:bg-opacity-90"
        onClick={onClick}
      >
        <p className="uppercase">{buttonLabel ?? "Tramitar pedido"}</p>
      </button>
    </footer>
  );
};
