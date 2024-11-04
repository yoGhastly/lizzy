"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const ProductBreadcrumb = ({
  productCategory,
}: {
  productCategory: string;
}) => {
  return (
    <div className="text-sm breadcrumbs text-muted-gray">
      <ul>
        <li>
          <Link href="/catalogo/productos?category=all" className="flex gap-2">
            <ArrowLeftIcon className="h-4" />
            Volver al Catálogo
          </Link>
        </li>
        <li>
          <span className="first-letter:capitalize font-semibold">
            {productCategory}
          </span>
        </li>
      </ul>
    </div>
  );
};
