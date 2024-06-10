"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Modal } from "./modal";
import { useCartStore } from "../store/cart.store";

export const OpenCart = () => {
  const { openCart, toggleCart } = useCartStore((state) => state);

  return (
    <Fragment>
      <button className="flex items-center" onClick={toggleCart}>
        <ShoppingCartIcon className="h-6 text-muted-gray" />
      </button>
      <Modal open={openCart} onClose={toggleCart} />
    </Fragment>
  );
};
