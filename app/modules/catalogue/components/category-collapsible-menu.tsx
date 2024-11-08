"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/app/utils/cn";
import { useEffect, useState } from "react";

interface Props {
  category: string;
  categories: {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[]; // Categories with subcategories
  }[]; // Adjusted structure for subcategories
}

export const CategoryCollapsibleMenu: React.FC<Props> = ({
  category,
  categories,
}) => {
  const [openTabs, setOpenTabs] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    setOpenTabs((prev) => ({
      ...prev,
      [category]: true,
    }));
  }, [category]);

  // Add the "Ver Todo" category to the front of the categories list
  const allCategories = [
    { id: 0, name: "Ver Todo", subcategories: [] },
    ...categories,
  ];

  // Function to update the URL
  const handleCategoryClick = (categoryName: string) => {
    router.push(`/catalogo/productos?category=${categoryName}`, {
      scroll: false,
    });
  };

  // Function to update the URL for subcategory
  const handleSubcategoryClick = (
    categoryName: string,
    subcategoryName: string,
  ) => {
    router.push(
      `/catalogo/productos?category=${categoryName}/${subcategoryName}`,
      {
        scroll: false,
      },
    );
  };

  return (
    <ul className="menu w-56">
      {allCategories.map((categoryItem) => (
        <li key={categoryItem.id}>
          {/* Render the details only if the category is not "Ver Todo" */}
          {categoryItem.name !== "Ver Todo" ? (
            <details open={openTabs[categoryItem.name] || false}>
              <summary
                className={cn(
                  {
                    "font-semibold": category === categoryItem.name,
                  },
                  "capitalize",
                )}
                onClick={() => handleCategoryClick(categoryItem.name)} // Update the URL on category click
              >
                {categoryItem.name}
              </summary>
              <ul>
                {/* Render subcategories */}
                {categoryItem.subcategories?.map((subcategory) => (
                  <li key={subcategory.id}>
                    <a
                      href={`#`} // Prevent default action; handled by router
                      onClick={(e) => {
                        e.preventDefault(); // Prevent page reload
                        handleSubcategoryClick(
                          categoryItem.name,
                          subcategory.name,
                        ); // Update the URL for subcategory
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
              onClick={() => handleCategoryClick("Ver Todo")} // Update the URL on "Ver Todo" click
            >
              {categoryItem.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
