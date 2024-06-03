"use client";

import { useState } from "react";
import { DecorativeTitle } from "../modules/common/components/decorative-title";
import { HighlightWords } from "../modules/common/components/highlight-words";
import { AnimatePresence } from "framer-motion";
import {
  CanvasRevealEffect,
  Icon,
} from "../modules/common/components/canvas-revea-effect";
import Image from "next/image";
import { CanvasRevealContainerCatalogue } from "../modules/catalogue/canvas-reveal-container";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Footer } from "../modules/common/layout/footer";

export default function Catalogue() {
  const [hovered, setHovered] = useState(false);
  const text = {
    pageDescription: `
    Explora nuestro catálogo completo y descubre una amplia gama de
    productos para realzar tu belleza. Desde pestañas que resaltan tu
    mirada hasta esmaltes y accesorios para uñas que expresan tu estilo
    único, tenemos todo lo que necesitas para lucir impecable de pies a
    cabeza. Sumérgete en nuestro mundo de belleza y encuentra inspiración
    para tu próxima transformación
  `,
    catalogueSectionDescription: `
    ¿Listo para descubrir más? Explora nuestra colección completa de productos de belleza para 
    encontrar todo lo que necesitas para resaltar tu estilo único.
  `,
  };
  const wordsToHighlight = {
    pageHighlights: [
      "catálogo",
      "completo",
      "pestañas",
      "accesorios para uñas",
    ],
    catalogueSectionHightlights: ["¿Listo para descubrir más?"],
  };

  return (
    <section className="mt-14">
      <div className="flex flex-col gap-4">
        <DecorativeTitle decorative={false}>Catálogo</DecorativeTitle>
        <HighlightWords
          text={text.pageDescription}
          highlights={wordsToHighlight.pageHighlights}
        />
        <CanvasRevealContainerCatalogue />
        <div className="flex justify-between items-center">
          <div className="max-w-sm">
            <HighlightWords
              text={text.catalogueSectionDescription}
              highlights={wordsToHighlight.catalogueSectionHightlights}
              highlightClassname="text-black text-lg font-medium"
            />
          </div>
          <button className="flex gap-2 justify-center font-semibold items-center text-white  bg-novi-400 shadow-inner dropshadow-sm px-5 py-3 rounded-full">
            Explorar <ArrowRightIcon className="h-5" />
          </button>
        </div>
      </div>
      <Footer hideSeeCatalogueButton />
    </section>
  );
}
