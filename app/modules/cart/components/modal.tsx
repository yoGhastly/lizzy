import type { Cart } from "../domain/Cart";
import { CartLayoutBody } from "../layouts/cart-layout-body";
import { CartLayoutHeader } from "../layouts/cart-layout-header";
import { ProductCart } from "../layouts/product-cart";
import { CartLayout } from "./cart-layout";
import { ModalDescription } from "./modal/description";
import { CartLengthLabel } from "./modal/cart-length-label";
import { CartFallback } from "./cart-fallback";
import getStripe from "../../stripe/client";

interface Props {
  cart: Cart | null;
  subcategories: { name: string; id: number }[];
  allCategories: {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
  }[];
}

interface CreateCheckoutSessionResponse {
  status: number;
  json: {
    sessionId: string;
    clientSecret: string;
  };
}

export const Modal: React.FC<Props> = ({
  cart,
  subcategories,
  allCategories,
}) => {
  return (
    <CartLayout
      cart={cart}
      items={cart?.items}
      subcategories={subcategories}
      allCategories={allCategories}
    >
      <CartLayoutHeader>
        <p className="text-center font-bold w-full">
          Cesta
          <CartLengthLabel length={cart?.items.length ?? 0} />
        </p>
      </CartLayoutHeader>
      <div className="divider" />
      <CartLayoutBody>
        <ModalDescription>
          {!cart?.items.length ? (
            <CartFallback />
          ) : (
            cart?.items.map((item) => (
              <ProductCart
                key={item.product_id}
                product={item}
                quantity={item.quantity}
              />
            ))
          )}
        </ModalDescription>
      </CartLayoutBody>
    </CartLayout>
  );
};
