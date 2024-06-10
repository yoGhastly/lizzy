import { Product, ProductVariant } from "../products/domain/Product";
import { Cart, CartItem } from "./domain/Cart";
import { MySqlCartsRepository } from "./infrastructure/CartsRepository";

const cartRepository = new MySqlCartsRepository();

export async function addToCart(
  userId: number,
  product: Product,
  variantId: number,
  quantity: number,
): Promise<void> {
  "use server";

  // Fetch or create the cart
  let cart = await cartRepository.getCartByUserId(userId);
  if (!cart) {
    const newCart: Cart = {
      id: 0, // This will be set by the create method
      user_id: userId,
      session_id: "", // Generate or handle session_id as required
      created_at: new Date(),
      updated_at: new Date(),
      items: [],
    };
    await cartRepository.create(newCart);
    cart = newCart;
  }

  // Find the product variant
  const variant = product.variants.find((v) => v.id === variantId);
  if (!variant) {
    throw new Error("Product variant not found");
  }

  if (variant.stock < quantity) {
    throw new Error("Insufficient stock for the requested quantity");
  }

  // Find existing item in the cart
  const existingItem = cart.items.find(
    (item) => item.product_id === product.id && item.variant_id === variantId,
  );

  if (existingItem) {
    // Update the quantity of the existing item
    existingItem.quantity += quantity;
  } else {
    // Add the new item to the cart
    const newItem: CartItem = {
      product_id: product.id,
      variant_id: variantId,
      quantity: quantity,
      price: variant.price,
    };
    cart.items.push(newItem);
  }

  // Save the updated cart
  await cartRepository.addItemToCart(
    cart.id,
    existingItem || cart.items[cart.items.length - 1],
  );
}
