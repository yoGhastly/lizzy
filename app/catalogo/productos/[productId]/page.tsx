"use client";

import { ProductBreadcrumb } from "@/app/modules/products/components/product-breadcrumb";
import { TruckIcon } from "@heroicons/react/16/solid";
import { BuildingStorefrontIcon, HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div className="mt-14 mx-auto flex flex-col w-full gap-2 px-5">
      <header className="w-full">
        <ProductBreadcrumb productCategory="Pestañas" />
      </header>

      <main className="flex flex-col md:flex-row gap-4">
        <section className="basis-auto w-full h-full border">
          <div className="aspect-square md:aspect-[1/0.9] border border-black/5 relative group overflow-hidden">
            <Image
              src="/next.svg"
              alt="Porduct"
              fill
              className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </section>

        <section className="p-2 basis-1/2">
          <div className="flex flex-col gap-3">
            <section className="flex flex-col gap-12">
              <div className="header-container flex flex-col gap-2">
                <div className="product_header flex  justify-between items-center">
                  <p className="font-bold text-[16px]">
                    Small precision sponge
                  </p>
                  <HeartIcon className="h-6" />
                </div>

                <div className="product_price_variants flex flex-col gap-4">
                  <p className="text-xl">$299.00</p>
                  <div className="flex gap-2">
                    {["green", "red", "blue"].map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="btn bg-novi-400 text-white text-[16px] font-medium hover:bg-novi-400 hover:bg-opacity-90">
                  <ShoppingBagIcon className="h-4" />
                  Agregar
                </button>

                <div className="flex flex-col gap-0">
                  <button className="btn btn-outline justify-start text-muted-gray rounded-b-none hover:bg-white hover:text-muted-gray border border-muted-gray/50 rounded-md">
                    <BuildingStorefrontIcon className="h-4" />
                    Recogida en tienda
                    <span className="text-[10px] text-green-500 uppercase">
                      Gratis
                    </span>
                  </button>

                  <button className="btn btn-outline justify-start text-muted-gray hover:bg-white hover:text-muted-gray rounded-t-none border border-muted-gray/50 rounded-md">
                    <TruckIcon className="h-4" />
                    Envío estándar
                    <span className="text-[10px] text-muted-gray/70">
                      Calculado en checkout
                    </span>
                  </button>
                </div>
              </div>

              <div className="border-t flex flex-col gap-3 border-t-muted-gray/50 p-5">
                <p className="text-novi-950 font-semibold">Descripción</p>
                <p className="mx-auto text-muted-gray">
                  Commodo Lorem nisi tempor elit excepteur minim ad ut in id
                  adipisicing laborum ad dolore sunt. Quis duis fugiat sit
                  pariatur mollit ad aliquip velit fugiat id. Excepteur aute
                  aute aliqua pariatur incididunt anim commodo voluptate
                  consectetur. In minim veniam id enim proident cupidatat sunt
                  laborum aliquip. Et officia aliqua sunt velit in quis magna
                  amet esse nisi sint magna aute labore irure.
                </p>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
