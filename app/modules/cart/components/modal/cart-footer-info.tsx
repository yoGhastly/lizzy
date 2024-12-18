"use client";
import { Fragment, useEffect, useState } from "react";
import { useCartStore } from "../../store/cart.store";

export const CartFooterInfo = () => {
  const { subtotal } = useCartStore((state) => state);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(subtotal);

    return () => {
      setTotal(0);
    };
  }, [subtotal]);

  return (
    <Fragment>
      <div className="font-medium flex items-center justify-between w-full">
        <p>Subtotal</p>
        <p className="text-sm">MXN {subtotal / 100}</p>
      </div>
      <div className="font-medium flex justify-between items-center w-full">
        <p>Gastos de envio</p>
        <p className="text-black/50 text-sm">Calculado en checkout</p>
      </div>
      <div className="font-medium flex justify-between items-center w-full">
        <p>
          Total <span className="text-black/50 text-sm">(IVA incluido)</span>
        </p>
        <p className="text-sm">MXN {total / 100}</p>
      </div>
    </Fragment>
  );
};
