"use client";
import { cn } from "@/app/utils/cn";
import type { PropsWithChildren } from "react";

export const CartFooter: React.FC<
  PropsWithChildren<{
    buttonLabel?: string;
    action?: () => void;
    loading?: boolean;
  }>
> = ({ children, buttonLabel, action: onClick, loading }) => {
  return (
    <footer className="flex flex-col gap-6">
      <section className="flex flex-col items-center">{children}</section>
      <button
        className={cn(
          "btn bg-novi-400 text-white text-[16px] font-medium hover:bg-novi-400 hover:bg-opacity-90",
          { "cursor-not-allowed pointer-events-none opacity-50": loading },
        )}
        onClick={onClick}
      >
        {loading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        <p className="uppercase">
          {buttonLabel
            ? buttonLabel
            : loading
              ? "Actualizando"
              : "Tramitar pedido"}
        </p>
      </button>
    </footer>
  );
};
