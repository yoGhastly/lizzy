import Stripe from "stripe";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET() {
  try {
    const products = await stripe.products.list();

    // Create a set to store unique categories and subcategories
    const categoriesSet = new Set<string>();
    const subcategoriesMap = new Map<string, string[]>(); // Map of categories to subcategories

    // Extract categories and subcategories from product metadata
    products.data.forEach((product) => {
      const category = product.metadata?.categoria;
      const subcategory = product.metadata?.subcategoria;

      if (category) {
        categoriesSet.add(category); // Add category to the set
      }

      if (subcategory && category) {
        // If subcategory exists, add it to the map with the corresponding category
        if (!subcategoriesMap.has(category)) {
          subcategoriesMap.set(category, []);
        }
        subcategoriesMap.get(category)?.push(subcategory);
      }
    });

    const uniqueCategories = Array.from(categoriesSet);

    // Create the categories table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
    `;

    // Insert unique categories into the categories table
    await Promise.all(
      uniqueCategories.map(async (category) => {
        await sql`
          INSERT INTO categories (name)
          VALUES (${category})
          ON CONFLICT (name) DO NOTHING;
        `;
      }),
    );

    // Insert subcategories and link them to their respective categories
    await Promise.all(
      Array.from(subcategoriesMap.entries()).map(
        async ([category, subcategories]) => {
          // Find the category id for the subcategory
          const categoryIdQuery = await sql`
            SELECT id FROM categories WHERE name = ${category};
          `;

          const categoryId =
            categoryIdQuery.rows.length > 0 ? categoryIdQuery.rows[0].id : null;

          if (categoryId) {
            // Insert each subcategory and link it to the category
            await Promise.all(
              subcategories.map(async (subcategory) => {
                await sql`
                  INSERT INTO subcategories (name, category_id)
                  VALUES (${subcategory}, ${categoryId})
                  ON CONFLICT (name) DO NOTHING;
                `;
              }),
            );
          } else {
            console.error(
              `No category found for subcategory group: "${category}"`,
            );
          }
        },
      ),
    );

    // Fetch categories with their subcategories (make sure subcategories are returned as an array)
    const categoriesWithSubcategoriesQuery = await sql`
      SELECT categories.id, categories.name, 
             COALESCE(json_agg(subcategories.name), '[]') AS subcategories
      FROM categories
      LEFT JOIN subcategories ON categories.id = subcategories.category_id
      GROUP BY categories.id;
    `;

    const categoriesWithSubcategories =
      categoriesWithSubcategoriesQuery.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        subcategories: row.subcategories.filter(
          (subcategory: any) => subcategory !== null,
        ), // Remove null subcategories if present
      }));

    return NextResponse.json({
      status: 200,
      categories: categoriesWithSubcategories,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      categories: null,
      subcategories: null,
      error: error.message,
    });
  }
}
