"use client";
import { DecorativeTitle } from "./modules/common/components/decorative-title";
import { HomeMarqueeCategory } from "./modules/common/components/marquee";
import { useState } from "react";
import { ProductsSection } from "./modules/products/layouts/products-section";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { Footer } from "./modules/common/layout/footer";
import { productsMock } from "./constants";

export default function Home() {
  const [speeds] = useState(() => [35, 28, 30]);
  const isSm = useMediaQuery("(max-width: 640px)");
  return (
    <div className="flex flex-col items-center w-full gap-12 md:gap-24 mt-14 md:mt-24 mx-auto px-5">
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
        products={productsMock}
      />

      <ProductsSection
        title="Recién añadidos"
        description={{
          text: "Mantente al día con las novedades y descubre los productos más emocionantes para actualizar tu rutina de cuidado personal.",
        }}
        products={productsMock}
      />

      <Footer />
    </div>
  );
}
