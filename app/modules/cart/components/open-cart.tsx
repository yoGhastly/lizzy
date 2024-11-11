import { Fragment } from "react";
import { Modal } from "./modal";
import { OpenCartButton } from "./open-cart-button";
import { MySqlCartsRepository } from "../infrastructure/CartsRepository";
import type { Cart } from "../domain/Cart";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";
import { MySqlCategoriesRepository } from "../../categories/infrastructure/CategoriesRepository";

const repository = new MySqlCartsRepository();
const categoriesRepository = new MySqlCategoriesRepository();

const getCategories = unstable_cache(
  async () => await categoriesRepository.getAll(),
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);

const getSubcategories = unstable_cache(
  async () => await categoriesRepository.getAllSubcategories(),
  ["subcategories"],
  { revalidate: 3600, tags: ["subcategories"] },
);

export const OpenCart = async () => {
  let cart: Cart | null = null;
  const c = cookies();
  const sessionId = c.get("session_id")?.value;

  const allCategories = await getCategories();
  const allSubcategories = await getSubcategories();

  if (sessionId) {
    cart = await repository.getCartBySessionId(sessionId);
  }

  return (
    <Fragment>
      <OpenCartButton />
      <Modal
        cart={cart}
        subcategories={allSubcategories}
        allCategories={allCategories}
      />
    </Fragment>
  );
};
