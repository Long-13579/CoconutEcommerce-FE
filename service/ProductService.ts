// Service fetch dữ liệu product từ server CoconutEcommerce

const BASE_URL = "http://localhost:8000/api/products";

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

// Tìm kiếm sản phẩm theo tên (chỉ dùng cho thanh tìm kiếm)
export async function searchProductByName(name: string) {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về mảng các sản phẩm có tên phù hợp
    const products = await response.json();
    // Lọc lại chỉ sản phẩm có tên chứa name (loại bỏ tìm theo mô tả/category)
    return products.filter((p: any) => p.name.toLowerCase().includes(name.toLowerCase()));
  } catch (error) {
    console.error("Lỗi khi search product by name:", error);
    return null;
  }
}

// Lấy sản phẩm theo category (phân loại)
export async function getProductsByCategory(categoryName: string) {
  try {
    const response = await fetch(`${BASE_URL}/list_by_category?category_name=${encodeURIComponent(categoryName)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    // Trả về mảng các sản phẩm cùng category
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo category:", error);
    return null;
  }
}