"use client";
import Link from "next/link";
import { AttractiveText } from "../attractive-text";
import { cn } from "../../../../utils/cn";
import { NavLink } from "./types";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { useCatalogueStore } from "@/app/modules/catalogue/store/catalogue.store";
import { usePathname } from "next/navigation";

export const NavLinks = ({ items }: { items: NavLink[] }) => {
  const pathName = usePathname();
  const isSm = useMediaQuery("(max-width: 640px)");
  const navLinks = isSm ? items.slice(1, 3) : items;
  const [links] = useState(() => navLinks);

  const setIsCatalogueRoute = useCatalogueStore(
    (state) => state.setIsCatalogueRoute,
  );

  useEffect(() => {
    const isCatalogueRoute = pathName.includes("/catalogo");
    setIsCatalogueRoute(isCatalogueRoute);

    return () => setIsCatalogueRoute(false);
  }, [pathName]);

  const isCatalogueRoute = useCatalogueStore((state) => state.isCatalogueRoute);

  const attractive = !isSm && !isCatalogueRoute;

  return (
    <div className="flex gap-3 md:gap-9 items-center">
      {links.map((navItem, idx: number) => (
        <Link
          key={`${navItem.link}-${idx}`}
          href={navItem.link}
          className={cn(
            "flex gap-3 md:gap-9 items-center text-muted-gray text-xs md:text-sm",
            "hover:text-gray-700",
            "transition-colors duration-200 ease-in-out",
          )}
        >
          {navItem.attractive ? (
            <AttractiveText element={navItem.name} active={attractive} />
          ) : (
            <span>{navItem.name}</span>
          )}
          <span
            className={cn(
              "bg-muted-gray rounded-full w-1 h-1 hidden md:block",
              {
                "rounded-none w-[0.05rem] h-4 bg-muted-gray/30":
                  idx === items.length - 1,
              },
            )}
          />
        </Link>
      ))}
    </div>
  );
};
