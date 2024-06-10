export interface Cart {
  id: number;
  user_id: number;
  session_id: string;
  created_at: Date;
  updated_at: Date;
  items: CartItem[];
}

export interface CartItem {
  product_id: number;
  variant_id: number;
  quantity: number;
  price: number;
}

export interface CartRepository {
  create(cart: Cart): Promise<void>;
  getCartByUserId(userId: number): Promise<Cart | null>;
  addItemToCart(cartId: number, item: CartItem): Promise<void>;
}
