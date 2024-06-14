"use client";
import React from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { CartFooter } from "./modal/cart-footer";
import { useCartStore } from "../store/cart.store";
import { EditModeContent } from "./modal/edit-mode-content";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const { toggleCart, openCart, modalContentType } = useCartStore(
    (state) => state,
  );
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
          {modalContentType === "cart" ? (
            <DialogPanel className="w-full max-w-md h-full space-y-4 md:rounded-md border bg-white p-12 shadow-lg flex flex-col">
              {children}
              <CartFooter>
                <div className="font-medium flex items-center justify-between w-full">
                  <p>Subtotal</p>
                  <p className="text-sm">$299.00</p>
                </div>

                <div className="font-medium flex justify-between items-center w-full">
                  <p>Gastos de envio</p>
                  <p className="text-black/50 text-sm">Calculado en checkout</p>
                </div>

                <div className="font-medium flex justify-between items-center w-full">
                  <p>
                    Total{" "}
                    <span className="text-black/50 text-sm">
                      (IVA incluido)
                    </span>
                  </p>
                  <p className="text-sm">MXN 900.00</p>
                </div>
              </CartFooter>
            </DialogPanel>
          ) : modalContentType === "edit" ? (
            <DialogPanel className="w-full max-w-md h-full space-y-4 md:rounded-md border bg-white p-12 shadow-lg flex flex-col">
              <EditModeContent />
            </DialogPanel>
          ) : null}
        </div>
      </Dialog>
    </Transition>
  );
};

export { CartLayout };
