import { unstable_noStore as noStore, unstable_cache } from "next/cache";
import { ProductsCarousel } from "@/app/modules/common/components/carousel";
import { DecorativeTitle } from "@/app/modules/common/components/decorative-title";
import { Footer } from "@/app/modules/common/layout/footer";
import { getProduct } from "@/app/modules/products/actions";
import { ProductBreadcrumb } from "@/app/modules/products/components/product-breadcrumb";
import { TileImage } from "@/app/modules/products/components/tile-image";
import { ProductDescription } from "@/app/modules/products/layouts/product-description";
import { Suspense } from "react";
import { MySqlCartsRepository } from "@/app/modules/cart/infrastructure/CartsRepository";
import { cookies } from "next/headers";
import { FloatingProductInfo } from "@/app/modules/products/components/floating-product-info";
import { MySqlProductsRepository } from "@/app/modules/products/infrastructure/ProductsRepository";

const carts = new MySqlCartsRepository();
const productsRepository = new MySqlProductsRepository();

const getProducts = unstable_cache(
  async () => await productsRepository.getAll(),
  ["products"],
  { revalidate: 60, tags: ["products"] },
);

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  // HACK: This function can be used to declaratively opt out of static rendering.
  noStore();
  let product = await getProduct({ id: params.productId });
  const allProducts = await getProducts();

  const addProductToCart = async () => {
    "use server";
    if (!product) return;
    await carts.addItemToCartForUser(1, {
      product_id: product.id,
      quantity: 1,
      price: product.price,
    });

    const cart = await carts.getCartByUserId(1);
    if (cart) {
      cookies().set("cart", cart.id.toString(), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
    }
  };

  if (!product) return null;

  return (
    <div className="flex relative flex-col w-full gap-5 py-1 md:py-5">
      <div className="mt-12 mx-auto flex flex-col w-full gap-2 px-5">
        <header className="w-full">
          <ProductBreadcrumb productCategory={product.category} />
        </header>

        <section className="flex flex-col md:flex-row gap-4">
          <section className="basis-auto w-full h-full border">
            <TileImage src={product.images[0]} alt="Product" />
          </section>

          <section className="p-2 basis-1/2">
            <Suspense>
              <ProductDescription
                product={product}
                addProductToCart={addProductToCart}
              />
            </Suspense>
          </section>
        </section>
      </div>

      <div className="flex flex-col gap-20 px-5 mt-6">
        <section className="flex flex-col w-full gap-8 mx-auto px-5">
          <DecorativeTitle decorative={false} className="text-xl text-novi-950">
            Otras personas también compraron
          </DecorativeTitle>
          <ProductsCarousel products={allProducts} />
        </section>

        <section className="flex flex-col w-full gap-8 mx-auto px-5">
          <DecorativeTitle decorative={false} className="text-xl text-novi-950">
            Te puede interesar
          </DecorativeTitle>
          <ProductsCarousel products={allProducts} />
        </section>
        <Suspense>
          <FloatingProductInfo
            product={product}
            onAddProductToCart={addProductToCart}
          />
        </Suspense>
      </div>
      <div className="w-full px-5">
        <Footer hideSeeCatalogueButton />
      </div>
    </div>
  );
}
