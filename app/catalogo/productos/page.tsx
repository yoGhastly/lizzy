import { unstable_cache } from "next/cache";
import { MySqlProductsRepository } from "@/app/modules/products/infrastructure/ProductsRepository";
import { MySqlCategoriesRepository } from "@/app/modules/categories/infrastructure/CategoriesRepository";
import { validateCategory } from "@/app/constants";
import { CategoryCollapsibleMenu } from "@/app/modules/catalogue/components/category-collapsible-menu";
import { DecorativeTitle } from "@/app/modules/common/components/decorative-title";
import { CategoryFilter } from "@/app/modules/catalogue/components/category-filter";
import { ProductCard } from "@/app/modules/products/components/card";

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
  searchParams: { category?: string; orderBy?: string };
}) {
  const { category, orderBy } = searchParams;
  const categories = await getCategories();

  const displayCategory = validateCategory(category || "Ver Todo", categories);

  const products =
    displayCategory === "Ver Todo"
      ? await getAllProducts()
      : await getProductsByCategory(displayCategory.toLowerCase());

  // Get filter options based on selected category
  const options =
    displayCategory === "Ver Todo"
      ? categories.map((category) => ({
          id: category.id,
          name: category.name,
        }))
      : categories
          .find((category) => category.name === displayCategory.toLowerCase())
          ?.subcategories.map((subcategory) => ({
            id: subcategory.id,
            name: subcategory.name,
          })) || [];

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
          <CategoryFilter
            filterOptions={options}
            selectedCategory={displayCategory}
          />
          <div className="w-full h-screen">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {
                // if orderBy is not defined, sort normally otherwise sort by price
                products
                  .sort((a, b) =>
                    orderBy === "asc"
                      ? a.price - b.price
                      : orderBy === "desc"
                        ? b.price - a.price
                        : 0,
                  )
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
              }
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
