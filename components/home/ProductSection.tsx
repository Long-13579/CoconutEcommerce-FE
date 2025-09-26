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
}

const ProductSection = ({ title, selectedCategory }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data || []);
      setLoading(false);
    }
    loadProducts();
  }, []);

  // Nếu có selectedCategory, lọc theo category (giả sử product có trường category)
  // Giả sử selectedCategory là category id hoặc name, ưu tiên id nếu có
  const filteredList = selectedCategory
    ? products.filter((p) => {
        if (p.category_id && typeof selectedCategory === "number") {
          return p.category_id === selectedCategory;
        }
        if (p.category && typeof selectedCategory === "string") {
          return p.category === selectedCategory;
        }
        return true;
      })
    : products;

  if (loading) return <div>Đang tải sản phẩm...</div>;
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
