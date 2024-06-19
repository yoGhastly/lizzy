export interface ProductsRepository {
  getAll(): Promise<Product[]>;
  get(id: number): Promise<Product | null>;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  metadata: ProductMetadata;
}

export interface ProductMetadata {
  type: string;
  subcategory: string;
  quantity: number;
  colors: `${string}-${string}` | `N/A`;
  mililitros: string;
  miligramos: string;
  longitud: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  stock: number;
  type: string;
}
