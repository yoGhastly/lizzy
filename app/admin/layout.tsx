import type { PropsWithChildren } from "react";
import { Protect } from "@clerk/nextjs";
import { CartFallback } from "../modules/cart/components/cart-fallback";
import Link from "next/link";

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <Protect
      permission="org:feature:permission"
      fallback={
        <div className="flex flex-col gap-2">
          <CartFallback displayText="No tienes permisos para acceder a esta página" />
          <Link
            href="/"
            className="btn w-fit self-center bg-black text-white hover:bg-black/80 hover:text-white"
          >
            Ir a la página de inicio
          </Link>
        </div>
      }
    >
      {props.children}
    </Protect>
  );
}
