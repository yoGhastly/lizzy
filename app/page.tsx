"use client";
import Link from "next/link";
import { DecorativeTitle } from "./modules/common/components/decorative-title";
import { HomeMarqueeCategory } from "./modules/common/components/marquee";
import { cn } from "./utils/cn";
import { useState } from "react";
import { ProductsSection } from "./modules/products/layouts/products-section";
import { useMediaQuery } from "./hooks/useMediaQuery";

export default function Home() {
  const [speeds] = useState(() => [45, 50, 55]);
  const isSm = useMediaQuery("(max-width: 640px)");
  return (
    <div className="flex flex-col items-center w-full gap-12 md:gap-24 mt-24 mx-auto px-4 md:px-0">
      <header className="w-full flex flex-col gap-12 md:gap-24 justify-center">
        <DecorativeTitle>Descubre Nuestras Categorías</DecorativeTitle>
        <div className="flex flex-col gap-4">
          {speeds.map((speed, idx) => (
            <HomeMarqueeCategory key={idx} speed={speed} />
          ))}
        </div>
      </header>

      <ProductsSection
        title="Favoritos de los Clientes"
        description={{
          text: "Descubre los productos más queridos por nuestros clientes. Estos artículos han sido probados y",
          gradientText: "amados por personas como tú.",
        }}
        products={isSm ? [0, 1, 2, 3] : [0, 1, 2, 3, 4]}
      />

      <ProductsSection
        title="Recién añadidos"
        description={{
          text: "Mantente al día con las novedades y descubre los productos más emocionantes para actualizar tu rutina de cuidado personal.",
        }}
        products={isSm ? [0, 1, 2, 3] : [0, 1, 2, 3, 4]}
      />

      <footer className="flex flex-col w-full min-h-[600px]">
        <div className="border-b border-b-black/30 w-full flex justify-center items-center min-h-36">
          <Link
            href="#"
            className={cn(
              "uppercase border-2 border-black rounded-xl px-3 md:px-5 py-2.5 md:py-3 font-medium bg-transparent text-black",
              "hover:bg-black hover:text-white cursor-pointer transition-colors duration-200 ease-in-out",
              "text-xs md:text-sm",
            )}
          >
            EXPLORA NUESTRO CATÁLOGO
          </Link>
        </div>

        <section className="w-full min-h-[300px] flex justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            <div className="flex flex-col">
              <strong className="text-xs">¿Necesitas ayuda?</strong>
            </div>

            <div className="flex flex-col">
              <strong className="text-xs">Ayuda</strong>
            </div>

            <div className="flex flex-col">
              <strong className="text-xs">Nosotros</strong>
            </div>

            <div className="flex flex-col">
              <strong className="text-xs">Síguenos</strong>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}
