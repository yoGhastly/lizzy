"use client";
import { Fragment, useEffect, useState, type PropsWithChildren } from "react";
import { CartFooter } from "./cart-footer";
import { useCartStore } from "../../store/cart.store";
import { CartFooterInfo } from "./cart-footer-info";

interface Props {
  onCheckoutOrder: () => void;
  isLoading?: boolean;
}

export const ProductList: React.FC<PropsWithChildren<Props>> = ({
  children,
  onCheckoutOrder,
  isLoading,
}) => {
  const [showInfo, setShowInfo] = useState(true);
  const { cartLength } = useCartStore((state) => state);

  useEffect(() => {
    if (cartLength === 0) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
  }, [cartLength]);

  return (
    <Fragment>
      {children}
      {showInfo && (
        <CartFooter action={onCheckoutOrder} loading={isLoading}>
          <CartFooterInfo />
        </CartFooter>
      )}
    </Fragment>
  );
};
