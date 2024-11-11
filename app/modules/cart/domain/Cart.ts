export interface Cart {
  id: number;
  user_id: string | null;
  session_id: string;
  created_at: Date;
  updated_at: Date;
  items: CartItem[];
}

export interface CartItem {
  id: number; // Add id property for the database record
  product_id: string;
  variant_id?: string;
  quantity: number;
  price: number;
}

// Interface for a new cart item (without id)
export interface NewCartItem {
  product_id: string;
  variant_id?: string;
  quantity: number;
  price: number;
}

// Interface for an existing cart item (with id)
export interface CartItem extends NewCartItem {
  id: number;
}

export interface CartRepository {
  // Retrieve a cart by session ID
  getCartBySessionId(sessionId: string): Promise<Cart | null>;

  // Retrieve a cart by user ID
  getCartByUserId(userId: string): Promise<Cart | null>;

  // Add an item to an existing cart by cart ID
  addItemToCart(cartId: number, item: NewCartItem): Promise<void>;

  // Add an item to a cart by user ID or session ID
  addItemToCartForSessionOrUser(
    userId: string | null,
    sessionId: string,
    item: NewCartItem,
  ): Promise<void>;

  // Create a new cart for a user or session
  createCart(userId: string | null, sessionId: string): Promise<Cart>;

  // Get a cart item by product and variant ID
  getCartItemByProductAndVariant(
    cartId: number,
    productId: string,
    variantId: string | null,
  ): Promise<CartItem | null>;

  // Update the quantity of an item in the cart
  updateCartItemQuantity(itemId: number, quantity: number): Promise<void>;

  // Update the timestamp of a cart
  updateCartTimestamp(cartId: number): Promise<void>;
}
