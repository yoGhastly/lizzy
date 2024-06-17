"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteItem } from "../actions";
import { CartItem } from "../domain/Cart";
import { useCartStore } from "../store/cart.store";

export const DeleteItemButton = ({
  item,
}: {
  item: Pick<CartItem, "product_id" | "variant_id">;
}) => {
  const { setItemQuantity, toggleCart } = useCartStore((state) => state);

  function removeItem() {
    deleteItem(item);
    setItemQuantity(0);
    toggleCart();
  }

  return (
    <button onClick={removeItem} title="Borrar Producto">
      <TrashIcon className="h-4 text-black/60" />
    </button>
  );
};
