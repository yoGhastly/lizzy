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
import { UserImpl } from "../modules/user/infrastructure/UserRepository";
import { type LastOrder as LastOrderInterface } from "../modules/orders/domain/Order";

const userRepository = new UserImpl();

const getLastOrder = unstable_cache(
  async (email: string) => await userRepository.getLastOrder(email),
  ["last-order"],
  { revalidate: 3600, tags: ["last-order"] },
);

export default async function AccountPage() {
  const user = await currentUser();
  let order: LastOrderInterface | null = null;
  const userEmail = user?.emailAddresses[0].emailAddress;

  if (user) {
    order = await getLastOrder(userEmail as string);
    console.log(order);
  }

  return (
    <Fragment>
      <AccountLayout>
        <OrdersUserDetailsLayout>
          <UserDetails />
          <LastOrder order={order} />
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
