// Service fetch dữ liệu product từ server CoconutEcommerce

const BASE_URL = "http://localhost:8000/products";

export async function fetchProducts() {
  try {
  const response = await fetch(`${BASE_URL}/list`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về mảng các sản phẩm: id, name, slug, image, price
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch products:", error);
    return null;
  }
}

export async function fetchProductDetail(slug: string) {
  try {
  const response = await fetch(`${BASE_URL}/${slug}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về chi tiết sản phẩm: id, name, description, slug, image, price
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch product detail:", error);
    return null;
  }
}

export async function searchProducts(query: string) {
  try {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về mảng các sản phẩm phù hợp
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi search products:", error);
    return null;
  }
}

// Tìm sản phẩm theo category name
export async function searchProductsByCategory(categoryName: string) {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(categoryName)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi search products by category:", error);
    return null;
  }
}