"use client";
import React, { Suspense, useEffect } from "react";
import { ProductCard } from "@/app/modules/products/components/card";
import { DecorativeTitle } from "@/app/modules/common/components/decorative-title";
import {
  seeAllMockData,
  mockEyelashesOptions,
  mockNailsOptions,
  validateCategory,
  productsMock,
} from "@/app/constants";
import { CategoryCollapsibleMenu } from "@/app/modules/catalogue/components/category-collapsible-menu";
import { CategoryFilter } from "@/app/modules/catalogue/components/category-filter";
import { searchParamsSchema } from "@/app/modules/catalogue/schema/schemas";
import { useCatalogueStore } from "@/app/modules/catalogue/store/catalogue.store";

interface SearchParams {
  category?: string;
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const setCategory = useCatalogueStore((state) => state.setCategory);

  useEffect(() => {
    const paramCategory =
      searchParams.category === "all"
        ? "Ver Todo"
        : searchParams.category || "Ver Todo";
    setCategory(paramCategory);
  }, [searchParams, setCategory]);

  const category = useCatalogueStore((state) => state.category);
  const displayCategory = validateCategory(category);

  const options =
    category === "pestañas"
      ? mockEyelashesOptions
      : category === "uñas"
        ? mockNailsOptions
        : seeAllMockData;

  return (
    <div className="mx-auto mt-14 flex flex-col w-full px-5">
      <section className="flex w-full h-full gap-16">
        <aside className="w-fit h-screen hidden md:block">
          <Suspense>
            <CategoryCollapsibleMenu category={displayCategory} />
          </Suspense>
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
              {productsMock.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
