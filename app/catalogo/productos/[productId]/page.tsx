import { unstable_noStore as noStore } from "next/cache";
import { productsMock } from "@/app/constants";
import { ProductsCarousel } from "@/app/modules/common/components/carousel";
import { DecorativeTitle } from "@/app/modules/common/components/decorative-title";
import { Footer } from "@/app/modules/common/layout/footer";
import { getProducts } from "@/app/modules/products/actions";
import { ProductBreadcrumb } from "@/app/modules/products/components/product-breadcrumb";
import { TileImage } from "@/app/modules/products/components/tile-image";
import { ProductDescription } from "@/app/modules/products/layouts/product-description";
import { Suspense } from "react";
import { MySqlCartsRepository } from "@/app/modules/cart/infrastructure/CartsRepository";
import { cookies } from "next/headers";
import { FlaoatingProductInfo } from "@/app/modules/products/components/floating-product-info";

const carts = new MySqlCartsRepository();

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  // HACK: This function can be used to declaratively opt out of static rendering.
  noStore();
  const [product] = await getProducts();

  const addProductToCart = async () => {
    "use server";

    await carts.addItemToCartForUser(1, {
      product_id: product.id,
      variant_id: 1,
      quantity: 1,
      price: product.price,
    });

    const cart = await carts.getCartByUserId(1);
    if (cart) {
      cookies().set("cart", cart.id.toString());
      console.log("Product added to cart with id: ", cart.id);
    }
  };

  return (
    <div className="flex relative flex-col w-full gap-5 py-1 md:py-5">
      <div className="mt-12 mx-auto flex flex-col w-full gap-2 px-5">
        <header className="w-full">
          <ProductBreadcrumb productCategory="Pestañas" />
        </header>

        <main className="flex flex-col md:flex-row gap-4">
          <section className="basis-auto w-full h-full border">
            <TileImage src="/next.svg" alt="Product" />
          </section>

          <section className="p-2 basis-1/2">
            <Suspense>
              <ProductDescription
                product={product}
                addProductToCart={addProductToCart}
              />
            </Suspense>
          </section>
        </main>
      </div>

      <div className="flex flex-col gap-20 px-5">
        <section className="flex flex-col w-full gap-8 mx-auto px-5">
          <DecorativeTitle decorative={false} className="text-xl text-novi-950">
            Otras personas también compraron
          </DecorativeTitle>
          <ProductsCarousel products={productsMock} />
        </section>

        <section className="flex flex-col w-full gap-8 mx-auto px-5">
          <DecorativeTitle decorative={false} className="text-xl text-novi-950">
            Te puede interesar
          </DecorativeTitle>
          <ProductsCarousel products={productsMock} />
        </section>
        <Suspense>
          <FlaoatingProductInfo product={product} />
        </Suspense>
      </div>
      <div className="w-full px-5">
        <Footer hideSeeCatalogueButton />
      </div>
    </div>
  );
}
