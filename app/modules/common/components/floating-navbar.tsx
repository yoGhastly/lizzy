"use client";
import React, { Suspense } from "react";
import { cn } from "../../../utils/cn";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { AttractiveText } from "./attractive-text";
import { UserIcon } from "@heroicons/react/16/solid";
import { NavLinks } from "./navbar/nav-links";
import { Logo } from "../icons";
import { AccountDropDownMenu } from "./dropdown-menu";
import { useCartStore } from "../../cart/store/cart.store";

interface Props {
  navItems: {
    name: string;
    attractive?: boolean;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  cart: JSX.Element;
}

export const FloatingNavbar: React.FC<Props> = ({
  navItems,
  className,
  cart,
}) => {
  const { itemQuantity } = useCartStore();
  return (
    <div
      className={cn("flex gap-2 max-w-fit sticky top-5 mx-auto z-50 inset-x-0")}
    >
      <Link
        href="/"
        className={cn(
          "border border-transparent rounded-full flex items-center justify-center",
          "bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          "py-1.5 md:py-2.5 px-2 md:px-5 items-center",
        )}
      >
        <div className="relative w-10 md:w-16 h-full m-auto">
          <Logo />
        </div>
      </Link>

      <div
        className={cn(
          "flex",
          "border border-transparent rounded-full",
          "bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          "z-50 px-4 md:px-7 py-1.5 md:py-2.5 items-center space-x-4",
          className,
        )}
      >
        <NavLinks items={navItems} />
        <button className="flex justify-center items-center bg-[#737373]/40 rounded-full w-8 h-8 md:w-10 md:h-10">
          <MagnifyingGlassIcon className="h-5 md:h-6 text-[#fafafa]" />
        </button>
        <span
          className={cn(
            "hidden md:block rounded-none w-[0.05rem] h-4 bg-muted-gray/30",
          )}
        />
        <Suspense
          fallback={<ShoppingCartIcon className="h-4 text-muted-gray" />}
        >
          <AttractiveText element={cart} active={itemQuantity > 0} />
        </Suspense>
        <span
          className={cn(
            "hidden md:block rounded-none w-[0.05rem] h-4 bg-muted-gray/30",
          )}
        />
        <AccountDropDownMenu
          triggerElement={<UserIcon className="h-5 md:h-6 text-muted-gray" />}
        />
      </div>
    </div>
  );
};
