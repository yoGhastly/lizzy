"use client";
import { Fragment } from "react";
import { useCartStore } from "../../store/cart.store";

export const CartFooterInfo = () => {
  const { subtotal } = useCartStore((state) => state);
  return (
    <Fragment>
      <div className="font-medium flex items-center justify-between w-full">
        <p>Subtotal</p>
        <p className="text-sm">MXN {subtotal}</p>
      </div>
      <div className="font-medium flex justify-between items-center w-full">
        <p>Gastos de envio</p>
        <p className="text-black/50 text-sm">Calculado en checkout</p>
      </div>
      <div className="font-medium flex justify-between items-center w-full">
        <p>
          Total <span className="text-black/50 text-sm">(IVA incluido)</span>
        </p>
        <p className="text-sm">MXN 900.00</p>
      </div>
    </Fragment>
  );
};
