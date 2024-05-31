import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const ProductCard = () => {
  return (
    <div className="flex flex-col gap-2">
      <picture className="relative aspect-[1/1.2] bg-gray-300">
        <Image src="/next.svg" alt="Product" fill className="object-contain" />
        <HeartIcon className="absolute bottom-2 right-2 h-6" />
      </picture>
      <section className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Producto</h3>
          <span className="text-[15px]">$299.00</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((_, idx) => (
            <div key={idx} className="bg-red-500 rounded-full w-1 h-1"></div>
          ))}
        </div>
      </section>
    </div>
  );
};
