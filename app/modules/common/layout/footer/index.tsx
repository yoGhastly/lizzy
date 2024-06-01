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

export const Footer = () => {
  return (
    <footer className="relative bottom-0 flex flex-col w-full min-h-[600px]">
      <div className="border-b border-b-black/30 w-full flex justify-center items-center min-h-36">
        <Link
          href="#"
          className={cn(
            "uppercase border-2 border-black rounded-xl px-3 md:px-5 py-2.5 md:py-3 font-medium bg-transparent text-black",
            "hover:bg-black hover:text-white cursor-pointer transition-colors duration-200 ease-in-out",
            "text-xs md:text-sm",
          )}
        >
          EXPLORA NUESTRO CATÁLOGO
        </Link>
      </div>

      <section className="w-full min-h-[300px] flex justify-center items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 p-5">
          <LinkSection label="¿Necesitas ayuda?">
            <div className="flex gap-2 items-center">
              <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-xs text-muted-gray" />
              <strong className="text-[11px] md:text-xs text-muted-gray">
                Iniciar chat
              </strong>
              <span className="hidden md:block text-green-500 text-[10px] md:text-xs">
                Disponible
              </span>
              <span className="block md:hidden bg-green-500 rounded-full w-1.5 h-1.5"></span>
            </div>
            <span className="text-muted-gray text-[10px] md:text-xs">
              De lunes a viernes de 00:00 a 00:00.
            </span>

            <div className="flex gap-2 items-center w-full mt-5">
              <PhoneIcon className="hidden md:block w-5 h-5 text-xs text-muted-gray" />
              <strong className="text-[11px] md:text-xs text-muted-gray">
                012 2345 678
              </strong>
              <span className="hidden md:block text-yellow-500 text-[8.3px] md:text-xs">
                Fuera de Servicio
              </span>
              <span className="block md:hidden bg-yellow-500 rounded-full w-1.5 h-1.5"></span>
            </div>
            <span className="text-muted-gray text-[10px] md:text-xs">
              De lunes a viernes de 00:00 a 00:00.
            </span>

            <div className="flex gap-2 items-center w-full mt-5">
              <EnvelopeIcon className="w-5 h-5 text-xs text-muted-gray" />
              <strong className="text-[11px] md:text-xs text-muted-gray">
                Enviar email
              </strong>
            </div>
            <span className="text-muted-gray text-xs">
              De lunes a viernes de 00:00 a 00:00.
            </span>
          </LinkSection>

          <LinkSection label="Ayuda">
            {footerLinks.help.map(({ name, href }) => (
              <Link href={href} key={`${name}-${href}`}>
                <span
                  className={cn(
                    "capitalize text-xs md:text-sm",
                    "hover:text-black/70 hover:underline transition-all duration-100 ease-in-out",
                  )}
                >
                  {name}
                </span>
              </Link>
            ))}
          </LinkSection>

          <LinkSection label="Nosotros">
            {footerLinks.aboutUs.map(({ name, href }) => (
              <Link href={href} key={`${name}-${href}`}>
                <span
                  className={cn(
                    "capitalize text-xs md:text-sm",
                    "hover:text-black/70 hover:underline transition-all duration-100 ease-in-out",
                  )}
                >
                  {name}
                </span>
              </Link>
            ))}
          </LinkSection>

          <LinkSection label="Síguenos">
            <div className="flex gap-5">
              {footerLinks.socials.map(({ icon: Icon, href }) => (
                <Link href={href} key={href} className="w-6 h-6">
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
