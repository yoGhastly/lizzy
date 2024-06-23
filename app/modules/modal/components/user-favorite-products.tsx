"use client";
import { CartLayoutHeader } from "../../cart/layouts/cart-layout-header";

export const UserFavoriteProducts = () => {
  // TODO: Render out user's favorite products
  return (
    <div className="flex flex-col">
      <CartLayoutHeader flexReverse>
        <p className="text-center font-semibold">Tus Favoritos</p>
      </CartLayoutHeader>
    </div>
  );
};
