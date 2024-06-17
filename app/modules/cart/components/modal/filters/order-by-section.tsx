"use client";
import { OrderByFilters } from "@/app/modules/catalogue/store/filters.store";
import { FilterButton } from "@/app/modules/common/components/filter-button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

export const OrderBySection = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <p className="text-black font-semibold">Ordenar por</p>
        <div className="badge badge-ghost flex items-center badge-sm">
          <span className="font-semibold text-black">1</span>
        </div>
      </div>
      <ScrollShadow
        hideScrollBar
        orientation="horizontal"
        className="flex gap-3"
      >
        {["Novedades", "Precio ascendente", "Precio descendente"].map(
          (category) => (
            <FilterButton
              filterName={category as OrderByFilters}
              key={category}
            />
          ),
        )}
      </ScrollShadow>
    </div>
  );
};
