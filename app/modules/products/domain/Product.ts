export interface ProductsRepository {
  getAll(): Promise<Product[]>;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  category: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  stock: number;
}
