import { sql } from "@vercel/postgres";
import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/Order";

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
}
