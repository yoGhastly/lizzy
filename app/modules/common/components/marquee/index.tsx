"use client";
import { useState } from "react";
import { MarqueeContainer } from "./container";

export const HomeMarqueeCategory = ({ speed }: { speed: number }) => {
  const [items] = useState(() => [
    { name: "Categoría 1", link: "#" },
    { name: "Categoría 2", link: "#" },
    { name: "Categoría 3", link: "#" },
    { name: "Categoría 4", link: "#" },
    { name: "Categoría 5", link: "#" },
    { name: "Categoría 6", link: "#" },
  ]);

  return <MarqueeContainer items={items} speed={speed} />;
};
