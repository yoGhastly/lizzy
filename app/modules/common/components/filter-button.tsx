"use client";
import { cn } from "@/app/utils/cn";
import {
  OrderByFilters,
  useFiltersStore,
} from "../../catalogue/store/filters.store";

export const FilterButton = ({
  filterName,
}: {
  filterName: OrderByFilters;
}) => {
  const { orderBy, setOrderBy } = useFiltersStore();

  const isActive = orderBy === filterName;
  const baseClasses =
    "btn btn-sm text-black bg-white border border-black transition-colors duration-200 ease-in-out hover:bg-white hover:text-black hover:border-black";
  const activeClasses =
    "border-novi-700 text-novi-700 border-2 hover:border-novi-700 hover:text-novi-700";

  const handleClick = () => {
    setOrderBy(filterName);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(baseClasses, isActive && activeClasses)}
    >
      {filterName}
    </button>
  );
};
