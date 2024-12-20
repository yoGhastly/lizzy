"use client";
import { useState } from "react";
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../common/components/button";
import { Product } from "../domain/Product";
import { useFormStatus } from "react-dom";
import { ProductVariants } from "./product-variants";
import { useModalStore } from "../../modal/modal.store";

interface Props {
  product: Product;
  addProductToCart: (variantId: string) => void; // Accept variantId as argument
}

export const ProductDescription: React.FC<Props> = ({
  product,
  addProductToCart,
}) => {
  const { toggleModal, setSelectedVariantId } = useModalStore((state) => state);
  const { pending } = useFormStatus();
  const [variantSelected, setVariantSelected] = useState<string | null>(null); // store variant_id
  const [showVariantMessage, setShowVariantMessage] = useState(false);

  const handleVariantSelect = (variant: { unit: string; value: string }) => {
    setVariantSelected(variant.value); // Update the selected variant
    setSelectedVariantId(variant.value); // Save the selected variant ID in the modal store
    setShowVariantMessage(false); // Clear the message when a variant is selected
  };

  const hasVariants =
    product.metadata.colores !== "N/A" ||
    product.metadata.mililitros !== "N/A" ||
    product.metadata.miligramos !== "N/A" ||
    product.metadata.longitud !== "N/A";

  function addToCart() {
    if (hasVariants && !variantSelected) {
      setShowVariantMessage(true); // Show message if no variant is selected
      return;
    }
    addProductToCart(variantSelected || ""); // Pass the selected variant_id to the parent function
    if (!pending) {
      toggleModal();
    }
  }

  return (
    <form action={addToCart} className="flex flex-col gap-3">
      <section className="flex flex-col gap-12">
        <div className="header-container flex flex-col gap-2">
          <div className="product_header flex justify-between items-center">
            <p className="font-bold text-[16px] capitalize">{product.name}</p>
          </div>

          <div className="product_price_variants flex flex-col gap-4">
            <p className="text-xl">${product.price / 100} MXN</p>
            {hasVariants && (
              <div className="flex gap-2">
                <ProductVariants
                  metadata={product.metadata}
                  onSelectVariant={handleVariantSelect} // Pass variant selection handler
                />
              </div>
            )}
            {showVariantMessage && (
              <p className="text-red-500 text-sm">
                Seleccione una variante antes de añadirla a la cesta.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button type="submit" disabled={pending}>
            {pending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <ShoppingBagIcon className="h-4" />
            )}
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
          <p className="mx-auto text-muted-gray first-letter:capitalize">
            {product.description}
          </p>
          {product.brand === "N/A" ? null : (
            <>
              <p className="text-novi-950 font-semibold">Marca</p>
              <p className="text-muted-gray capitalize">{product.brand}</p>
            </>
          )}
        </div>
      </section>
    </form>
  );
};
