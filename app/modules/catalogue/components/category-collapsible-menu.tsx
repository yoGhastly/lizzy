"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/app/utils/cn";
import { validateCategory } from "@/app/constants";

interface Props {
  category: string;
  categories: {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
  }[];
}

export const CategoryCollapsibleMenu: React.FC<Props> = ({
  category,
  categories,
}) => {
  const router = useRouter();

  const allCategories = [
    { id: 0, name: "Ver Todo", subcategories: [] },
    ...categories,
  ];

  const handleCategoryClick = (categoryName: string) => {
    const validatedCategory = validateCategory(categoryName, allCategories);
    router.push(
      `/catalogo/productos?category=${encodeURIComponent(validatedCategory)}`,
      { scroll: false },
    );
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    router.push(
      `/catalogo/productos?category=${encodeURIComponent(subcategoryName)}`,
      { scroll: false },
    );
  };

  return (
    <ul className="menu w-56">
      {allCategories.map((categoryItem) => (
        <li key={categoryItem.id}>
          {categoryItem.name !== "Ver Todo" ? (
            <details
              ref={(detailsRef) => {
                if (detailsRef) {
                  detailsRef.ontoggle = () => {
                    if (detailsRef.open) {
                      handleCategoryClick(categoryItem.name);
                    }
                  };
                }
              }}
            >
              <summary
                className={cn(
                  { "font-semibold": category === categoryItem.name },
                  "capitalize",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const details = e.currentTarget
                    .parentElement as HTMLDetailsElement;
                  details.open = !details.open;
                }}
              >
                {categoryItem.name}
              </summary>
              <ul>
                {categoryItem.subcategories?.map((subcategory) => (
                  <li key={subcategory.id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubcategoryClick(subcategory.name);
                      }}
                      className="capitalize"
                    >
                      {subcategory.name}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ) : (
            <span
              className={cn({ "font-semibold": category === "Ver Todo" })}
              onClick={() => handleCategoryClick("Ver Todo")}
            >
              {categoryItem.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
