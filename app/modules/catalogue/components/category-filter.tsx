"use client";
import { cn } from "@/app/utils/cn";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import React, { useState } from "react";

interface Option {
  id: number;
  name: string;
}

interface Props {
  filterOptions: Option[];
}

export const CategoryFilter: React.FC<Props> = ({ filterOptions }) => {
  const [searchParams, setSearchParams] = useState({ category: "all" });

  const handleFilterClick = (category: string) => {
    setSearchParams({ category: category.toLowerCase() });
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <ScrollShadow
        hideScrollBar
        orientation="horizontal"
        className="flex gap-4 max-w-xs md:max-w-3xl w-full"
      >
        {filterOptions.map((category) => (
          <button
            key={category.id}
            onClick={() => handleFilterClick(category.name)}
            className={cn(
              "btn btn-outline md:btn-outline btn-sm md:btn",
              "text-xs md:text-sm font-normal",
              "hover:bg-white hover:text-black hover:opacity-100",
              {
                "opacity-100":
                  (category.name === "Ver Todo" &&
                    searchParams.category === "all") ||
                  category.name.toLowerCase() === searchParams.category,
              },
            )}
          >
            {category.name}
          </button>
        ))}
      </ScrollShadow>
      <button
        className={cn(
          "btn btn-outline md:btn-outline btn-sm md:btn",
          "text-xs md:text-sm font-normal",
          "hover:bg-white",
        )}
      >
        <AdjustmentsHorizontalIcon className="h-4 md:h-6 text-black" />
      </button>
    </div>
  );
};
