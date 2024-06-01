import { Facebook, Instagram, Twitter } from "./modules/common/icons";

export const navItems = [
  {
    name: "Inicio",
    link: "/",
  },
  {
    name: "Catalogo",
    link: "/catalogo",
    attractive: true,
  },
  {
    name: "Conocenos",
    link: "/nosotros",
  },
];

export const footerLinks = {
  help: [
    {
      name: "Comprar online",
      href: "#",
    },
    {
      name: "Pago",
      href: "#",
    },
    {
      name: "Envío",
      href: "#",
    },
  ],
  aboutUs: [
    {
      name: "Sobre Nosotros",
      href: "#",
    },
    {
      name: "Política de privacidad",
      href: "#",
    },
    {
      name: "Política de envio",
      href: "#",
    },
  ],
  socials: [
    {
      icon: Instagram,
      href: "#",
    },
    {
      icon: Facebook,
      href: "#",
    },
    {
      icon: Twitter,
      href: "#",
    },
  ],
};
