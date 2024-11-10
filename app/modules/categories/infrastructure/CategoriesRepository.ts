import { sql } from "@vercel/postgres";
import { Category, CategoryRepository } from "../domain/Category";

export class MySqlCategoriesRepository implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    "use server";

    // Fetch categories and their subcategories in one query
    const { rows } = await sql`
      SELECT
        categories.id AS category_id,
        categories.name AS category_name,
        subcategories.id AS subcategory_id,
        subcategories.name AS subcategory_name
      FROM categories
      LEFT JOIN subcategories ON subcategories.category_id = categories.id;
    `;

    // Group subcategories under their respective categories
    const categoriesWithSubcategories = rows.reduce((acc: any, row: any) => {
      const category = acc.find(
        (cat: any) => cat.category_id === row.category_id,
      );

      if (!category) {
        acc.push({
          category_id: row.category_id,
          category_name: row.category_name,
          subcategories: row.subcategory_id
            ? [{ id: row.subcategory_id, name: row.subcategory_name }]
            : [],
        });
      } else {
        if (row.subcategory_id) {
          category.subcategories.push({
            id: row.subcategory_id,
            name: row.subcategory_name,
          });
        }
      }

      return acc;
    }, []);

    // Return the structured categories with subcategories
    return categoriesWithSubcategories.map((category: any) => ({
      id: category.category_id,
      name: category.category_name,
      subcategories: category.subcategories,
    })) as unknown as Category[];
  }

  async getAllSubcategories(): Promise<{ id: number; name: string }[]> {
    "use server";
    const { rows } = await sql`
      SELECT id, name FROM subcategories;
    `;
    return rows as { id: number; name: string }[];
  }
}
