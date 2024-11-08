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

  async getByCategory(category: string): Promise<Product[]> {
    try {
      const result = await sql`
      SELECT * FROM products
      WHERE category = ${category};
    `;

      return result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        brand: row.brand,
        category: row.category,
        metadata: row.metadata,
        images: row.images,
      }));
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw new Error("Failed to fetch products by category");
    }
  }
}
