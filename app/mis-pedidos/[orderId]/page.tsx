import { Footer } from "@/app/modules/common/layout/footer";
import { OrderRepositoryImpl } from "@/app/modules/orders/infrastructure/OrderRepository";
import { ProductCard } from "@/app/modules/products/components/card";
import { unstable_cache } from "next/cache";

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

  // Properly stringify the order object before logging
  console.log(JSON.stringify(order, null, 2));

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
          {/* <p className="text-sm">{order.lineItems.length} Artículos</p> */}
          <div className="flex flex-col gap-1 w-full">
            <div className="bg-gray-500 w-24 h-32"></div>
            {/* <ProductCard product={{}} /> */}
            <span>10ml</span>
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
            <p className="text-sm">$200.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Envío</p>
            <p className="text-sm">$200.00</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">$200.00</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
