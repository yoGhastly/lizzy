"use client";
import React from "react";
import { cn } from "../../../utils/cn";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { AttractiveText } from "./attractive-text";
import { UserIcon } from "@heroicons/react/16/solid";
import { NavLinks } from "./navbar/nav-links";
import Image from "next/image";

interface Props {
  navItems: {
    name: string;
    attractive?: boolean;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}

export const FloatingNavbar: React.FC<Props> = ({ navItems, className }) => {
  return (
    <div className={cn("flex gap-2 max-w-fit sticky top-5 inset-x-0 mx-auto")}>
      <Link
        href="/"
        className={cn(
          "border border-transparent rounded-full flex items-center justify-center",
          "bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          "z-[5000] p-2.5 px-5 items-center",
        )}
      >
        <div className="relative w-16 h-full m-auto">
          <Image
            src="/assets/images/novi-logo.svg"
            alt="Novi"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      <div
        className={cn(
          "flex",
          "border border-transparent rounded-full",
          "bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
          "z-[5000] px-7 py-2.5  items-center space-x-4",
          className,
        )}
      >
        <NavLinks items={navItems} />
        <button className="flex justify-center items-center bg-[#737373]/40 rounded-full w-10 h-10">
          <MagnifyingGlassIcon className="h-6 text-[#fafafa]" />
        </button>
        <span className={cn("rounded-none w-[0.05rem] h-4 bg-muted-gray/30")} />
        <AttractiveText
          element={<ShoppingCartIcon className="h-6 text-muted-gray" />}
          active={false}
        />
        <span className={cn("rounded-none w-[0.05rem] h-4 bg-muted-gray/30")} />
        <UserIcon className="h-6 text-muted-gray" />
      </div>
    </div>
  );
};