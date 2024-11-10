import Stripe from "stripe";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET() {
  try {
    const products = await stripe.products.list();
    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list({ product: product.id });
        return {
          ...product,
          prices: prices.data,
        };
      }),
    );

    await sql`
      DELETE FROM products;
    `;
    await sql`
      DELETE FROM product_variants;
    `;

    await Promise.all(
      productsWithPrices.map(async (product) => {
        const price =
          product.prices.length > 0 ? product.prices[0].unit_amount : null;
        const brand = product.metadata?.marca || null;
        const category = product.metadata?.categoria || null;
        const subcategory = product.metadata?.subcategoria || null; // Extract subcategoria from metadata

        await sql`
        INSERT INTO products (id, name, description, price, brand, category, metadata, images, subcategoria)
        VALUES (
          ${product.id},
          ${product.name},
          ${product.description},
          ${price},
          ${brand},
          ${category},
          ${JSON.stringify(product.metadata)}::jsonb,
          ${JSON.stringify(product.images)}::jsonb,
          ${subcategory} -- Insert subcategoria into the new column
        )
        ON CONFLICT (id) DO UPDATE
        SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          brand = EXCLUDED.brand,
          category = EXCLUDED.category,
          metadata = EXCLUDED.metadata,
          images = EXCLUDED.images,
          subcategoria = EXCLUDED.subcategoria; -- Update subcategoria if it changes
      `;
      }),
    );

    return NextResponse.json({
      status: 200,
      body: productsWithPrices,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: {
        error: error.message,
      },
    });
  }
}
