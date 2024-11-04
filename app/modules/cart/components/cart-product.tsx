import type { Product } from "../../products/domain/Product";
import type { CartItem } from "../domain/Cart";
import { getProduct } from "../../products/actions";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemButton } from "./edit-item-button";
import { ProductQuantityLabel } from "../../products/components/product-quantity-label";
import Image from "next/image";

export const CartProduct = async ({
  productId,
  item,
  quantity,
}: {
  productId: string;
  item: Omit<CartItem, "quantity" | "price">;
  quantity: number;
}) => {
  let product: Product = {} as Product;

  if (productId) {
    const details = await getProduct({ id: productId });
    if (!details) return null;
    product = details;
  }

  return (
    <div className="flex gap-1">
      <div className="min-h-full w-32 relative">
        <Image
          src={product.images[0]}
          alt="Product"
          fill
          className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          loading="lazy"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAA=="
          placeholder="blur"
        />
      </div>
      <section className="flex flex-col w-full aspect-[1/0.45] justify-between">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full items-center">
            <span className="uppercase font-semibold text-sm">
              MXN {product.price / 100}
            </span>
            <div className="flex gap-2">
              <EditItemButton productId={product.id} />
              <div className="h-4 w-[2px] bg-muted-gray/50"></div>
              <DeleteItemButton item={item} />
            </div>
          </div>
          <p className="text-xs font-medium first-letter:capitalize max-w-36">
            {product.name}
            <ProductQuantityLabel quantity={quantity} />
          </p>
        </div>
        <p className="text-xs">Mover a favoritos</p>
      </section>
    </div>
  );
};
