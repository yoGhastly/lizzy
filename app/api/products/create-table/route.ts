import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/*
  Products Table:
    id (INT PRIMARY KEY): Unique identifier for each product.
    name (VARCHAR(255)): Name of the cosmetic product (e.g., "Radiant Foundation").
    description (TEXT): Detailed description of the product.
    brand (VARCHAR(255)): Brand of the cosmetic product.
    category (VARCHAR(255)): Category of the product (e.g., "Foundation", "Eyeshadow").
    (Additional product attributes like price, image, etc.)

  Product Variants Table:
    id (INT PRIMARY KEY): Unique identifier for each product variant.
    product_id (INT FOREIGN KEY REFERENCES Products(id)): Links the variant to a specific product.
    name (VARCHAR(255)): Variant name (e.g., "Shade 1", "30ml").
    (Additional variant attributes like size, color, etc.)
    price (DECIMAL): Price of the specific variant.
    stock (INT): Current stock level of the variant.
 */

export async function GET() {
  await sql`
    CREATE TABLE products (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      description TEXT,
      brand VARCHAR(255),
      category VARCHAR(255)
    );
  `;

  await sql`
    CREATE TABLE product_variants (
      id INT PRIMARY KEY,
      product_id INT REFERENCES Products(id),
      name VARCHAR(255),
      price DECIMAL,
      stock INT
    );
  `;

  return NextResponse.json(
    { message: "Products and Product Variants tables created" },
    {
      status: 200,
    },
  );
}
