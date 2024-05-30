"use client";
import Link from "next/link";
import { DecorativeTitle } from "./modules/common/components/decorative-title";
import { HomeMarqueeCategory } from "./modules/common/components/marquee";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import { cn } from "./utils/cn";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full gap-24 mt-24 mx-auto px-10 md:px-0">
      <header className="w-full flex flex-col gap-24 justify-center">
        <DecorativeTitle>Descubre Nuestras Categorías</DecorativeTitle>
        <div className="flex flex-col gap-4">
          {[50, 55, 45].map((speed, idx) => (
            <HomeMarqueeCategory key={idx} speed={speed} />
          ))}
        </div>
      </header>

      <section className="flex flex-col w-full">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <DecorativeTitle>Favoritos de los Clientes</DecorativeTitle>
            <Link
              href="#"
              className="flex text-sm items-center justify-center gap-5"
            >
              Ver mas
              <ArrowRightIcon className="h-4 text-novi-950" />
            </Link>
          </div>
          <p className="text-base text-sm max-w-2xl">
            Descubre los productos más queridos por nuestros clientes. Estos
            artículos han sido probados y{" "}
            <span
              className={cn(
                "bg-gradient-to-r from-[#22190D] via-novi-primary to-[#524D44]",
                "text-transparent bg-clip-text",
              )}
            >
              amados por personas como tú.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
