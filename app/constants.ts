import { Facebook, Instagram, Twitter } from "./modules/common/icons";
import { Product } from "./modules/products/domain/Product";

export const navItems = [
  {
    name: "Inicio",
    link: "/",
  },
  {
    name: "Catálogo",
    link: "/catalogo",
    attractive: true,
  },
  {
    name: "Conócenos",
    link: "/nosotros",
  },
];

export const footerLinks = {
  help: [
    {
      name: "Comprar online",
      href: "/hola",
    },
    {
      name: "Pago",
      href: "/hola2",
    },
    {
      name: "Envío",
      href: "/hola3",
    },
  ],
  aboutUs: [
    {
      name: "Sobre Nosotros",
      href: "/hola4",
    },
    {
      name: "Política de privacidad",
      href: "/hola5",
    },
    {
      name: "Política de envio",
      href: "/hola6",
    },
  ],
  socials: [
    {
      icon: Instagram,
      href: "/hola7",
    },
    {
      icon: Facebook,
      href: "/hola8",
    },
    {
      icon: Twitter,
      href: "/hola9",
    },
  ],
};

type CategoryKey =
  | "ver todo"
  | "pestañas"
  | "uñas"
  | "option1"
  | "option2"
  | "option3";

const categoryMap: Record<CategoryKey, string> = {
  "ver todo": "Ver Todo",
  pestañas: "Pestañas",
  uñas: "Uñas",
  option1: "Option1",
  option2: "Option2",
  option3: "Option3",
};

export function validateCategory(category: string): string {
  const lowerCategory = category.toLowerCase() as CategoryKey;
  return categoryMap[lowerCategory] || "Ver Todo";
}
