"use client";
import { cn } from "@/app/utils/cn";
import { DecorativeTitle } from "../../common/components/decorative-title";

interface Props {
  orders: any[];
}

export const OrderList: React.FC<Props> = ({ orders }) => {
  return (
    <section className="flex flex-col gap-8 w-full">
      <DecorativeTitle decorative={false} className="capitalize">
        Tus Compras
      </DecorativeTitle>

      <div className="flex flex-col">
        {orders.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "flex justify-between items-center w-full border border-muted-gray/20 p-7 py-5",
              {
                "rounded-none": idx === 1,
                "rounded-t-xl": idx === 0,
                "rounded-b-xl": idx === 2,
              },
            )}
          >
            <div className="flex gap-3">
              <div className="w-[70px] h-[60px] bg-white border rounded-lg"></div>
              <div className="flex flex-col gap-2">
                <p className="text-black font-semibold">Producto</p>
                <p className="text-muted-gray text-xs md:text-sm">
                  Cantidad: 1
                </p>
              </div>
            </div>
            <p>Total: $100.00</p>
          </div>
        ))}
      </div>
    </section>
  );
};
