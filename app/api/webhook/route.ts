import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { LineItem, Order } from "@/app/modules/orders/domain/Order";
import { OrderRepositoryImpl } from "@/app/modules/orders/infrastructure/OrderRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const orderRepository = new OrderRepositoryImpl();

async function fetchLineItems(
  checkoutSession: Stripe.Checkout.Session,
): Promise<LineItem[]> {
  const checkoutItems = await stripe.checkout.sessions.listLineItems(
    checkoutSession.id,
  );

  return Promise.all(
    checkoutItems.data.map(async (item) => {
      const product = await stripe.products.retrieve(
        item.price?.product as string,
      );
      return {
        ...item,
        url: product.images[0],
      };
    }),
  );
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webHookSecret);
      console.log(`Webhook received: ${event.id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 },
      );
    }

    console.log("✅ Success:", event.id);

    // get user details from the checkout
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("🔔 Payment was successful!");
        const lineItems = await fetchLineItems(session);
        const order: Order = {
          id: session.id,
          lineItems,
          total: session.amount_total as number,
          customerDetails: session.customer_details,
          paymentStatus: session.payment_status,
          paymentDetails: session.payment_intent,
        };

        await orderRepository.create(order);
        console.log(`Order created: ${order.id}`);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 },
    ).headers.set("Allow", "POST");
  }
}
