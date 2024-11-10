export interface Category {
  id: number;
  name: string;
  subcategories: { id: number; name: string }[]; // Array of subcategories
}

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  getSubcategories(categoryId: number): Promise<{ id: number; name: string }[]>;
}
