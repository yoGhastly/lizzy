"use client";

import { useState } from "react";
import { DecorativeTitle } from "../common/components/decorative-title";
import { HomeMarqueeCategory } from "../common/components/marquee";

export const Header = () => {
  const [speeds] = useState(() => [35, 28, 30]);
  return (
    <header className="w-full flex flex-col gap-12 md:gap-24 justify-center">
      <DecorativeTitle>Descubre Nuestras Categorías</DecorativeTitle>
      <div className="flex flex-col gap-4">
        {speeds.map((speed, idx) => (
          <HomeMarqueeCategory key={idx} speed={speed} />
        ))}
      </div>
    </header>
  );
};
