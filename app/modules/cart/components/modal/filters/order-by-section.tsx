"use client";
import { FilterButton } from "@/app/modules/common/components/filter-button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

interface OrderBySectionProps {
  subcategories: { name: string; id: number }[];
  allCategories: {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
  }[];
}

export const OrderBySection: React.FC<OrderBySectionProps> = ({
  subcategories,
  allCategories,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 md:hidden">
        <p className="text-black font-semibold">Categorias</p>
      </div>
      <ScrollShadow
        hideScrollBar
        orientation="vertical"
        className="flex flex-wrap gap-3 md:hidden"
      >
        {allCategories.map((subcategory) => (
          <FilterButton
            filterName={subcategory.name}
            key={subcategory.id}
            allCategories={allCategories}
          />
        ))}
      </ScrollShadow>
      <div className="flex items-center gap-3">
        <p className="text-black font-semibold">Subcategorias</p>
      </div>
      <ScrollShadow
        hideScrollBar
        orientation="vertical"
        className="flex flex-wrap gap-3"
      >
        {subcategories.map((subcategory) => (
          <FilterButton
            filterName={subcategory.name}
            key={subcategory.id}
            allCategories={allCategories}
          />
        ))}
      </ScrollShadow>
    </div>
  );
};
