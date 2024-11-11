import type { CartItem } from "../domain/Cart";
import { CartProduct } from "../components/cart-product";

export const ProductCart = ({
  product,
  quantity,
}: {
  product: CartItem;
  quantity: number;
}) => {
  if (!product) return null;
  const { product_id, variant_id } = product;

  return (
    <CartProduct
      item={{ product_id }}
      productId={product_id}
      quantity={quantity}
      variantId={variant_id || ""}
    />
  );
};
