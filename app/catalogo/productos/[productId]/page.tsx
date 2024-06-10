import { productsMock } from "@/app/constants";
import { ProductsCarousel } from "@/app/modules/common/components/carousel";
import { DecorativeTitle } from "@/app/modules/common/components/decorative-title";
import { Footer } from "@/app/modules/common/layout/footer";
import { getProducts } from "@/app/modules/products/actions";
import { FlaoatingProductInfo } from "@/app/modules/products/components/floating-product-info";
import { ProductBreadcrumb } from "@/app/modules/products/components/product-breadcrumb";
import { TileImage } from "@/app/modules/products/components/tile-image";
import { ProductDescription } from "@/app/modules/products/layouts/product-description";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const [product] = await getProducts();

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
            <ProductDescription product={product} />
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
        <FlaoatingProductInfo />
      </div>
      <div className="w-full px-5">
        <Footer hideSeeCatalogueButton />
      </div>
    </div>
  );
}
