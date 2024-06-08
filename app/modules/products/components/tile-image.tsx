"use client";

import Image from "next/image";

export const TileImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="aspect-[1/1.4] md:aspect-[1/0.9] border border-black/5 relative group overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
      />
    </div>
  );
};
