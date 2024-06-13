import { cn } from "@/app/utils/cn";
import { Cart } from "../domain/Cart";
import { CartLayoutBody } from "../layouts/cart-layout-body";
import { CartLayoutHeader } from "../layouts/cart-layout-header";
import { ProductCart } from "../layouts/product-cart";
import { CartLayout } from "./cart-layout";
import { ModalDescription } from "./modal/description";

interface Props {
  cart: Cart | null;
}

export const Modal: React.FC<Props> = async ({ cart }) => {
  return (
    <CartLayout>
      <CartLayoutHeader>
        <p className="text-center font-bold w-full">
          Cesta
          <span className={cn({ hidden: !cart })}>({cart?.items.length})</span>
        </p>
      </CartLayoutHeader>
      <div className="divider" />
      <CartLayoutBody>
        <ModalDescription>
          {cart?.items.map((item) => (
            <ProductCart
              key={item.product_id}
              product={item}
              quantity={item.quantity}
            />
          ))}
        </ModalDescription>
      </CartLayoutBody>
    </CartLayout>
  );
};
