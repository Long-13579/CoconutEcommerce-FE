"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../service/ProductService";

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string | number;
  category?: string;
  category_id?: number;
}

interface Props {
  title: string;
  selectedCategory?: string | null;
  excludeSlug?: string;
  searchResults?: any[] | null;
}

const ProductSection = ({ title, selectedCategory, excludeSlug, searchResults }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function loadProducts() {
      let data;
      if (selectedCategory) {
        data = await import("../../service/ProductService").then(mod => mod.getProductsByCategory(selectedCategory as string));
      } else {
        data = await fetchProducts();
      }
      setProducts(data || []);
      setLoading(false);
    }
    loadProducts();
    interval = setInterval(loadProducts, 2000);
    return () => clearInterval(interval);
  }, [selectedCategory]);

  // Nếu có kết quả tìm kiếm thì ưu tiên hiển thị
  const displayList = searchResults && searchResults.length > 0 ? searchResults : products;
  const filteredList = displayList.filter((p) => (excludeSlug ? p.slug !== excludeSlug : true));

  if (loading && (!searchResults || searchResults.length === 0)) return <div>Đang tải sản phẩm...</div>;
  return (
    <section id="product_section" className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        {title}
      </h2>
      <div className="flex-center flex-wrap gap-4">
        {filteredList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
