"use client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  category: {
    name: string;
    link: string;
  };
}

export const MarqueeCategory: React.FC<Props> = ({ category }) => {
  return (
    <Link
      href={category.link}
      className="w-fit flex gap-4 space-x-4 px-3 md:px-14"
    >
      <span className="capitalize text-lg md:text-2xl font-medium">{category.name}</span>
    </Link>
  );
};
