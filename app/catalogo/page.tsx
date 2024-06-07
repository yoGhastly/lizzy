"use client";
import { DecorativeTitle } from "../modules/common/components/decorative-title";
import { HighlightWords } from "../modules/common/components/highlight-words";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Footer } from "../modules/common/layout/footer";
import Link from "next/link";
import { cn } from "../utils/cn";
import { CanvasRevealContainerCatalogue } from "../modules/catalogue/canvas-reveal-container";

export default function Catalogue() {
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
    <section className="mt-14 px-5 md:px-2">
      <div className="flex flex-col gap-4">
        <DecorativeTitle decorative={false}>Catálogo</DecorativeTitle>
        <HighlightWords
          text={text.pageDescription}
          highlights={wordsToHighlight.pageHighlights}
        />
        <CanvasRevealContainerCatalogue />
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5 items-start md:items-center mt-6">
        <div className="max-w-sm">
          <HighlightWords
            text={text.catalogueSectionDescription}
            highlights={wordsToHighlight.catalogueSectionHightlights}
            highlightClassname="text-black text-sm md:text-lg font-medium"
          />
        </div>
        <Link
          href="/catalogo/productos?category=all"
          className={cn(
            "flex gap-2 justify-center",
            "hover:bg-novi-500 transition-colors duration-100",
            "font-semibold items-center text-white text-sm md:text-[16px] bg-novi-400 shadow-inner dropshadow-sm",
            "md:px-5 px-3 py-2 md:py-3 rounded-full",
          )}
        >
          Explorar <ArrowRightIcon className="h-5" />
        </Link>
      </div>
      <Footer hideSeeCatalogueButton />
    </section>
  );
}
