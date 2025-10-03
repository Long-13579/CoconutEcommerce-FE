// Service fetch dữ liệu category từ server CoconutEcommerce
const BASE_URL = "http://localhost:8000/api/categories";

export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/list`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về mảng các category
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch categories:", error);
    return null;
  }
}

export async function fetchCategoryDetail(slug: string) {
  try {
    const response = await fetch(`${BASE_URL}/${slug}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về chi tiết category
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch category detail:", error);
    return null;
  }
}
