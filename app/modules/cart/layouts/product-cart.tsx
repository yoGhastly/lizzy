import type { CartItem } from "../domain/Cart";
import { CartProduct } from "../components/cart-product";

export const ProductCart = ({
  product,
  quantity,
}: {
  product: CartItem;
  quantity: number;
}) => {
  return <CartProduct productId={product.product_id} quantity={quantity} />;
};
