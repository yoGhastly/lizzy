import { sql } from "@vercel/postgres";
import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/Order";

export class OrderRepositoryImpl implements OrderRepository {
  async create(order: Order): Promise<void> {
    "use server";
    try {
      await sql`
        INSERT INTO orders (id, session_id, line_items, total, customer_details, payment_status, payment_details)
        VALUES (
          ${order.id}, 
          ${order.session_id},
          ${JSON.stringify(order.lineItems)}::jsonb, 
          ${order.total}, 
          ${JSON.stringify(order.customerDetails)}::jsonb, 
          ${order.paymentStatus}, 
          ${JSON.stringify(order.paymentDetails)}::jsonb
        )
        ON CONFLICT (id) DO UPDATE
        SET
          session_id = EXCLUDED.session_id,
          line_items = EXCLUDED.line_items,
          total = EXCLUDED.total,
          customer_details = EXCLUDED.customer_details,
          payment_status = EXCLUDED.payment_status,
          payment_details = EXCLUDED.payment_details;
      `;
      console.log(`Order saved: ${order.id}`);
    } catch (error: any) {
      console.log(`Error creating order: ${error.message}`);
      throw new Error(`Error creating order: ${error.message}`);
    }
  }

  async getById(id: string): Promise<Order> {
    "use server";
    try {
      const result = await sql`SELECT * FROM orders WHERE id = ${id}`;
      if (result.rowCount === 0) {
        throw new Error(`Order not found: ${id}`);
      }
      const row = result.rows[0];

      // Log the raw data before parsing
      console.log(`Raw order data: ${JSON.stringify(row)}`);

      const order: Order = {
        id: row.id,
        session_id: row.session_id,
        lineItems: row.line_items,
        total: row.total,
        customerDetails: row.customer_details,
        paymentStatus: row.payment_status,
        paymentDetails: row.payment_details,
        createdAt: row.createdat,
      };
      return order;
    } catch (error: any) {
      console.log(`Error getting order: ${error.message}`);
      throw new Error(`Error getting order: ${error.message}`);
    }
  }
}
