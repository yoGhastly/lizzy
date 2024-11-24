import { Footer } from "@/app/modules/common/layout/footer";
import { OrderRepositoryImpl } from "@/app/modules/orders/infrastructure/OrderRepository";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";

const ordersRepository = new OrderRepositoryImpl();

const getOrder = unstable_cache(
  async (orderId: string) => await ordersRepository.getById(orderId),
  ["order"],
  { revalidate: 3600, tags: ["order"] },
);

export default async function OrderPage({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(orderId);
  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="flex flex-col w-full h-auto justify-center items-center md:items-start mt-14 gap-5 p-5 md:p-0">
      <header className="flex flex-col gap-2 w-full">
        <h1 className="text-lg md:text-xl">No. Pedido {order.id}</h1>
        <p className="text-xs">Fecha de compra: 20/10/2024</p>
      </header>

      <section className="flex flex-col gap-2 mt-20 w-full">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-sm">{order.lineItems.length} Artículos</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2">
            {order.lineItems.map((item) => (
              <Link
                href={`/catalogo/productos/${item.id}`}
                key={item.id}
                className="flex flex-col gap-2 group overflow-hidden max-w-[200px]"
              >
                <picture className="relative aspect-[1/1.2] bg-[#fafafa]">
                  <Image
                    className="object-contain transition duration-300 ease-in-out group-hover:scale-105"
                    src={item.url}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAA=="
                    alt="Product"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    fill
                  />
                </picture>
                <section className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">
                      {item.description}
                    </p>
                    <h3 className="uppercase">
                      {item.amount_total / 100} {item.currency}{" "}
                      <span className="text-xs text-gray-400">
                        x{item.quantity}
                      </span>
                    </h3>
                  </div>
                </section>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <div className="flex gap-5 w-full justify-between">
        <div className="flex flex-col gap-16 w-full">
          <div className="flex flex-col gap-5">
            <h2 className="md:text-lg font-bold">Método de envío</h2>
            <p className="text-sm">Entrega a domicilio</p>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="md:text-lg font-bold">Dirección de Envío</h2>
          </div>
        </div>

        <div className="flex flex-col gap-16 w-full">
          <div className="flex flex-col gap-5">
            <h2 className="md:text-lg font-bold">Método de pago</h2>
            <p className="text-sm">Entrega a domicilio</p>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="md:text-lg font-bold">
              Dirección de la Facturación
            </h2>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-5 w-full mb-10">
        <h2 className="md:text-lg font-bold">Resumen del Pedido</h2>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="text-sm">Subtotal</p>
            {/* <p className="text-sm">{order.subtotal}</p> */}
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Envío</p>
            <p className="text-sm">$200.00</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">{order.total / 100} MXN</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
