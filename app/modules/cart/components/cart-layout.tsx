"use client";
import React from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { CartFooter } from "./modal/cart-footer";
import { useCartStore } from "../store/cart.store";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const { toggleCart, openCart } = useCartStore((state) => state);
  return (
    <Transition
      show={openCart}
      enter="duration-100 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        onClose={toggleCart}
        className="fixed inset-0 z-[10000] overflow-hidden"
      >
        <div
          className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-end md:p-3">
          <DialogPanel className="w-full max-w-md h-full space-y-4 md:rounded-md border bg-white p-12 shadow-lg flex flex-col">
            {children}
            <CartFooter />
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export { CartLayout };
