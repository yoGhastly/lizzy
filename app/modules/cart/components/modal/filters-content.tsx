"use client";
import { Button } from "@/app/modules/common/components/button";
import { CartLayoutBody } from "../../layouts/cart-layout-body";
import { CartLayoutHeader } from "../../layouts/cart-layout-header";
import { OrderBySection } from "./filters/order-by-section";
import { OrderByPriceSection } from "./filters/order-by-price-section";

export const FiltersContent = ({
  subcategories,
  allCategories,
}: {
  subcategories: { name: string; id: number }[];
  allCategories: {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
  }[];
}) => {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <CartLayoutHeader flexReverse>
        <p className="text-center font-bold w-full">Filtrar</p>
      </CartLayoutHeader>
      <div className="divider" />
      <CartLayoutBody>
        <div className="flex flex-col w-full">
          <OrderBySection
            subcategories={subcategories}
            allCategories={allCategories}
          />
          <div className="divider" />
          <OrderByPriceSection />
        </div>
      </CartLayoutBody>
    </div>
  );
};
