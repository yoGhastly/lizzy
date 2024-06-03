"use client";

import { AnimatePresence } from "framer-motion";
import {
  CanvasRevealEffect,
  Icon,
} from "../common/components/canvas-revea-effect";
import Image from "next/image";
import { cn } from "@/app/utils/cn";

export const CanvasRevealContainerCatalogue = () => {
  return (
    <div className="flex gap-5 w-full mt-9">
      {[
        { label: "Pestañas", imageSrc: "/assets/images/eyelashes.webp" },
        { label: "Uñas", imageSrc: "/assets/images/nails.webp" },
      ].map((category) => (
        <Card
          key={category.label}
          label={category.label}
          imageSrc={category.imageSrc}
        />
      ))}
    </div>
  );
};

function Card({ label, imageSrc }: { label: string; imageSrc: string }) {
  return (
    <div
      className={cn(
        "border border-black/[0.2] group/canvas-card flex items-center justify-center",
        "gray-950dark:border-white/[0.2] w-1/2 mx-auto h-[38rem] relative",
      )}
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-black/50" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-black/50" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-black/50" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-black/50" />
      <AnimatePresence>
        <div className="h-full w-full absolute inset-0 z-40">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black/15 opacity-30"
            colors={[
              [17, 17, 17],
              [245, 221, 146],
              [250, 250, 250],
            ]}
            dotSize={2}
          />
        </div>
      </AnimatePresence>
      <div className="relative z-20 w-full h-full">
        <Image src={imageSrc} alt={label} fill className="object-cover z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="z-50 text-white text-2xl">{label}</h2>
        </div>
      </div>
    </div>
  );
}
