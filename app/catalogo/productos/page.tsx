import { DecorativeTitle } from "@/app/modules/common/components/decorative-title";
import { CategoryCollapsibleMenu } from "@/app/modules/catalogue/components/category-collapsible-menu";
import { CategoryFilter } from "@/app/modules/catalogue/components/category-filter";
import { ProductCard } from "@/app/modules/products/components/card";
import { validateCategory } from "@/app/constants";
import { MySqlProductsRepository } from "@/app/modules/products/infrastructure/ProductsRepository";
import { MySqlCategoriesRepository } from "@/app/modules/categories/infrastructure/CategoriesRepository";
import { unstable_cache } from "next/cache";

interface SearchParams {
  category?: string;
}

const productsRepository = new MySqlProductsRepository();
const categoriesRepository = new MySqlCategoriesRepository();

const getProductsByCategory = unstable_cache(
  async (category: string) => await productsRepository.getByCategory(category),
  ["products-by-category"],
  { revalidate: 3600, tags: ["products-by-category"] },
);

const getAllProducts = unstable_cache(
  async () => await productsRepository.getAll(),
  ["all-products"],
  { revalidate: 3600, tags: ["all-products"] },
);

const getCategories = unstable_cache(
  async () => await categoriesRepository.getAll(),
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const categoryParam = searchParams.category || "Ver Todo";
  const displayCategory = validateCategory(categoryParam);

  // Fetch the categories dynamically
  const categories = await getCategories();

  const products =
    displayCategory === "Ver Todo"
      ? await getAllProducts()
      : await getProductsByCategory(displayCategory);

  const options = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Hombres" },
    { id: 3, name: "Mujeres" },
  ];

  return (
    <div className="mx-auto mt-14 flex flex-col w-full px-5">
      <section className="flex w-full h-full gap-16">
        <aside className="w-fit h-screen hidden md:block">
          <CategoryCollapsibleMenu
            categories={categories}
            category={displayCategory}
          />
        </aside>
        <main className="flex flex-col w-full gap-4">
          <DecorativeTitle
            className="text-novi-950 font-normal capitalize"
            decorative={false}
          >
            {displayCategory}
          </DecorativeTitle>
          <CategoryFilter filterOptions={options} />
          <div className="w-full h-screen">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
