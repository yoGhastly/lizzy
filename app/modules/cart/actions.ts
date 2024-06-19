"use server";
import { cookies } from "next/headers";
import type { Product } from "../products/domain/Product";
import type { Cart, CartItem } from "./domain/Cart";
import { MySqlCartsRepository } from "./infrastructure/CartsRepository";
import { revalidatePath } from "next/cache";

const cartRepository = new MySqlCartsRepository();

export async function addToCart(
  userId: number,
  product: Product,
  quantity: number,
): Promise<void> {
  let cart = await cartRepository.getCartByUserId(userId);
  if (!cart) {
    const newCart: Cart = {
      id: 0, // This will be set by the create method
      user_id: userId,
      session_id: "", // Generate or handle session_id as required
      created_at: new Date(),
      updated_at: new Date(),
      items: [],
    };
    await cartRepository.create(newCart);
    cart = newCart;
  }

  revalidatePath("/");
}

export async function deleteItem(
  item: Pick<CartItem, "product_id" | "variant_id">,
) {
  const cartId = cookies().get("cart")?.value;
  if (!cartId) {
    throw new Error("Cart not found");
  }
  await cartRepository.deleteItem(Number(cartId), item);
}

export async function editItem(
  item: Pick<CartItem, "product_id" | "quantity">,
) {
  const cartId = cookies().get("cart")?.value;
  if (!cartId) {
    throw new Error("Cart not found");
  }
  await cartRepository.editItem(Number(cartId), item);
}
