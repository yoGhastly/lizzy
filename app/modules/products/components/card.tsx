"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../domain/Product";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link
      href={`/catalogo/productos/${product.id}`}
      className="flex flex-col gap-2 group overflow-hidden max-w-[200px]"
    >
      <picture className="relative aspect-[1/1.2] bg-[#fafafa]">
        <Image
          className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
          src={product.images[0]}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAA=="
          alt="Product"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          fill
        />
      </picture>
      <section className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium capitalize">{product.name}</h3>
          <span className="text-[15px]">${product.price / 100} MXN</span>
        </div>
      </section>
    </Link>
  );
};
