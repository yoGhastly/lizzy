import { sql } from "@vercel/postgres";
import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/Order";

function parseJSON(value: string): any {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.log(`Error parsing JSON: ${error}`);
    return null;
  }
}

export class OrderRepositoryImpl implements OrderRepository {
  async create(order: Order): Promise<void> {
    "use server";
    try {
      await sql`INSERT INTO orders (id, line_items, total, customer_details, payment_status, payment_details)
      VALUES (${order.id}, ${JSON.stringify(order.lineItems)}, ${order.total}, ${JSON.stringify(order.customerDetails)}, ${order.paymentStatus}, ${JSON.stringify(order.paymentDetails)})`;
      console.log(`Order saved: ${order.id}`);
    } catch (error) {
      console.log(`Error creating order: ${error}`);
      throw new Error(`Error creating order: ${error}`);
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
      const order: Order = {
        id: row.id,
        session_id: row.session_id,
        lineItems: parseJSON(row.line_items),
        total: row.total,
        customerDetails: parseJSON(row.customer_details),
        paymentStatus: row.payment_status,
        paymentDetails: parseJSON(row.payment_details),
      };
      return order;
    } catch (error) {
      console.log(`Error getting order: ${error}`);
      throw new Error(`Error getting order: ${error}`);
    }
  }
}
