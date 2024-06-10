"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { ModalHeader } from "./modal/header";
import { ModalDescription } from "./modal/description";
import { CartFooter } from "./modal/cart-footer";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ open = false, onClose }: Props) => {
  return (
    <>
      <Transition
        show={open}
        enter="duration-100 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          onClose={onClose}
          className="fixed inset-0 z-[10000] overflow-hidden"
        >
          <div
            className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-end md:p-3">
            <DialogPanel className="w-full max-w-md h-full space-y-4 md:rounded-md border bg-white p-12 shadow-lg flex flex-col">
              <DialogTitle className="font-bold">
                <ModalHeader closeCart={onClose} />
              </DialogTitle>
              <div className="divider" />
              <Description className="h-full overflow-y-auto p-3">
                <ModalDescription />
              </Description>
              <CartFooter />
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
