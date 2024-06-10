"use client";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Avatar } from "../../common/components/avatar";
import Image from "next/image";
import { useCartStore } from "../../cart/store/cart.store";
import { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";

export const FlaoatingProductInfo = () => {
  const [hideInfo, setHideInfo] = useState(false);
  const { openCart, toggleCart } = useCartStore((state) => state);

  const addProduct = () => {
    toggleCart();
  };

  useEffect(() => {
    setHideInfo(openCart);

    return () => {
      setHideInfo(false);
    };
  }, [openCart]);

  return (
    <div
      className={cn(
        "sticky bottom-16 mx-auto z-[1000] inset-x-0 max-w-4xl w-full h-10",
        { "opacity-0 transition-opacity ease-in-out duration-100": hideInfo },
      )}
    >
      <section className="bg-white px-4 py-3 md:px-8 md:py-5 drop-shadow-md rounded-md flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Avatar>
            <Image
              src="/next.svg"
              alt="Avatar"
              fill
              className="w-full h-full"
            />
          </Avatar>
          <div className="flex gap-3 items-center">
            <span className="text-xs md:text-lg">
              Delineador de ojos líquido
            </span>
            <div className="bg-red-200 w-1.5 h-1.5 rounded-full" />
          </div>
        </div>
        <button
          onClick={addProduct}
          className="btn bg-novi-400 text-white text-xs md:text-[16px] font-medium hover:bg-novi-400 hover:bg-opacity-90"
        >
          <ShoppingBagIcon className="h-4" />
          <span className="hidden md:block">Agregar</span>
        </button>
      </section>
    </div>
  );
};
