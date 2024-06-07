"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link
      href={`/catalogo/productos/${product.id}`}
      className="flex flex-col gap-2 group overflow-hidden"
    >
      <picture className="relative aspect-[1/1.2] bg-gray-300">
        <Image
          src="/next.svg"
          alt="Product"
          fill
          className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
        />
        <HeartIcon className="absolute bottom-2 right-2 h-6" />
      </picture>
      <section className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <span className="text-[15px]">${product.price}</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((_, idx) => (
            <div key={idx} className="bg-red-500 rounded-full w-1 h-1"></div>
          ))}
        </div>
      </section>
    </Link>
  );
};
