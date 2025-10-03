const BASE_URL = "http://localhost:8000/api/users";

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${BASE_URL}/login_user/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json(); // { token, ... }
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    return null;
  }
}