"use client";

import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { DecorativeTitle } from "../../common/components/decorative-title";
import { type LastOrder as LastOrderInterface } from "../../orders/domain/Order";
import { cn } from "@/app/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface Props {
  order: LastOrderInterface | null;
}

export const LastOrder: React.FC<Props> = ({ order }) => {
  const items = order?.items || [];

  if (!order) {
    return null;
  }

  return (
    <section className="flex flex-col gap-10 w-full md:px-10">
      <DecorativeTitle decorative={false} className="capitalize">
        última compra
      </DecorativeTitle>

      <div className="flex relative justify-center items-center">
        <div className="relative flex -space-x-[20px] md:-space-x-[50px]">
          {items.length > 1 ? (
            <>
              <div
                className={cn(
                  "bg-white border rounded-xl drop-shadow-sm w-[120px] md:w-[200px] z-20 h-[130px] md:h-[200px] -rotate-[10deg] relative",
                )}
              >
                <Image
                  src={items[0] as string}
                  alt="Product"
                  className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  fill
                />
              </div>
              <div className="bg-white border rounded-xl drop-shadow-sm w-[120px] md:w-[200px] z-10 h-[130px] md:h-[200px]">
                <Image
                  src={items[1] as string}
                  alt="Product"
                  className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  fill
                />
              </div>
              {items.length > 2 && (
                <div className="bg-white border rounded-xl drop-shadow-sm w-[120px] md:w-[200px] z-20 h-[130px] md:h-[200px] rotate-[10deg]">
                  <Image
                    src={items[2] as string}
                    alt="Product"
                    className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    fill
                  />
                </div>
              )}
            </>
          ) : (
            <div className="bg-white border rounded-xl drop-shadow-sm w-[120px] md:w-[200px] z-10 h-[130px] md:h-[200px]">
              <Image
                src={items[0] as string}
                alt="Product"
                className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                fill
              />
            </div>
          )}
        </div>
        <Link
          href={`/mis-pedidos/${order.id}`}
          className="btn absolute z-30 btn-circle bg-white border border-novi-primary hover:bg-novi-500 group"
        >
          <ArrowUpRightIcon className="h-4 text-novi-500 group-hover:text-white" />
        </Link>

        {items.length > 3 && (
          <button className="btn btn-sm md:btn-md absolute top-0 right-0 z-30 btn-circle bg-muted-gray/60 hover:bg-muted-gray/60 pointer-events-none">
            <p className="text-white font-semibold">+{items.length - 3}</p>
          </button>
        )}
      </div>
    </section>
  );
};
