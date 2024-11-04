import { ProductsSection } from "./modules/products/layouts/products-section";
import { Footer } from "./modules/common/layout/footer";
import { Header } from "./modules/home/header";
import { unstable_cache } from "next/cache";
import { MySqlProductsRepository } from "./modules/products/infrastructure/ProductsRepository";

const productsRepository = new MySqlProductsRepository();

const getProducts = unstable_cache(
  async () => await productsRepository.getAll(),
  ["products"],
  { revalidate: 60, tags: ["products"] },
);

export default async function Home() {
  const allProducts = await getProducts();

  return (
    <div className="flex flex-col items-center w-full gap-12 md:gap-24 mt-14 md:mt-24 mx-auto px-5">
      <Header />
      <ProductsSection
        title="Favoritos de los Clientes"
        description={{
          text: "Descubre los productos más queridos por nuestros clientes. Estos artículos han sido probados y",
          gradientText: "amados por personas como tú.",
        }}
        products={allProducts.slice(0, 5)}
      />

      <ProductsSection
        title="Recién añadidos"
        description={{
          text: "Mantente al día con las novedades y descubre los productos más emocionantes para actualizar tu rutina de cuidado personal.",
        }}
        products={allProducts.slice(5, 10)}
      />

      <Footer />
    </div>
  );
}
