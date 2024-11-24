import { sql } from "@vercel/postgres";
import { UserRepository } from "../domain/User";
import { LastOrder } from "../../orders/domain/Order";

export class UserImpl implements UserRepository {
  async getLastOrder(userEmail: string): Promise<LastOrder | null> {
    "use server";
    try {
      console.log(`Getting last order for user: ${userEmail}`);
      const result = await sql`
        SELECT * FROM orders WHERE user_email = ${userEmail} ORDER BY "createdat" DESC LIMIT 1
      `;

      if (result.rowCount === 0) {
        console.error(`No orders found for user: ${userEmail}`);
        return null;
      }

      const row = result.rows[0];

      const lastOrder: LastOrder = {
        items: row.line_items.map((item: any) => item.url),
        quantity: row.line_items.length,
        id: "",
      };

      return lastOrder;
    } catch (error: any) {
      console.error(`Error getting last order: ${error.message}`);
      return null;
    }
  }
}
