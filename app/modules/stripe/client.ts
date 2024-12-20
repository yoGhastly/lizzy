import { Stripe as StripeClient, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<StripeClient | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);
  }
  return stripePromise;
};

export default getStripe;
