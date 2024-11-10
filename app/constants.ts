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

export function validateCategory(
  categoryOrSubcategory: string,
  categories: { name: string; subcategories: { name: string }[] }[],
): string {
  const lowerCategory = categoryOrSubcategory.toLowerCase();

  // Check if it matches a category first
  const validCategory = categories.find(
    (cat) => cat.name.toLowerCase() === lowerCategory,
  );

  if (validCategory) {
    return validCategory.name; // Return the matching category
  }

  // If no valid category is found, check if it matches a subcategory
  for (const category of categories) {
    const validSubcategory = category.subcategories.find(
      (subcat) => subcat.name.toLowerCase() === lowerCategory,
    );
    if (validSubcategory) {
      return validSubcategory.name; // Return the matching subcategory
    }
  }

  // Fallback to "Ver Todo" if no valid category or subcategory is found
  return "Ver Todo";
}
