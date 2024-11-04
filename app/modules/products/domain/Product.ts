export interface ProductsRepository {
  getAll(): Promise<Product[]>;
  get(id: string): Promise<Product | null>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  images: string[];
  category: string;
  metadata: ProductMetadata;
}

export interface ProductMetadata {
  type: string;
  subcategory: string;
  quantity: number;
  colores: `${string}-${string}` | `N/A`;
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
