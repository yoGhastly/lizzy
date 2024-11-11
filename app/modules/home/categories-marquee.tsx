"use client";
import { useState, useEffect } from "react";
import { DecorativeTitle } from "../common/components/decorative-title";
import { HomeMarqueeCategory } from "../common/components/marquee";

export const CategoriesMarquee = ({
  categories,
}: {
  categories: { id: number; name: string }[];
}) => {
  const [speeds] = useState(() => [35, 23, 30]);
  const [shuffledCategories, setShuffledCategories] = useState(categories);

  useEffect(() => {
    const shuffleArray = (array: { id: number; name: string }[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setShuffledCategories(shuffleArray(categories));
  }, [categories]);

  return (
    <header className="w-full flex flex-col gap-12 md:gap-24 justify-center">
      <DecorativeTitle>Descubre Nuestras Categorías</DecorativeTitle>
      <div className="flex flex-col gap-4">
        {speeds.map((speed, idx) => (
          <HomeMarqueeCategory
            key={idx}
            speed={speed}
            categories={shuffledCategories}
          />
        ))}
      </div>
    </header>
  );
};
