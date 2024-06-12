export interface ProductsRepository {
  getAll(): Promise<Product[]>;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
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
