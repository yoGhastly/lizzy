"use client";
import { Button } from "@/app/modules/common/components/button";
import { CartLayoutBody } from "../../layouts/cart-layout-body";
import { CartLayoutHeader } from "../../layouts/cart-layout-header";
import { ColorSection } from "./filters/color-section";
import { OrderBySection } from "./filters/order-by-section";

export const FiltersContent = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <CartLayoutHeader>
        <p className="text-center font-bold w-full">Filtrar</p>
      </CartLayoutHeader>
      <div className="divider" />
      <CartLayoutBody>
        <div className="flex flex-col w-full">
          <OrderBySection />
          <div className="divider" />
          <ColorSection />
        </div>
      </CartLayoutBody>
      <div className="flex w-full items-center gap-3 justify-center">
        <Button secondary className="uppercase">
          Limpiar
        </Button>
        <Button className="uppercase">Ver Resultados (10)</Button>
      </div>
    </div>
  );
};
