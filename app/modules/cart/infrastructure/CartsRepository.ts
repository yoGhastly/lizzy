import { formatDate } from "@/app/utils/formatDate";
import { Cart, CartItem, CartRepository } from "../domain/Cart";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export class MySqlCartsRepository implements CartRepository {
  async create(cart: Cart): Promise<number> {
    const { user_id, session_id, created_at, updated_at } = cart;
    const formattedCreatedAt = formatDate(created_at);
    const formattedUpdatedAt = formatDate(updated_at);

    const result = await sql`
      INSERT INTO carts (user_id, session_id, created_at, updated_at)
      VALUES (${user_id}, ${session_id}, ${formattedCreatedAt}, ${formattedUpdatedAt})
      RETURNING id
    `;
    cart.id = result.rows[0].id;

    return cart.id;
  }

  async getCartByUserId(userId: number): Promise<Cart | null> {
    const cartResult = await sql`
      SELECT * FROM carts WHERE user_id = ${userId}
    `;

    if (cartResult.rows.length === 0) {
      return null;
    }

    const cartRow = cartResult.rows[0];
    const itemsResult = await sql`
      SELECT * FROM cart_items WHERE cart_id = ${cartRow.id}
    `;

    const items: CartItem[] = itemsResult.rows.map((row: any) => ({
      product_id: row.product_id,
      variant_id: row.variant_id,
      quantity: row.quantity,
      price: row.price,
    }));

    const cart: Cart = {
      id: cartRow.id,
      user_id: cartRow.user_id,
      session_id: cartRow.session_id,
      created_at: cartRow.created_at,
      updated_at: cartRow.updated_at,
      items: items,
    };

    return cart;
  }

  async addItemToCart(cartId: number, item: CartItem): Promise<void> {
    const { product_id, quantity, price } = item;

    const existingItemResult = await sql`
      SELECT * FROM cart_items
      WHERE cart_id = ${cartId} AND product_id = ${product_id}
    `;

    if (existingItemResult.rows.length > 0) {
      const existingItem = existingItemResult.rows[0];
      await sql`
        UPDATE cart_items
        SET quantity = ${existingItem.quantity + quantity}
        WHERE id = ${existingItem.id}
      `;
    } else {
      await sql`
        INSERT INTO cart_items (cart_id, product_id, quantity, price)
        VALUES (${cartId}, ${product_id}, ${quantity}, ${price})
      `;
    }
  }

  async getCartById(id: string): Promise<Cart | null> {
    if (!id) {
      return null;
    }

    const cartResult = await sql`
      SELECT * FROM carts WHERE id = ${id}
    `;

    if (cartResult.rows.length === 0) {
      return null;
    }

    const cartRow = cartResult.rows[0];
    const itemsResult = await sql`
      SELECT * FROM cart_items WHERE cart_id = ${cartRow.id}
    `;

    const items: CartItem[] = itemsResult.rows.map((row: any) => ({
      product_id: row.product_id,
      quantity: row.quantity,
      price: row.price,
    }));

    const cart: Cart = {
      id: cartRow.id,
      user_id: cartRow.user_id,
      session_id: cartRow.session_id,
      created_at: cartRow.created_at,
      updated_at: cartRow.updated_at,
      items: items,
    };

    return cart;
  }

  async addItemToCartForUser(userId: number, item: CartItem): Promise<void> {
    let cart = await this.getCartByUserId(userId);

    if (!cart) {
      const newCart: Cart = {
        id: 0, // This will be set in the create method
        user_id: userId,
        session_id: "", // Set session ID as needed
        created_at: new Date(),
        updated_at: new Date(),
        items: [],
      };

      const cartId = await this.create(newCart);
      cart = await this.getCartById(cartId.toString());
    }

    if (cart) {
      await this.addItemToCart(cart.id, item);
    }
  }
  async deleteItem(
    cartId: number,
    item: Pick<CartItem, "product_id">,
  ): Promise<void> {
    await sql`
      DELETE FROM cart_items
      WHERE cart_id = ${cartId} AND product_id = ${item.product_id}
    `;

    // If the cart is empty, delete the cart
    const itemsResult = await sql`
      SELECT * FROM cart_items WHERE cart_id = ${cartId}
    `;
    if (itemsResult.rows.length === 0) {
      await sql`
        DELETE FROM carts WHERE id = ${cartId}
      `;
    }

    // NOTE: This mutates data so modal updates UI to reflect the change in cart
    revalidatePath("/");
  }
  async editItem(
    cartId: number,
    item: Pick<CartItem, "quantity" | "product_id">,
  ): Promise<void> {
    if (!cartId) return;
    // edit item quantity in cart
    await sql`
      UPDATE cart_items
      SET quantity = ${item.quantity}
      WHERE cart_id = ${cartId} AND product_id = ${item.product_id}
    `;
    revalidatePath("/");
  }
}
