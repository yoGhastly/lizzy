"use server";
import { cookies } from "next/headers";
import type { Cart, CartItem } from "./domain/Cart";
import { MySqlCartsRepository } from "./infrastructure/CartsRepository";

const cartRepository = new MySqlCartsRepository();

export async function deleteItem(item: Pick<CartItem, "product_id">) {
  "use server";
  const cartId = cookies().get("cart")?.value;
  if (!cartId) {
    throw new Error("Cart not found");
  }
  await cartRepository.deleteItem(Number(cartId), item);
}

export async function editItem(
  item: Pick<CartItem, "product_id" | "quantity">,
) {
  "use server";
  const cartId = cookies().get("cart")?.value;
  if (!cartId) {
    throw new Error("Cart not found");
  }
  await cartRepository.editItem(Number(cartId), item);
}
