import type {
  Cart,
  CartItem,
  CartRepository,
  NewCartItem,
} from "../domain/Cart";
import { sql } from "@vercel/postgres";
import { formatDate } from "@/app/utils/formatDate";
import { revalidatePath } from "next/cache";

export class MySqlCartsRepository implements CartRepository {
  // Retrieve cart by session ID
  async getCartBySessionId(sessionId: string): Promise<Cart | null> {
    const { rows } =
      await sql`SELECT * FROM carts WHERE session_id = ${sessionId} LIMIT 1`;
    if (!rows.length) return null;

    const cart = rows[0];
    const itemsResult =
      await sql`SELECT * FROM cart_items WHERE cart_id = ${cart.id}`;
    const items: CartItem[] = itemsResult.rows.map((row) => ({
      id: row.id,
      cart_id: row.cart_id,
      product_id: row.product_id,
      variant_id: row.variant_id,
      quantity: row.quantity,
      price: row.price,
    }));

    revalidatePath("/");

    return {
      id: cart.id,
      user_id: cart.user_id,
      session_id: cart.session_id,
      created_at: cart.created_at,
      updated_at: cart.updated_at,
      items,
    };
  }

  // Retrieve cart by user ID
  async getCartByUserId(userId: string): Promise<Cart | null> {
    const { rows } =
      await sql`SELECT * FROM carts WHERE user_id = ${userId} LIMIT 1`;
    if (!rows.length) return null;

    const cart = rows[0];
    const itemsResult =
      await sql`SELECT * FROM cart_items WHERE cart_id = ${cart.id}`;
    const items: CartItem[] = itemsResult.rows.map((row) => ({
      id: row.id,
      cart_id: row.cart_id,
      product_id: row.product_id,
      variant_id: row.variant_id,
      quantity: row.quantity,
      price: row.price,
    }));

    return {
      id: cart.id,
      user_id: cart.user_id,
      session_id: cart.session_id,
      created_at: cart.created_at,
      updated_at: cart.updated_at,
      items,
    };
  }

  // Add item to an existing cart by cart ID
  async addItemToCart(cartId: number, item: NewCartItem): Promise<void> {
    await sql`
      INSERT INTO cart_items (cart_id, product_id, variant_id, quantity, price)
      VALUES (${cartId}, ${item.product_id}, ${item.variant_id}, ${item.quantity}, ${item.price})
    `;
    await this.updateCartTimestamp(cartId);
  }

  // Add item to a cart by user ID or session ID
  async addItemToCartForSessionOrUser(
    userId: string | null,
    sessionId: string,
    item: NewCartItem,
  ): Promise<void> {
    let cart = await this.getCartBySessionId(sessionId);

    if (!cart) {
      // Create a new cart if none exists
      cart = await this.createCart(userId, sessionId);
    }

    await this.addItemToCart(cart.id, item);
  }

  // Create a new cart for a user or session
  async createCart(userId: string | null, sessionId: string): Promise<Cart> {
    const createdAt = formatDate(new Date());
    const { rows } = await sql`
      INSERT INTO carts (session_id, created_at, updated_at)
      VALUES (${sessionId}, ${createdAt}, ${createdAt})
      RETURNING id, session_id, created_at, updated_at
    `;
    const cart = rows[0];
    return {
      id: cart.id,
      user_id: userId, // This will be null if userId is not provided
      session_id: cart.session_id,
      created_at: cart.created_at,
      updated_at: cart.updated_at,
      items: [],
    };
  }

  // Get a cart item by product and variant ID
  async getCartItemByProductAndVariant(
    cartId: number,
    productId: string,
    variantId: string | null,
  ): Promise<CartItem | null> {
    const { rows } = await sql`
      SELECT * FROM cart_items
      WHERE cart_id = ${cartId} AND product_id = ${productId} AND variant_id = ${variantId}
      LIMIT 1
    `;
    if (!rows.length) return null;

    const row = rows[0];
    return {
      id: row.id,
      product_id: row.product_id,
      variant_id: row.variant_id,
      quantity: row.quantity,
      price: row.price,
    };
  }

  // Update cart item quantity
  async updateCartItemQuantity(
    itemId: number,
    quantity: number,
  ): Promise<void> {
    await sql`
      UPDATE cart_items
      SET quantity = ${quantity}
      WHERE id = ${itemId}
    `;
  }

  // Update the timestamp for a cart when items are added/updated
  async updateCartTimestamp(cartId: number): Promise<void> {
    const updatedAt = formatDate(new Date());
    await sql`
      UPDATE carts
      SET updated_at = ${updatedAt}
      WHERE id = ${cartId}
    `;
  }

  async editItem(
    cartId: number,
    item: Pick<CartItem, "product_id" | "quantity">,
  ): Promise<void> {
    await sql`
      UPDATE cart_items
      SET quantity = ${item.quantity}
      WHERE cart_id = ${cartId} AND product_id = ${item.product_id}
    `;
    await this.updateCartTimestamp(cartId);
    revalidatePath("/");
  }

  async deleteItem(
    cartId: number,
    item: Pick<CartItem, "product_id">,
  ): Promise<void> {
    await sql`
      DELETE FROM cart_items
      WHERE cart_id = ${cartId} AND product_id = ${item.product_id}
    `;
    await this.updateCartTimestamp(cartId);
    revalidatePath("/");
  }
}
