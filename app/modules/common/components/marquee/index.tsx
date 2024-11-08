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
    link: `#${category.name}-${category.id}`,
  }));

  return <MarqueeContainer items={items} speed={speed} />;
};
