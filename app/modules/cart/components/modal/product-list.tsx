"use client";
import { Fragment, type PropsWithChildren } from "react";
import { CartFooter } from "./cart-footer";
import { useCartStore } from "../../store/cart.store";

export const ProductList: React.FC<PropsWithChildren> = ({ children }) => {
  const { itemQuantity } = useCartStore((state) => state);
  return (
    <Fragment>
      {children}
      {itemQuantity > 0 && (
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
              <span className="text-black/50 text-sm">(IVA incluido)</span>
            </p>
            <p className="text-sm">MXN 900.00</p>
          </div>
        </CartFooter>
      )}
    </Fragment>
  );
};
