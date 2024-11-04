"use server";
import { MySqlProductsRepository } from "./infrastructure/ProductsRepository";

const products = new MySqlProductsRepository();

export async function getProducts() {
  const allProducts = await products.getAll();
  return allProducts;
}

export async function getProduct({ id }: { id: string }) {
  const product = await products.get(id);
  return product;
}
