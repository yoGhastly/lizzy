"use client";

import { useState } from "react";
import { DecorativeTitle } from "../modules/common/components/decorative-title";
import { HighlightWords } from "../modules/common/components/highlight-words";
import { AnimatePresence, motion } from "framer-motion";
import {
  CanvasRevealEffect,
  Icon,
} from "../modules/common/components/canvas-revea-effect";

export default function Catalogue() {
  const [hovered, setHovered] = useState(false);
  const text = `
    Explora nuestro catálogo completo y descubre una amplia gama de
    productos para realzar tu belleza. Desde pestañas que resaltan tu
    mirada hasta esmaltes y accesorios para uñas que expresan tu estilo
    único, tenemos todo lo que necesitas para lucir impecable de pies a
    cabeza. Sumérgete en nuestro mundo de belleza y encuentra inspiración
    para tu próxima transformación
  `;
  const wordsToHighlight = [
    "catálogo",
    "completo",
    "pestañas",
    "accesorios para uñas",
  ];
  return (
    <section className="mt-24">
      <div className="flex flex-col gap-4">
        <DecorativeTitle decorative={false}>Catálogo</DecorativeTitle>
        <HighlightWords text={text} highlights={wordsToHighlight} />
      </div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative"
      >
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full w-full absolute inset-0"
            >
              Children
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20">
          <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
            Icon
          </div>
          <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
            Title
          </h2>
        </div>
      </div>
    </section>
  );
}
