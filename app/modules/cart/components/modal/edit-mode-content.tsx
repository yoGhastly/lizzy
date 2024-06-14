"use client";
import { useCookies } from "next-client-cookies";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "../../store/cart.store";
import { CartFooter } from "./cart-footer";
import { CartLayoutHeader } from "../../layouts/cart-layout-header";
import { useTransition } from "react";
import { editItem } from "../../actions";
import { CartLayout } from "../cart-layout";
import { CartLayoutBody } from "../../layouts/cart-layout-body";
import { ModalDescription } from "./description";

export const EditModeContent = () => {
  const [isPending, startTransition] = useTransition();
  const { itemQuantity, setItemQuantity, itemId, setModalContentType } =
    useCartStore((state) => state);
  const c = useCookies();
  const cartId = c.get("cart");

  function saveChanges() {
    if (!itemId) return;
    startTransition(async () => {
      try {
        console.log("Updating item quantity");
        await editItem({ product_id: itemId, quantity: itemQuantity });
        console.log("Item updated");
        setModalContentType("cart");
      } catch (error) {
        console.error("Could not update item", error);
      }
    });
  }

  return (
    <CartLayout>
      <CartLayoutHeader flexReverse>
        <p className="text-center font-bold w-full">Detalles del artículo</p>
      </CartLayoutHeader>

      <div className="divider" />

      <CartLayoutBody>
        <ModalDescription>
          <span className="font-medium text-lg">Unidades: {itemQuantity}</span>
          <div className="flex bg-white gap-4 border w-fit rounded-md items-center">
            <button
              className="text-black/60 btn bg-transparent hover:bg-transparent border-r"
              onClick={() => setItemQuantity(Math.max(0, itemQuantity - 1))} // Ensure itemQuantity is not set below 0
            >
              <MinusIcon className="h-4" />
            </button>
            <p className="text-black/60 bg-background mx-2">{itemQuantity}</p>
            <button
              className="text-black/60 bg-transparent hover:bg-transparent border-l btn bg-none"
              onClick={() => setItemQuantity(itemQuantity + 1)}
            >
              <PlusIcon className="h-4" />
            </button>
          </div>
        </ModalDescription>
      </CartLayoutBody>
      <CartFooter buttonLabel="Actualizar" action={saveChanges} />
    </CartLayout>
  );
};
