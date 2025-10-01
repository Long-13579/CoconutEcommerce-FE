const BASE_URL = "http://localhost:8000/order";

// Get Payment Link
export async function getPaymentLink(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/create_checkout_session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error getting payment link:", error);
    return null;
  }
}

// Finish Checkout
export async function finishCheckout(resultCode: number, amount: number, transId: string, token?: string) {
  try {
    const url = `${BASE_URL}/finish_checkout?resultCode=${resultCode}&amount=${amount}&transId=${transId}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return;
  } catch (error) {
    console.error("Error finishing checkout:", error);
    return null;
  }
}

// Get Orders
export async function getOrders(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/get_orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error getting orders:", error);
    return null;
  }
}
