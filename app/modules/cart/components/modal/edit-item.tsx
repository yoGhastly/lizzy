"use client";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { CartLayoutBody } from "../../layouts/cart-layout-body";
import { CartLayoutHeader } from "../../layouts/cart-layout-header";
import { CartFooter } from "./cart-footer";

export const EditItem = ({
  quantity,
  loading,
  handleIncrement,
  handleDecrement,
  saveChanges,
}: {
  quantity: number;
  loading: boolean;
  handleIncrement: () => void;
  handleDecrement: () => void;
  saveChanges: () => void;
}) => {
  return (
    <div className="flex flex-col w-full">
      <CartLayoutHeader flexReverse>
        <p className="text-center font-bold w-full">Detalles del artículo</p>
      </CartLayoutHeader>
      <div className="divider" />
      <CartLayoutBody>
        <span className="font-medium text-lg">Unidades: {quantity}</span>
        <div className="flex bg-white gap-4 border w-fit mt-4 rounded-md items-center">
          <button
            className="text-black/60 btn bg-transparent hover:bg-transparent border-r"
            onClick={handleDecrement}
          >
            <MinusIcon className="h-4" />
          </button>
          <p className="text-black/60 bg-background mx-2">{quantity}</p>
          <button
            className="text-black/60 bg-transparent hover:bg-transparent border-l btn bg-none"
            onClick={handleIncrement}
          >
            <PlusIcon className="h-4" />
          </button>
        </div>
      </CartLayoutBody>
      <CartFooter
        buttonLabel="Actualizar"
        action={saveChanges}
        loading={loading}
      />
    </div>
  );
};
