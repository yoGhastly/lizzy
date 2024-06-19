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
  quantity: number;
  price: number;
}

export interface CartRepository {
  create(cart: Cart): Promise<number>;
  getCartByUserId(userId: number): Promise<Cart | null>;
  getCartById(id: string): Promise<Cart | null>;
  addItemToCart(cartId: number, item: CartItem): Promise<void>;
  deleteItem(cartId: number, item: CartItem): Promise<void>;
  editItem(cartId: number, item: CartItem): Promise<void>;
}
