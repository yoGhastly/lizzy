export interface Category {
  id: number;
  name: string;
  subcategories: { id: number; name: string }[]; // Array of subcategories
}

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
}
