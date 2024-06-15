"use client";

import { Fragment } from "react";
import { CartFooter } from "./cart-footer";

export const ProductList = ({ children }: { children: React.ReactNode }) => (
  <Fragment>
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
          Total <span className="text-black/50 text-sm">(IVA incluido)</span>
        </p>
        <p className="text-sm">MXN 900.00</p>
      </div>
    </CartFooter>
  </Fragment>
);
