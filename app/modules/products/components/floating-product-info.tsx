"use client";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Avatar } from "../../common/components/avatar";
import Image from "next/image";
import { useCartStore } from "../../cart/store/cart.store";
import { Suspense } from "react";
import { ProductTitle } from "./product-title";
import { Button } from "../../common/components/button";
import { FloatingProductInfoLayout } from "../layouts/floating-product-info-layout";
import { Product } from "../domain/Product";

export const FlaoatingProductInfo = ({ product }: { product: Product }) => {
  const { toggleCart } = useCartStore((state) => state);

  const addProduct = () => {
    toggleCart();
  };

  return (
    <FloatingProductInfoLayout>
      <section className="bg-white px-4 py-3 md:px-8 md:py-5 drop-shadow-md rounded-md flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Avatar>
            <Image
              src="/next.svg"
              alt="Avatar"
              fill
              className="w-full h-full"
            />
          </Avatar>
          <Suspense>
            <ProductTitle productName={product.name} />
          </Suspense>
        </div>
        <Button onClick={addProduct}>
          <ShoppingBagIcon className="h-4" />
          <span className="hidden md:block">Agregar</span>
        </Button>
      </section>
    </FloatingProductInfoLayout>
  );
};
