"use client";
import {
  BuildingStorefrontIcon,
  HeartIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "../../cart/store/cart.store";
import { Button } from "../../common/components/button";
import { Product } from "../domain/Product";

export const ProductDescription = ({ product }: { product: Product }) => {
  const { toggleCart } = useCartStore((state) => state);

  return (
    <form className="flex flex-col gap-3">
      <section className="flex flex-col gap-12">
        <div className="header-container flex flex-col gap-2">
          <div className="product_header flex  justify-between items-center">
            <p className="font-bold text-[16px]">{product.name}</p>
            <HeartIcon className="h-6" />
          </div>

          <div className="product_price_variants flex flex-col gap-4">
            <p className="text-xl">$299.00</p>
            <div className="flex gap-2">
              {["green", "red", "blue"].map((color) => (
                <div
                  key={color}
                  className="w-8 h-8"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button type="button" onClick={toggleCart}>
            <ShoppingBagIcon className="h-4" />
            Agregar
          </Button>

          <div className="flex flex-col gap-0">
            <button className="btn btn-outline pointer-events-none justify-start text-muted-gray rounded-b-none hover:bg-white hover:text-muted-gray border border-muted-gray/50 rounded-md">
              <BuildingStorefrontIcon className="h-4" />
              Recogida en tienda
              <span className="text-[10px] text-green-500 uppercase">
                Gratis
              </span>
            </button>

            <button className="btn btn-outline pointer-events-none justify-start text-muted-gray hover:bg-white hover:text-muted-gray rounded-t-none border border-muted-gray/50 rounded-md">
              <TruckIcon className="h-4" />
              Envío estándar
              <span className="text-[10px] text-muted-gray/70">
                Calculado en checkout
              </span>
            </button>
          </div>
        </div>

        <div className="border-t flex flex-col gap-3 border-t-muted-gray/50 p-5">
          <p className="text-novi-950 font-semibold">Descripción</p>
          <p className="mx-auto text-muted-gray">{product.description}</p>
        </div>
      </section>
    </form>
  );
};
