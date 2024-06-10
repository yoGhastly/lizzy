import { MySqlProductsRepository } from "./infrastructure/ProductsRepository";

const products = new MySqlProductsRepository();

export async function getProducts() {
  "use server";
  const allProducts = await products.getAll();
  return allProducts;
}
