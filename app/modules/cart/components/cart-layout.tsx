"use client";
import React, { useState, useEffect, useTransition } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { useCartStore } from "../store/cart.store";
import { editItem } from "../actions";
import { EditItem } from "./modal/edit-item";
import { ProductList } from "./modal/product-list";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    toggleCart,
    openCart,
    modalContentType,
    itemQuantity,
    itemId,
    setModalContentType,
  } = useCartStore((state) => state);
  const [contentType, setContent] = useState<"cart" | "edit" | null>(null);
  const [quantity, setQuantity] = useState<number>(itemQuantity);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setContent(modalContentType);
    setQuantity(itemQuantity);
  }, [modalContentType]);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 0 && setQuantity(quantity - 1);

  const saveChanges = () => {
    if (!itemId) return;
    startTransition(async () => {
      try {
        await editItem({ product_id: itemId, quantity });
        setModalContentType("cart");
      } catch (error) {
        console.error("Could not update item");
      }
    });
  };

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
            {contentType === "cart" ? (
              <ProductList>{children}</ProductList>
            ) : contentType === "edit" ? (
              <EditItem
                quantity={quantity}
                loading={isPending}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                saveChanges={saveChanges}
              />
            ) : null}
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export { CartLayout };
