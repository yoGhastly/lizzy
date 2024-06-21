"use client";
import { AccountLayout } from "../modules/auth/account/account-layout";
import { DecorativeTitle } from "../modules/common/components/decorative-title";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { OrdersUserDetailsLayout } from "../modules/account/layouts/orders-user-details-layout";
import { UserDetails } from "../modules/account/components/user-details";
import { LastOrder } from "../modules/account/components/last-order";
import { MyOrdersLayout } from "../modules/account/layouts/my-orders-layout";
import { OrderList } from "../modules/account/components/order-list";
import { Fragment } from "react";
import { Footer } from "../modules/common/layout/footer";

export default function AccountPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && !isSignedIn) {
    return router.push("/sign-in");
  }

  return (
    <Fragment>
      <AccountLayout>
        <OrdersUserDetailsLayout>
          <UserDetails />
          <LastOrder />
        </OrdersUserDetailsLayout>
        <MyOrdersLayout>
          <OrderList orders={[0, 1, 2]} />
          <section className="flex flex-col gap-8 w-full">
            <DecorativeTitle decorative={false} className="capitalize">
              Estatus de Compra
            </DecorativeTitle>
          </section>
        </MyOrdersLayout>
      </AccountLayout>
      <Footer hideSeeCatalogueButton />
    </Fragment>
  );
}
