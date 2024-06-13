"use client";
import React from "react";
import { DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "../store/cart.store";

const CartLayoutHeader = ({ children }: { children: React.ReactNode }) => {
  const { toggleCart } = useCartStore((state) => state);
  return (
    <DialogTitle className="flex items-center justify-between">
      {children}
      <button onClick={toggleCart}>
        <XMarkIcon className="h-6 w-6 text-black/60" />
      </button>
    </DialogTitle>
  );
};

export { CartLayoutHeader };
