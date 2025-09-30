
const BASE_URL = "http://localhost:8000/carts";

// Hành động 1: Add to cart
export async function addToCart(product_id: number, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
}

// Hành động 2: Get cart
export async function getCart(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error getting cart:", error);
    return null;
  }
}

// Hành động 3: Update cart item quantity
export async function updateCartItemQuantity(item_id: number, quantity: number) {
  try {
    const response = await fetch(`${BASE_URL}/update_item/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id, quantity }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return null;
  }
}

// Hành động 4: Delete cart item
export async function deleteCartItem(item_id: number) {
  try {
    const response = await fetch(`${BASE_URL}/delete_item/${item_id}/`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return null;
  }
}
