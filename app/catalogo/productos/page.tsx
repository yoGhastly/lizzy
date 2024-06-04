"use client";
import React from "react";
import { CollapsibleMenu } from "./components/collapsible-menu";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "@/app/modules/products/components/card";
import { DecorativeTitle } from "@/app/modules/common/components/decorative-title";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { cn } from "@/app/utils/cn";

interface SearchParams {
  category: string;
}

// TODO: Render category name if it's included in the category list
export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="mx-auto mt-14 flex flex-col w-full px-5">
      <section className="flex w-full h-full gap-16">
        <aside className="w-fit h-screen hidden md:block">
          <CollapsibleMenu category={searchParams.category} />
        </aside>
        <main className="flex flex-col w-full gap-4">
          <DecorativeTitle
            className="text-black font-normal capitalize"
            decorative={false}
          >
            {searchParams.category === "all"
              ? "Todos los productos"
              : searchParams.category}
          </DecorativeTitle>
          <div className="flex justify-between items-center gap-4">
            <ScrollShadow
              hideScrollBar
              orientation="horizontal"
              className="flex gap-4 max-w-xs md:max-w-3xl w-full"
            >
              {[
                "Ver Todo",
                "Pestañas",
                "Uñas",
                "Option",
                "Option",
                "Option",
              ].map((c) => (
                <button
                  key={c.toLowerCase()}
                  className={cn(
                    "btn btn-outline md:btn-outline btn-sm md:btn",
                    "opacity-50 text-xs md:text-sm font-normal",
                    "hover:bg-white hover:text-black hover:opacity-100",
                    {
                      "opacity-100":
                        (c === "Ver Todo" && searchParams.category === "all") ||
                        c.toLowerCase() === searchParams.category,
                    },
                  )}
                >
                  {c}
                </button>
              ))}
            </ScrollShadow>
            <button
              className={cn(
                "btn btn-outline md:btn-outline btn-sm md:btn",
                "text-xs md:text-sm font-normal",
                "hover:bg-white hover:text-black hover:opacity-100",
              )}
            >
              <AdjustmentsHorizontalIcon className="h-4 md:h-6" />
            </button>
          </div>
          <div className="w-full h-screen">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <ProductCard key={i} />
              ))}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
