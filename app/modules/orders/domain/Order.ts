import Stripe from "stripe";

export interface LineItem extends Stripe.LineItem {
  url: string;
}

export interface Order {
  id: string | null;
  session_id: string;
  lineItems: LineItem[];
  total: number;
  customerDetails: Stripe.Checkout.Session["customer_details"];
  paymentStatus: Stripe.Checkout.Session["payment_status"];
  paymentDetails: Stripe.Checkout.Session["payment_intent"];
}

export interface OrderRepository {
  create(order: Order): Promise<void>;
  getById(id: string): Promise<Order>;
}
