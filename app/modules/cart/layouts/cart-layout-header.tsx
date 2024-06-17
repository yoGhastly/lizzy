"use client";
import React from "react";
import { DialogTitle } from "@headlessui/react";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "../store/cart.store";
import { cn } from "@/app/utils/cn";

function GoBackIcon() {
  const { setModalContentType, modalContentType, toggleCart } = useCartStore(
    (state) => state,
  );
  const goBack = () => {
    if (modalContentType === "cart") return;
    if (modalContentType === "filter") toggleCart();
    setModalContentType("cart");
  };

  return (
    <button onClick={goBack}>
      <ArrowLeftIcon className="h-5" />
    </button>
  );
}

function CloseIcon() {
  const { toggleCart } = useCartStore((state) => state);
  const close = () => {
    toggleCart();
  };

  return (
    <button onClick={close}>
      <XMarkIcon className="h-5" />
    </button>
  );
}

const CartLayoutHeader = ({
  children,
  flexReverse = false,
}: {
  children: React.ReactNode;
  flexReverse?: boolean;
}) => {
  const { modalContentType } = useCartStore((state) => state);

  return (
    <DialogTitle
      className={cn("flex items-center justify-between w-full", {
        "flex-wrap-reverse": flexReverse,
      })}
    >
      {children}
      {modalContentType === "cart" ? <CloseIcon /> : <GoBackIcon />}
    </DialogTitle>
  );
};

export { CartLayoutHeader };
