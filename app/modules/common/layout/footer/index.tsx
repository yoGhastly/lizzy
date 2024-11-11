"use client";
import { cn } from "../../../../utils/cn";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { LinkSection } from "./link-section";
import { footerLinks } from "@/app/constants";

export const Footer = ({
  hideSeeCatalogueButton = false,
}: {
  hideSeeCatalogueButton?: boolean;
}) => {
  return (
    <footer className="relative bottom-0 flex flex-col w-full min-h-[600px]">
      <div className="border-b border-b-black/30 w-full flex justify-center items-center min-h-36">
        {!hideSeeCatalogueButton && (
          <Link
            href="/catalogo"
            className={cn(
              "uppercase border-2 border-black rounded-xl px-3 md:px-5 py-2.5 md:py-3 font-medium bg-transparent text-black",
              "hover:bg-black hover:text-white cursor-pointer transition-colors duration-200 ease-in-out",
              "text-xs md:text-sm",
            )}
          >
            EXPLORA NUESTRO CATÁLOGO
          </Link>
        )}
      </div>

      <section className="w-full min-h-[300px] flex justify-center items-center">
        <div className="grid grid-cols-2 gap-8 md:gap-16 p-5 w-full">
          <LinkSection label="Síguenos en redes sociales">
            <p className="w-full text-sm my-2">
              ¡Síguenos en nuestras redes sociales para mantenerte al día con
              las últimas novedades, ofertas exclusivas y mucho más!{" "}
            </p>
            <p className="w-full text-sm my-2">
              Únete a nuestra comunidad y sé el primero en enterarte de todo lo
              que tenemos para ti.
            </p>
            <div className="flex gap-5 mt-3">
              {footerLinks.socials.map(({ icon: Icon, href }) => (
                <Link href={href} key={href} className="w-8 h-8">
                  <Icon />
                </Link>
              ))}
            </div>
          </LinkSection>
        </div>
      </section>
    </footer>
  );
};
