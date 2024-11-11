"use client";
import { MarqueeContainer } from "./container";

interface HomeMarqueeCategoryProps {
  speed: number;
  categories: {
    id: number;
    name: string;
  }[];
}

export const HomeMarqueeCategory = ({
  speed,
  categories,
}: HomeMarqueeCategoryProps) => {
  const items = categories.map((category) => ({
    name: category.name,
    link: `/catalogo/productos?category=${encodeURIComponent(category.name)}`,
  }));

  return <MarqueeContainer items={items} speed={speed} />;
};
