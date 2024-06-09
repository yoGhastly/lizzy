"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const ModalHeader = ({ closeCart }: { closeCart: () => void }) => {
  return (
    <div className="w-full flex justify-between">
      <div className="w-full flex items-center gap-1 justify-center">
        <p>Cesta</p>
        <span className="text-xs">(3)</span>
      </div>
      <button onClick={closeCart}>
        <XMarkIcon className="h-6" />
      </button>
    </div>
  );
};
