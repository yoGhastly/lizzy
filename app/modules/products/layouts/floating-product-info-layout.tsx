"use client";

import { cn } from "@/app/utils/cn";
import { useCartStore } from "../../cart/store/cart.store";
import { PropsWithChildren, useEffect, useState } from "react";

export const FloatingProductInfoLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [hideInfo, setHideInfo] = useState(false);
  const { openCart } = useCartStore((state) => state);

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
      {children}
    </div>
  );
};
