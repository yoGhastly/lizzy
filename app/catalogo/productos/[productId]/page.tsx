import { unstable_noStore as noStore, unstable_cache } from "next/cache";
import { Suspense } from "react";
import { MySqlCartsRepository } from "@/app/modules/cart/infrastructure/CartsRepository";
import { MySqlProductsRepository } from "@/app/modules/products/infrastructure/ProductsRepository";
import { getProduct } from "@/app/modules/products/actions";
import { ProductBreadcrumb } from "@/app/modules/products/components/product-breadcrumb";
import { TileImage } from "@/app/modules/products/components/tile-image";
import { ProductDescription } from "@/app/modules/products/layouts/product-description";
import { DecorativeTitle } from "@/app/modules/common/components/decorative-title";
import { ProductsCarousel } from "@/app/modules/common/components/carousel";
import { FloatingProductInfo } from "@/app/modules/products/components/floating-product-info";
import { Footer } from "@/app/modules/common/layout/footer";
import { createServerSession } from "@/app/utils/createClientSesssion";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

const carts = new MySqlCartsRepository();
const productsRepository = new MySqlProductsRepository();

// Fetch all products
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
  noStore();
  const { userId } = auth();

  const product = await getProduct({ id: params.productId });
  const allProducts = await getProducts();

  const addProductToCart = async (variantId: string) => {
    "use server";
    if (!product) return;

    let sessionId = cookies().get("session_id")?.value;
    if (!sessionId) {
      const { sessionId: newSessionId } = createServerSession();
      sessionId = newSessionId;
      cookies().set("session_id", sessionId, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
    } else {
      console.log("Existing session id");
    }

    const cart = await carts.getCartBySessionId(sessionId);

    if (!cart) {
      await carts.addItemToCartForSessionOrUser(userId || null, sessionId, {
        product_id: product.id,
        variant_id: variantId,
        quantity: 1,
        price: product.price,
      });
    } else {
      // Ensure cart is refreshed after adding item
      const existingItem = await carts.getCartItemByProductAndVariant(
        cart.id,
        product.id,
        variantId,
      );

      if (existingItem) {
        const updatedQuantity = existingItem.quantity + 1;
        await carts.updateCartItemQuantity(existingItem.id, updatedQuantity);
      } else {
        await carts.addItemToCart(cart.id, {
          product_id: product.id,
          variant_id: variantId,
          quantity: 1,
          price: product.price,
        });
      }
    }

    const updatedCart = await carts.getCartBySessionId(sessionId);
    if (updatedCart) {
      const cookieStore = cookies();
      cookieStore.set("cart", updatedCart.id.toString(), {
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
