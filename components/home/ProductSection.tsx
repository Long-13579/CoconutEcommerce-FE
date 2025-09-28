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
}

const ProductSection = ({ title, selectedCategory, excludeSlug }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function loadProducts() {
      let data;
      if (selectedCategory) {
        // Nếu có selectedCategory thì fetch theo category
        data = await import("../../service/ProductService").then(mod => mod.searchProductsByCategory(selectedCategory as string));
      } else {
        data = await fetchProducts();
      }
      setProducts(data || []);
      setLoading(false);
    }
    loadProducts();
    interval = setInterval(loadProducts, 2000); // fetch lại mỗi 2 giây
    return () => clearInterval(interval);
  }, [selectedCategory]);

  // Loại trừ sản phẩm đang xem
  const filteredList = products.filter((p) => (excludeSlug ? p.slug !== excludeSlug : true));

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
