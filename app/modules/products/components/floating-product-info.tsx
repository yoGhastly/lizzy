"use client";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Avatar } from "../../common/components/avatar";
import Image from "next/image";
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
  onAddProductToCart: (variantId: string) => Promise<void>;
}) => {
  const { toggleModal, selectedVariantId } = useModalStore((state) => state);

  const hasVariants =
    product.metadata.colores !== "N/A" ||
    product.metadata.mililitros !== "N/A" ||
    product.metadata.miligramos !== "N/A" ||
    product.metadata.longitud !== "N/A";

  const addProduct = () => {
    if (hasVariants && !selectedVariantId) {
      console.error("No variant selected");
      return;
    }
    onAddProductToCart(selectedVariantId || "");
    toggleModal();
  };

  const isButtonDisabled = hasVariants && !selectedVariantId;

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
              <p className="text-sm md:text-lg">${product.price / 100} MXN</p>
            </span>
          </Suspense>
        </div>
        <Button onClick={addProduct} disabled={isButtonDisabled}>
          <ShoppingBagIcon className="h-4" />
          <span className="hidden md:block">Agregar</span>
        </Button>
      </section>
    </FloatingProductInfoLayout>
  );
};
