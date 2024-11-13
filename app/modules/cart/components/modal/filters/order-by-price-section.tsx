"use client";
import { useModalStore } from "@/app/modules/modal/modal.store";
import { cn } from "@/app/utils/cn";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useRouter, useSearchParams } from "next/navigation";

export const OrderByPriceSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const orderBy = searchParams.get("orderBy");
  const { toggleModal, setModalContentType } = useModalStore((state) => state);

  const baseClasses =
    "btn btn-sm w-fit text-black capitalize font-normal bg-white border border-black transition-colors duration-200 ease-in-out hover:bg-white hover:text-black hover:border-black";
  const isActiveClasses = "text-novi-700 border-novi-700 font-semibold";

  const handleFilter = (filter: string) => {
    router.push(
      `/catalogo/productos?category=${category}&orderBy=${encodeURIComponent(filter)}`,
      {
        scroll: false,
      },
    );
    setModalContentType("cart")
    toggleModal();
  };

  const isActive = (filter: string) => {
    return orderBy === filter ? isActiveClasses : "";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <p className="text-black font-semibold">Precio</p>
      </div>
      <ScrollShadow
        hideScrollBar
        orientation="horizontal"
        className="flex flex-wrap gap-3"
      >
        {[
          { label: "Precio Ascendente", key: "asc" },
          { label: "Precio Descendente", key: "desc" },
        ].map((filter) => (
          <button
            key={filter.label}
            className={cn(baseClasses, isActive(filter.key))}
            onClick={() => handleFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </ScrollShadow>
    </div>
  );
};
