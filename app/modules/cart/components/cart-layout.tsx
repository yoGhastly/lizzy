"use client";
import React, {
  useState,
  useEffect,
  useTransition,
  type PropsWithChildren,
} from "react";
import type { Cart } from "../domain/Cart";
import { type ModalContentType, useModalStore } from "../../modal/modal.store";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { useCartStore } from "../store/cart.store";
import { editItem } from "../actions";
import { EditItem } from "./modal/edit-item";
import { ProductList } from "./modal/product-list";
import { FiltersContent } from "./modal/filters-content";
import { UserFavoriteProducts } from "../../modal/components/user-favorite-products";
import getStripe from "../../stripe/client";

interface Props {
  items?: Cart["items"] | null;
  cart?: Cart | null;
  subcategories?: { name: string; id: number }[];
  allCategories?: {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
  }[];
}

const CartLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  cart,
  items,
  subcategories,
  allCategories,
}) => {
  const { itemQuantity, itemId, setSubtotal } = useCartStore((state) => state);
  const { isModalOpen, modalContentType, toggleModal, setModalContentType } =
    useModalStore((state) => state);
  const [contentType, setContent] = useState<ModalContentType>(null);
  const [quantity, setQuantity] = useState<number>(itemQuantity);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setContent(modalContentType);
    if (!items) return;
    // get item quantity
    const item = items.find((item) => item.product_id === itemId);
    setQuantity(item?.quantity || 0);
  }, [modalContentType, itemQuantity, items]);

  useEffect(() => {
    if (!items || items.length === 0) {
      setSubtotal(0);
      return;
    }

    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setSubtotal(subtotal);
  }, [items]);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 0 && setQuantity(quantity - 1);

  const saveChanges = () => {
    if (!itemId) return;
    startTransition(async () => {
      try {
        await editItem({ product_id: itemId, quantity });
        setModalContentType("cart");
      } catch (error) {
        console.error("Could not update item");
      }
    });
  };

  const handleCheckoutOrder = async () => {
    console.log("handleCheckoutOrder called"); // Debugging statement
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }), // Ensure cart is correctly passed
      });
      console.log("API response:", res); // Debugging statement
      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }
      const data = await res.json();
      console.log("Checkout session data:", data); // Debugging statement
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error("Failed to load stripe");
      }

      await stripe.redirectToCheckout({
        sessionId: data.json.sessionId, // Correctly pass sessionId
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Transition
      show={isModalOpen}
      enter="duration-100 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        onClose={toggleModal}
        className="fixed inset-0 z-[10000] overflow-hidden"
      >
        <div
          className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-end md:p-3">
          <DialogPanel className="w-full max-w-md h-full space-y-4 md:rounded-md border bg-white p-12 shadow-lg flex flex-col">
            {contentType === "cart" ? (
              <ProductList onCheckoutOrder={() => handleCheckoutOrder()}>
                {children}
              </ProductList>
            ) : contentType === "edit" ? (
              <EditItem
                quantity={quantity}
                loading={isPending}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                saveChanges={saveChanges}
              />
            ) : contentType === "filter" ? (
              subcategories &&
              allCategories && (
                <FiltersContent
                  subcategories={subcategories}
                  allCategories={allCategories}
                />
              )
            ) : contentType === "favorites" ? (
              <UserFavoriteProducts />
            ) : (
              <div>Content not found</div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export { CartLayout };
