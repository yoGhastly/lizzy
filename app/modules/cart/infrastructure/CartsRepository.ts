import { formatDate } from "@/app/utils/formatDate";
import { Cart, CartItem, CartRepository } from "../domain/Cart";
import { sql } from "@vercel/postgres";

export class MySqlCartsRepository implements CartRepository {
  async create(cart: Cart): Promise<void> {
    const { user_id, session_id, created_at, updated_at } = cart;
    const formattedCreatedAt = formatDate(created_at);
    const formattedUpdatedAt = formatDate(updated_at);

    const result = await sql`
      INSERT INTO carts (user_id, session_id, created_at, updated_at)
      VALUES (${user_id}, ${session_id}, ${formattedCreatedAt}, ${formattedUpdatedAt})
      RETURNING id
    `;
    cart.id = result.rows[0].id;
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
    const { product_id, variant_id, quantity, price } = item;

    const existingItemResult = await sql`
      SELECT * FROM cart_items
      WHERE cart_id = ${cartId} AND product_id = ${product_id} AND variant_id = ${variant_id}
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
        INSERT INTO cart_items (cart_id, product_id, variant_id, quantity, price)
        VALUES (${cartId}, ${product_id}, ${variant_id}, ${quantity}, ${price})
      `;
    }
  }
}
