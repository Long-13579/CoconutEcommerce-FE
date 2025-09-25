// Service fetch dữ liệu cart từ server CoconutEcommerce
const BASE_URL = "http://localhost:8000/carts";

export async function addToCart(cart_code: string, product_id: number) {
  try {
    const response = await fetch(`${BASE_URL}/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart_code, product_id }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    return null;
  }
}

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
    console.error("Lỗi khi cập nhật số lượng:", error);
    return null;
  }
}

export async function deleteCartItem(pk: number) {
  try {
    const response = await fetch(`${BASE_URL}/delete_item/${pk}/`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text(); // Trả về chuỗi "Cartitem deleted successfully!"
  } catch (error) {
    console.error("Lỗi khi xóa cart item:", error);
    return null;
  }
}

export async function getCart(cart_code: string) {
  try {
    const response = await fetch(`${BASE_URL}/${cart_code}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    return null;
  }
}

export async function getCartStat(cart_code: string) {
  try {
    const response = await fetch(`${BASE_URL}/stat/?cart_code=${encodeURIComponent(cart_code)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy thống kê giỏ hàng:", error);
    return null;
  }
}

export async function productInCart(cart_code: string, product_id: number) {
  try {
    const response = await fetch(`${BASE_URL}/product_in_cart/?cart_code=${encodeURIComponent(cart_code)}&product_id=${product_id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json(); // { product_in_cart: boolean }
  } catch (error) {
    console.error("Lỗi khi kiểm tra sản phẩm trong giỏ hàng:", error);
    return null;
  }
}
