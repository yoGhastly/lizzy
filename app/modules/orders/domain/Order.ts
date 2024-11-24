import Stripe from "stripe";

export interface LineItem extends Stripe.LineItem {
  url: string;
  name: string;
  variant: string | undefined;
}

export interface Order {
  id: string | null;
  session_id: string;
  lineItems: LineItem[];
  total: number;
  customerDetails: Stripe.Checkout.Session["customer_details"];
  user_email: string;
  paymentStatus: Stripe.Checkout.Session["payment_status"];
  paymentDetails: Stripe.Checkout.Session["payment_intent"];
  createdAt: Date;
}

export interface LastOrder {
  items: string[]; // item images
  quantity: number;
}

export interface OrderRepository {
  create(order: Order): Promise<void>;
  getById(id: string): Promise<Order | null>;
}
