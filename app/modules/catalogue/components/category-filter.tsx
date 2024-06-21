"use client";
import { cn } from "@/app/utils/cn";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import React, { useState } from "react";
import { useCartStore } from "../../cart/store/cart.store";
import { useModalStore } from "../../modal/modal.store";

interface Option {
  id: number;
  name: string;
}

interface Props {
  filterOptions: Option[];
}

export const CategoryFilter: React.FC<Props> = ({ filterOptions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { toggleModal, setModalContentType } = useModalStore();

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleFilter = () => {
    setModalContentType("filter");
    toggleModal();
  };

  const memoizedClassName = (category: string) => {
    return cn(
      {
        "opacity-100": category.toLowerCase() === selectedCategory,
      },
      "btn btn-outline md:btn-outline btn-sm md:btn",
      "text-xs md:text-sm font-normal",
      "hover:bg-white hover:text-black hover:opacity-100",
    );
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
            className={memoizedClassName(category.name.toLowerCase())}
            onClick={() => handleCategorySelection(category.name.toLowerCase())}
          >
            {category.name}
          </button>
        ))}
      </ScrollShadow>
      <button
        onClick={toggleFilter}
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
