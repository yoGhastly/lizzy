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

export const seeAllMockData = [
  {
    id: 1,
    name: "Option1",
    price: 100,
  },
  {
    id: 2,
    name: "Option2",
  },
  {
    id: 3,
    name: "Option3",
  },
];

export const mockEyelashesOptions = [
  {
    id: 1,
    name: "Option1Eyelashes",
    price: 100,
  },
  {
    id: 2,
    name: "Option2Eyelashes",
  },
  {
    id: 3,
    name: "Option3Eyelashes",
  },
];

export const mockNailsOptions = [
  {
    id: 1,
    name: "Option1Nails",
    price: 100,
  },
  {
    id: 2,
    name: "Option2Nails",
  },
  {
    id: 3,
    name: "Option3Nails",
  },
];

export const productsMock = [
  {
    id: 1,
    name: "Option1",
    price: 100,
  },
  {
    id: 2,
    name: "Option2",
    price: 100,
  },
  {
    id: 3,
    name: "Option3",
    price: 100,
  },
  {
    id: 4,
    name: "Option4",
    price: 100,
  },
  {
    id: 5,
    name: "Option5",
    price: 100,
  },
  {
    id: 6,
    name: "Option6",
    price: 100,
  },
];
