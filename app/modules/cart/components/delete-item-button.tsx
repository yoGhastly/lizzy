"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteItem } from "../actions";
import { CartItem } from "../domain/Cart";

export const DeleteItemButton = ({
  item,
}: {
  item: Pick<CartItem, "product_id" | "variant_id">;
}) => {
  return (
    <button onClick={() => deleteItem(item)} title="Borrar Producto">
      <TrashIcon className="h-4 text-black/60" />
    </button>
  );
};
