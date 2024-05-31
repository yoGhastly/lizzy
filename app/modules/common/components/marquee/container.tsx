"use client";
import Marquee from "react-fast-marquee";
import { MarqueeCategory } from "./category";

interface Props {
  items: {
    name: string;
    link: string;
  }[];
  speed: number;
}

export const MarqueeContainer: React.FC<Props> = ({ items, speed }) => {
  return (
    <Marquee speed={speed} gradient pauseOnHover style={{ zIndex: 10 }}>
      {items.map(({ link, name }, idx) => (
        <MarqueeCategory key={`${name}-${idx}`} category={{ link, name }} />
      ))}
    </Marquee>
  );
};
