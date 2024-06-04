"use client";

import { AnimatePresence } from "framer-motion";
import {
  CanvasRevealEffect,
  Icon,
} from "../common/components/canvas-revea-effect";
import Image from "next/image";
import { cn } from "@/app/utils/cn";
import Link from "next/link";

export const CanvasRevealContainerCatalogue = () => {
  return (
    <div className="flex gap-3 md:gap-5 w-full mt-9">
      {[
        { label: "Pestañas", imageSrc: "/assets/images/eyelashes.webp" },
        { label: "Uñas", imageSrc: "/assets/images/nails.webp" },
      ].map((category) => (
        <Link
          className="w-1/2 h-[15rem] md:h-[38rem]"
          key={category.label}
          href={`/catalogo/productos?category=${encodeURIComponent(category.label.toLowerCase())}`}
        >
          <Card label={category.label} imageSrc={category.imageSrc} />
        </Link>
      ))}
    </div>
  );
};

function Card({ label, imageSrc }: { label: string; imageSrc: string }) {
  return (
    <div
      className={cn(
        "border border-black/[0.2] group/canvas-card flex items-center justify-center",
        "gray-950dark:border-white/[0.2] w-full mx-auto h-full md:h-[38rem] relative",
      )}
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-black/50" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-black/50" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-black/50" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-black/50" />
      <AnimatePresence>
        <div className="h-full w-full absolute inset-0 z-20">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black/50 opacity-50"
            colors={[
              [235, 177, 52],
              [235, 177, 52],
              [250, 250, 250],
            ]}
            dotSize={2}
          />
        </div>
      </AnimatePresence>
      <div className="relative w-full h-full">
        <Image src={imageSrc} alt={label} fill className="object-cover z-10" />
        <div className="absolute bottom-24 w-full flex items-center justify-center">
          <h2 className="text-white z-50 text-xl md:text-4xl text-center select-none">
            {label}
          </h2>
        </div>
      </div>
    </div>
  );
}
