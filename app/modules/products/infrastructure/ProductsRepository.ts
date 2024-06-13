import { sql } from "@vercel/postgres";
import { Product, ProductsRepository } from "../domain/Product";

export class MySqlProductsRepository implements ProductsRepository {
  async getAll(): Promise<Product[]> {
    const { rows: products } = await sql`
      SELECT * FROM products
    `;
    return products as Product[];
  }
  async get(id: number): Promise<Product | null> {
    const { rows: products } = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;
    if (products.length === 0) {
      return null;
    }
    return products[0] as Product;
  }
}
