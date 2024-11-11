"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/app/utils/cn";
import { validateCategory } from "@/app/constants";
import { useModalStore } from "../../modal/modal.store";

interface Props {
  filterName: string;
  allCategories: {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
  }[];
}

export const FilterButton: React.FC<Props> = ({
  filterName,
  allCategories,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { toggleModal, setModalContentType } = useModalStore((state) => state);

  const baseClasses =
    "btn btn-sm w-fit text-black capitalize font-normal bg-white border border-black transition-colors duration-200 ease-in-out hover:bg-white hover:text-black hover:border-black";
  const isActiveClasses = "text-novi-700 border-novi-700 font-semibold";

  const handleClick = (categoryName: string) => {
    const validatedCategory = validateCategory(categoryName, allCategories);
    router.push(
      `/catalogo/productos?category=${encodeURIComponent(validatedCategory)}`,
      { scroll: false },
    );
    toggleModal();
    setModalContentType("cart");
  };

  const isActive = searchParams.get("category") === filterName;

  return (
    <button
      onClick={() => handleClick(filterName)}
      className={cn(baseClasses, isActive && isActiveClasses)}
    >
      {filterName}
    </button>
  );
};
