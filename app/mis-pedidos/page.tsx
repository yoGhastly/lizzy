import { AccountLayout } from "../modules/auth/account/account-layout";
import { DecorativeTitle } from "../modules/common/components/decorative-title";
import { OrdersUserDetailsLayout } from "../modules/account/layouts/orders-user-details-layout";
import { UserDetails } from "../modules/account/components/user-details";
import { LastOrder } from "../modules/account/components/last-order";
import { MyOrdersLayout } from "../modules/account/layouts/my-orders-layout";
import { OrderList } from "../modules/account/components/order-list";
import { Fragment } from "react";
import { Footer } from "../modules/common/layout/footer";
import { currentUser } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";
import {
  Order,
  type LastOrder as LastOrderInterface,
} from "../modules/orders/domain/Order";
import { sql } from "@vercel/postgres";
import { cn } from "../utils/cn";

const getLastOrder = unstable_cache(
  async (email: string) => {
    const { rows } = await sql`
        SELECT * FROM orders WHERE user_email = ${email} ORDER BY "createdat" DESC LIMIT 1
      `;
    return {
      items: rows[0].line_items.map((item: { url: string }) => item.url),
      quantity: rows[0].line_items.length,
      id: rows[0].id,
      status: rows[0].payment_status,
    };
  },
  ["last-order"],
  { revalidate: 3600, tags: ["last-order"] },
);

const getOrdersByUserEmail = unstable_cache(
  async (email: string) => {
    const { rows } = await sql`
        SELECT * FROM orders WHERE user_email = ${email}
      `;
    return rows as Order[];
  },
  ["orders-by-email"],
  { revalidate: 3600, tags: ["orders-by-email"] },
);

const getUserAddress = unstable_cache(
  async (email: string) => {
    const { rows } = await sql`
      SELECT customer_details 
      FROM orders 
      WHERE user_email = ${email} 
      ORDER BY createdat DESC 
      LIMIT 1
    `;
    return rows[0] as any;
  },
  ["user-address"],
  { revalidate: 3600, tags: ["user-address"] },
);

export default async function AccountPage() {
  const user = await currentUser();
  let order: LastOrderInterface | null = null;
  let orders: any[] = [];
  let address = "";
  const userEmail = user?.emailAddresses[0].emailAddress;

  if (user) {
    order = await getLastOrder(userEmail as string);
    orders = await getOrdersByUserEmail(userEmail as string);
    const { customer_details } = await getUserAddress(userEmail as string);
    address = `${customer_details?.address?.line1} ${customer_details?.address?.line2}, ${customer_details?.address?.city}, ${customer_details?.address?.state}, ${customer_details?.address?.postal_code}, ${customer_details?.address?.country}`;
  }

  if (!order) {
    return null;
  }

  return (
    <Fragment>
      <AccountLayout>
        <OrdersUserDetailsLayout>
          <UserDetails address={address} />
          <LastOrder order={order} />
        </OrdersUserDetailsLayout>
        <MyOrdersLayout>
          <OrderList orders={orders} />
          <section className="flex flex-col gap-8 w-full">
            <DecorativeTitle decorative={false} className="capitalize">
              Estatus de última compra
            </DecorativeTitle>
            <p
              className={cn(
                {
                  "text-green-500": order.status === "paid",
                  "text-red-500": order.status === "failed",
                },
                "capitalize",
              )}
            >
              {order.status === "paid" ? "Pagado" : "Pendiente"}
            </p>
          </section>
        </MyOrdersLayout>
      </AccountLayout>
      <Footer hideSeeCatalogueButton />
    </Fragment>
  );
}
