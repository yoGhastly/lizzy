"use client";
import { Button } from "@/app/modules/common/components/button";
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
      <div className="w-full flex gap-5">
        <Button
          className={cn("w-full", {
            "cursor-not-allowed pointer-events-none opacity-50": loading,
          })}
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
        </Button>
      </div>
    </footer>
  );
};
