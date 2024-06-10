import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const product = {
  id: 1,
  name: "Radiant Foundation",
  description: "A lightweight foundation that provides a radiant finish.",
  brand: "Beauty Co.",
  category: "Foundation",
  variants: [
    {
      id: 1,
      name: "Shade 1",
      price: 25.99,
      stock: 10,
    },
    {
      id: 2,
      name: "Shade 2",
      price: 25.99,
      stock: 5,
    },
  ],
};

export async function GET() {
  await sql`
    INSERT INTO products (id, name, description, brand, category)
    VALUES (${product.id}, ${product.name}, ${product.description}, ${product.brand}, ${product.category})
  `;
  return NextResponse.json(
    { message: "Product inserted successfully" },
    { status: 201 },
  );
}
