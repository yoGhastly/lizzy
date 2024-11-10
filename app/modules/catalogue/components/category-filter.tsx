"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/app/utils/cn";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useModalStore } from "../../modal/modal.store";

interface Option {
  id: number;
  name: string;
}

interface Props {
  filterOptions: Option[];
  selectedCategory: string;
}

export const CategoryFilter: React.FC<Props> = ({
  filterOptions,
  selectedCategory,
}) => {
  const router = useRouter();
  const { setModalContentType, toggleModal } = useModalStore();

  const handleCategorySelection = (category: string) => {
    router.push(`/catalogo/productos?category=${category}`, { scroll: false });
  };

  const memoizedClassName = (category: string) => {
    return cn(
      {
        "opacity-100": category === selectedCategory.toLowerCase(),
      },
      "btn btn-outline md:btn-outline btn-sm md:btn",
      "text-xs md:text-sm font-normal capitalize",
      "hover:bg-white hover:text-black hover:opacity-100",
    );
  };

  const handleFilterButtonClick = () => {
    setModalContentType("filter");
    toggleModal();
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
            className={memoizedClassName(category.name)}
            onClick={() => handleCategorySelection(category.name)}
          >
            {category.name}
          </button>
        ))}
      </ScrollShadow>
      <button
        className="btn btn-outline md:btn-outline btn-sm md:btn text-xs md:text-sm font-normal hover:bg-white"
        onClick={handleFilterButtonClick}
      >
        <AdjustmentsHorizontalIcon className="h-4 md:h-6 text-black" />
      </button>
    </div>
  );
};
