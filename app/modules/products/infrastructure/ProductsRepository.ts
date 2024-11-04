import { sql } from "@vercel/postgres";
import { Product, ProductsRepository } from "../domain/Product";

export class MySqlProductsRepository implements ProductsRepository {
  async getAll(): Promise<Product[]> {
    "use server";
    const { rows: products } = await sql`
      SELECT * FROM products
    `;
    return products as Product[];
  }
  async get(id: string): Promise<Product | null> {
    "use server";
    const { rows: products } = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;
    if (products.length === 0) {
      return null;
    }
    // get product variants
    const { rows: variants } = await sql`
      SELECT * FROM product_variants WHERE product_id = ${id}
    `;
    products[0].variants = variants;
    return products[0] as Product;
  }
}
