"use client";
import React from "react";
import { DialogTitle } from "@headlessui/react";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { cn } from "@/app/utils/cn";
import { useModalStore } from "../../modal/modal.store";

function GoBackIcon() {
  const { setModalContentType, modalContentType, toggleModal } = useModalStore(
    (state) => state,
  );
  const goBack = () => {
    if (modalContentType === "cart") return;
    if (modalContentType === "filter") toggleModal();
    setModalContentType("cart");
  };

  return (
    <button onClick={goBack}>
      <ArrowLeftIcon className="h-5" />
    </button>
  );
}

function CloseIcon() {
  const { toggleModal } = useModalStore((state) => state);
  const close = () => {
    toggleModal();
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
  const { modalContentType } = useModalStore((state) => state);

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
