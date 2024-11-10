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
import { useModalStore } from "../../modal/modal.store";

export const FloatingProductInfo = ({
  product,
  onAddProductToCart,
}: {
  product: Product;
  onAddProductToCart: () => void;
}) => {
  const { toggleModal } = useModalStore((state) => state);

  const addProduct = () => {
    onAddProductToCart();
    toggleModal();
  };

  return (
    <FloatingProductInfoLayout>
      <section className="bg-white border border-base/20 px-4 py-3 md:px-8 md:py-5 drop-shadow-md rounded-md flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Avatar>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              className="w-full h-full"
            />
          </Avatar>
          <Suspense>
            <ProductTitle productName={product.name} />
            <span>
              <p className="text-md">${product.price / 100} MXN</p>
            </span>
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
