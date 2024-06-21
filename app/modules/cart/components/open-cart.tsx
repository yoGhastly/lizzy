import { Fragment } from "react";
import { Modal } from "./modal";
import { OpenCartButton } from "./open-cart-button";
import { MySqlCartsRepository } from "../infrastructure/CartsRepository";
import type { Cart } from "../domain/Cart";
import { cookies } from "next/headers";

const repository = new MySqlCartsRepository();

export const OpenCart = async () => {
  let cart: Cart | null = null;
  const c = cookies();
  const cartId = c.get("cart")?.value;

  if (cartId) {
    cart = await repository.getCartById(cartId);
  }

  return (
    <Fragment>
      <OpenCartButton />
      <Modal cart={cart} />
    </Fragment>
  );
};
