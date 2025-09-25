// Service fetch dữ liệu user từ server CoconutEcommerce
const BASE_URL = "http://localhost:8000/users";

export async function createUser(userData: {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_picture_url?: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi tạo user:", error);
    return null;
  }
}

export async function checkUserExists(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/exists/${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json(); // { exists: boolean }
  } catch (error) {
    console.error("Lỗi khi kiểm tra user tồn tại:", error);
    return null;
  }
}

export async function addAddress(addressData: {
  email: string;
  street: string;
  city: string;
  state: string;
  phone: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/add_address/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi thêm địa chỉ:", error);
    return null;
  }
}

export async function getAddress(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/get_address/?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy địa chỉ:", error);
    return null;
  }
}
