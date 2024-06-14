"use client";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "../store/cart.store";

export const EditItemButton = ({ productId }: { productId: number }) => {
  const { setModalContentType, setItemId, modalContentType } = useCartStore(
    (state) => state,
  );

  console.log(modalContentType);

  function changeModalContentType() {
    if (modalContentType === "edit") return;
    setModalContentType("edit");
    setItemId(productId);
  }

  return (
    <button onClick={changeModalContentType}>
      <PencilIcon className="h-4 text-black/60" />
    </button>
  );
};
