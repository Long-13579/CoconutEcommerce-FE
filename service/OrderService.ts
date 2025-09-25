// Service fetch dữ liệu order từ server CoconutEcommerce
const BASE_URL = "http://localhost:8000/order";

export async function getOrders(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/get_orders?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về mảng các order
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách order:", error);
    return null;
  }
}

export async function createCheckoutSession(cart_code: string, email: string) {
  try {
    const response = await fetch(`${BASE_URL}/create_checkout_session/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart_code, email }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về thông tin session thanh toán
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi tạo session thanh toán:", error);
    return null;
  }
}

export async function finishCheckout(resultCode: number, extraData: string, amount: number, transId: string) {
  try {
    const params = new URLSearchParams({
      resultCode: resultCode.toString(),
      extraData,
      amount: amount.toString(),
      transId
    });
    const response = await fetch(`${BASE_URL}/finish_checkout?${params.toString()}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về status
    return response.status;
  } catch (error) {
    console.error("Lỗi khi hoàn tất thanh toán:", error);
    return null;
  }
}
