"use client";
import { Fragment, useEffect, useState, type PropsWithChildren } from "react";
import { CartFooter } from "./cart-footer";
import { useCartStore } from "../../store/cart.store";
import { CartFooterInfo } from "./cart-footer-info";

export const ProductList: React.FC<PropsWithChildren> = ({ children }) => {
  const { itemQuantity } = useCartStore((state) => state);
  const [hideInfo, setHideInfo] = useState(false);

  useEffect(() => {
    if (itemQuantity === 0) {
      setHideInfo(true);
    } else {
      setHideInfo(false);
    }
  }, [itemQuantity]);

  return (
    <Fragment>
      {children}
      {!hideInfo && (
        <CartFooter>
          <CartFooterInfo />
        </CartFooter>
      )}
    </Fragment>
  );
};
