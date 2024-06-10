import { sql } from "@vercel/postgres";
import { Product, ProductsRepository } from "../domain/Product";

export class MySqlProductsRepository implements ProductsRepository {
  async getAll(): Promise<Product[]> {
    const { rows: products } = await sql`
      SELECT * FROM products
    `;
    return products as Product[];
  }
}
