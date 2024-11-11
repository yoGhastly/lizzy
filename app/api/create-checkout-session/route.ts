import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import Stripe from "stripe";
import { Cart } from "@/app/modules/cart/domain/Cart";

function generateOrderHandle(): string {
  return randomUUID();
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { cart }: { cart: Cart } = await req.json();

    if (!cart || !cart.items) {
      throw new Error("Cart is empty or items are missing");
    }

    const totalAmount = cart.items.reduce((total, item) => {
      let itemPrice =
        typeof item.price === "string" ? parseFloat(item.price) : item.price;
      if (itemPrice > 1000) {
        itemPrice = itemPrice / 100;
      }
      return total + itemPrice * item.quantity;
    }, 0);

    if (totalAmount <= 0) {
      throw new Error("Total amount must be greater than zero");
    }

    const customer = await stripe.customers.create();

    // get product name from stripe products
    const products = cart.items.map((item) => item.product_id);
    const productData = await Promise.all(
      products.map(async (p) => {
        const product = await stripe.products.retrieve(p);
        return product;
      }),
    );

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item, index) => {
        let itemPrice =
          typeof item.price === "string" ? parseFloat(item.price) : item.price;
        if (itemPrice > 1000) {
          itemPrice = itemPrice / 100;
        }
        return {
          price_data: {
            currency: "mxn",
            product_data: {
              name: capitalizeFirstLetter(productData[index].name as string),
              images: [productData[index].images[0]] as string[],
              description: productData[index].description as string,
            },
            unit_amount: Math.round(itemPrice * 100),
          },
          quantity: item.quantity,
        };
      });

    let lastItemAddedId = null;

    if (cart.items.length > 0) {
      lastItemAddedId = cart.items.at(-1)?.product_id;
    }

    const cancelUrl = lastItemAddedId
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/catalogo/productos/${encodeURIComponent(lastItemAddedId)}?cancel=true`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/catalogo/productos?cancel=true`;

    const intent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: Math.round(totalAmount * 100),
      currency: "mxn",
    });

    const orderUniqueIdentifier = generateOrderHandle();

    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/orders/${orderUniqueIdentifier}`;

    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer: customer.id,
      customer_update: {
        shipping: "auto",
      },
      metadata: {
        cartId: cart.id,
        orderId: orderUniqueIdentifier,
      },
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["MX"],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    return Response.json({
      status: 200,
      json: {
        sessionId: session.id,
        clientSecret: intent.client_secret,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({
      status: 500,
      json: { error: "Failed to create checkout session" },
    });
  }
}