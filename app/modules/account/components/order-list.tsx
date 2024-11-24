"use client";
import { cn } from "@/app/utils/cn";
import { DecorativeTitle } from "../../common/components/decorative-title";
import { Order } from "../../orders/domain/Order";
import Image from "next/image";
import { CartFallback } from "../../cart/components/cart-fallback";
import Link from "next/link";

interface Props {
  orders: {
    line_items: Order["lineItems"];
    total: number;
    id: string;
  }[];
}

export const OrderList: React.FC<Props> = ({ orders }) => {
  if (orders.length === 0) {
    return <CartFallback displayText="No tienes compras aún." />;
  }
  return (
    <section className="flex flex-col gap-8 w-full">
      <DecorativeTitle decorative={false} className="capitalize">
        Tus Compras
      </DecorativeTitle>

      <div className="flex flex-col max-h-[400px] overflow-y-auto">
        {orders.map((order, idx) => (
          <Link
            href={`/mis-pedidos/${order.id}`}
            key={idx}
            className={cn(
              "flex justify-between items-center w-full border border-muted-gray/20 p-7 py-5",
              {
                "rounded-none": idx === 1,
                "rounded-t-xl": idx === 0,
                "rounded-b-xl": idx === orders.length - 1,
              },
            )}
          >
            <div className="flex gap-3">
              <div className="w-[70px] h-[60px] bg-white border rounded-lg relative">
                <Image
                  src={order.line_items[0].url}
                  alt={order.line_items[0].name}
                  className="object-contain"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black font-semibold">
                  {order.line_items[0].name}
                </p>
                <p className="text-muted-gray text-xs md:text-sm">
                  Cantidad: {order.line_items[0].quantity}
                </p>
              </div>
            </div>
            <p>Total: ${order.total / 100}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
