"use client";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export const ProductCart = () => {
  return (
    <div className="flex gap-1">
      <div className="min-h-full w-32 bg-[#FAFAFA]"></div>
      <section className="flex flex-col w-full aspect-[1/0.45] justify-between">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full items-center">
            <span className="uppercase font-semibold text-sm">MXN 299.00</span>
            <div className="flex gap-2">
              <PencilIcon className="h-4 text-black/60" />
              <div className="h-4 w-[2px] bg-muted-gray/50"></div>
              <TrashIcon className="h-4 text-black/60" />
            </div>
          </div>
          <p className="text-black/50 text-xs">Product description</p>
        </div>
        <p className="text-xs font-medium">Mover a favoritos</p>
      </section>
    </div>
  );
};
