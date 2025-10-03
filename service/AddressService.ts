// Cập nhật username cho user
export async function updateUsername(email: string, newUsername: string): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:8000/api/users/update_username/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, new_username: newUsername })
    });
    return response.ok;
  } catch (error) {
    console.error("Lỗi khi cập nhật username:", error);
    return false;
  }
}
// AddressService: lấy dữ liệu address từ server

const BASE_URL = "http://localhost:8000/api/users";

export interface Address {
  street: string;
  city: string;
  state: string;
  phone: string;
}

export async function getAddressByEmail(email: string): Promise<Address | null> {
  try {
    const response = await fetch(`${BASE_URL}/get_address/?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy address:", error);
    return null;
  }
}

export async function addOrUpdateAddress(email: string, address: Address): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/add_address/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, ...address })
    });
    return response.ok;
  } catch (error) {
    console.error("Lỗi khi cập nhật address:", error);
    return false;
  }
}
