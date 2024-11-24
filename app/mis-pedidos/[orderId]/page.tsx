import Image from "next/image";
import Stripe from "stripe";
import { Footer } from "@/app/modules/common/layout/footer";
import { OrderRepositoryImpl } from "@/app/modules/orders/infrastructure/OrderRepository";
import { formatSelectedVariant } from "@/app/utils/formatSelectedVariant";
import { unstable_cache } from "next/cache";
import { VisaIcon } from "@/app/modules/common/icons/visa";
import { MastercardIcon } from "@/app/modules/common/icons/mastercard";
import { CartFallback } from "@/app/modules/cart/components/cart-fallback";

const ordersRepository = new OrderRepositoryImpl();

const getOrder = unstable_cache(
  async (orderId: string) => await ordersRepository.getById(orderId),
  ["order"],
  { revalidate: 3600, tags: ["order"] },
);

const getPaymentIntent = unstable_cache(
  async (paymentIntentId: string | Stripe.PaymentIntent | null) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string,
    );
    return paymentIntent;
  },
  ["paymentIntent"],
  { revalidate: 3600, tags: ["paymentIntent"] },
);

const getPaymentMethod = unstable_cache(
  async (paymentMethodId: string | Stripe.PaymentMethod | null) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentMethodId as string,
    );
    return paymentMethod;
  },
  ["paymentMethod"],
  { revalidate: 3600, tags: ["paymentMethod"] },
);

export default async function OrderPage({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(orderId);
  let paymentIntent: Stripe.PaymentIntent | null = null;
  let paymentMethod: Stripe.PaymentMethod | null = null;

  if (order) {
    paymentIntent = await getPaymentIntent(order.paymentDetails);
    paymentMethod = await getPaymentMethod(paymentIntent.payment_method);
  }

  if (!order) {
    return (
      <div className="flex flex-col w-full h-auto justify-center items-center mt-14 gap-5 p-5 md:p-0">
        <CartFallback displayText="Ooops! El pedido que buscas no existe." />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-auto justify-center items-center md:items-start mt-14 gap-5 p-5 md:p-0">
      <header className="flex flex-col gap-2 w-full">
        <h1 className="text-lg md:text-xl">No. Pedido {order.id}</h1>
        <p className="text-xs">
          Fecha de compra:{" "}
          {new Date(order.createdAt).toLocaleDateString("en-GB")}
        </p>
      </header>

      <section className="flex flex-col gap-2 mt-20 w-full">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-sm">{order.lineItems.length} Artículos</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2">
            {order.lineItems.map((item) => (
              <div
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
                    <p className="capitalize text-sm">
                      {item.name}
                      <span className="text-xs text-gray-400 ml-1">
                        {formatSelectedVariant(item.variant as string)}
                      </span>
                    </p>
                    <h3 className="uppercase font-semibold">
                      {item.amount_total / 100} {item.currency}{" "}
                      <span className="text-xs text-gray-400">
                        x{item.quantity}
                      </span>
                    </h3>
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <div className="flex gap-5 w-full justify-between">
        <div className="flex flex-col gap-16 w-full">
          <div className="flex flex-col gap-5">
            <h2 className="md:text-lg font-bold">Método de envío</h2>
            <p className="text-sm">Recogida en tienda</p>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="md:text-lg font-bold">Dirección de Envío</h2>
            <p className="text-sm text-gray-500">
              {order.customerDetails?.address?.line1}{" "}
              {order.customerDetails?.address?.line2} <br />
              {order.customerDetails?.address?.city},{" "}
              {order.customerDetails?.address?.state}{" "}
              {order.customerDetails?.address?.postal_code}
              <br />
              {order.customerDetails?.name} {order.customerDetails?.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-16 w-full">
          {paymentMethod && (
            <div className="flex flex-col gap-5">
              <h2 className="md:text-lg font-bold">Método de pago</h2>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  {paymentMethod.card?.brand === "visa" ? (
                    <VisaIcon />
                  ) : (
                    <MastercardIcon />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  ****{paymentMethod.card?.last4}
                </p>
              </div>
            </div>
          )}
          {paymentMethod && (
            <div className="flex flex-col gap-5">
              <h2 className="md:text-lg font-bold">
                Dirección de la Facturación
              </h2>
              <p className="text-sm text-gray-500">
                {paymentMethod.billing_details.address?.line1}{" "}
                {paymentMethod.billing_details.address?.line2} <br />
                {paymentMethod.billing_details.address?.city},{" "}
                {paymentMethod.billing_details.address?.state}{" "}
                {paymentMethod.billing_details.address?.postal_code}
                <br />
                {paymentMethod.billing_details.name}{" "}
                {paymentMethod.billing_details.phone}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-5 w-full mb-10">
        <h2 className="md:text-lg font-bold">Resumen del Pedido</h2>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-sm">
              {order.lineItems.reduce(
                (acc, item) => acc + item.amount_total,
                0,
              ) / 100}{" "}
              MXN
            </p>
          </div>
          {/* <div className="flex justify-between">
            <p className="text-sm">Envío</p>
            <p className="text-sm">$200.00</p>
          </div> */}
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
