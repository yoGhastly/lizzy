import { Facebook, WhatsApp } from "./modules/common/icons";

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
    link: "https://www.facebook.com/profile.php?id=61566933604824&mibextid=LQQJ4d",
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
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61566933604824&mibextid=LQQJ4d",
    },
    {
      icon: WhatsApp,
      href: "/",
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
