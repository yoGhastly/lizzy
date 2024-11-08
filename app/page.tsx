import { ProductsSection } from "./modules/products/layouts/products-section";
import { Footer } from "./modules/common/layout/footer";
import { unstable_cache } from "next/cache";
import { MySqlProductsRepository } from "./modules/products/infrastructure/ProductsRepository";
import { CategoriesMarquee } from "./modules/home/categories-marquee";
import { MySqlCategoriesRepository } from "./modules/categories/infrastructure/CategoriesRepository";

const productsRepository = new MySqlProductsRepository();
const categoriesRepository = new MySqlCategoriesRepository();

const getProducts = unstable_cache(
  async () => await productsRepository.getAll(),
  ["products"],
  { revalidate: 60, tags: ["products"] },
);

const getCategories = unstable_cache(
  async () => await categoriesRepository.getAll(),
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);

export default async function Home() {
  const allProducts = await getProducts();
  const allCategories = await getCategories();

  return (
    <div className="flex flex-col items-center w-full gap-12 md:gap-24 mt-14 md:mt-24 mx-auto px-5">
      <CategoriesMarquee categories={allCategories as any} />
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
