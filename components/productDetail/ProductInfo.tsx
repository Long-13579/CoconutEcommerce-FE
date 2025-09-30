import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Button from '../uiComponents/Button';
import { fetchProductDetail } from '../../service/ProductService';

interface ProductDetail {
  id: number;
  name: string;
  description: string;
  slug: string;
  image: string;
  price: string | number;
}

const ProductInfo = ({ slug }: { slug: string }) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProductDetail(slug);
      setProduct(data);
    }
    loadProduct();
  }, [slug]);

  if (!product) return <div>Đang tải sản phẩm...</div>;
  return (
    <div className="bg-gray-50 padding-x py-10 flex items-start flex-wrap gap-12 main-max-width padding-x mx-auto">
      {/* Product Image */}
      <div className="w-[350px] h-[400px] relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <Image
          src={product.image && !product.image.startsWith('http') ? `http://localhost:8000${product.image}` : (product.image || "/coconut_product.jpg")}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-6 max-w-[500px] max-md:w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <h3 className="text-2xl font-semibold text-black">${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}</h3>
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-medium text-lg mb-3">Product Details</h3>
          <p className="text-gray-600 text-justify leading-6 text-[14px] max-md:text-[12px]">
            {product.description}
          </p>
        </div>

        {/* Buttons */}
  <div className='flex py-3 items-center gap-4 flex-wrap'>
    <Button
      className="default-btn"
      onClick={async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
        if (!token || !userId) {
          alert("You must be logged in to add items to cart.");
          return;
        }
        const CartService = await import("@/service/CartService");
        const result = await CartService.addToCart(product.id, token);
        if (result) {
          alert("Item added to cart successfully!");
          // Gửi event để NavItems cập nhật số lượng
          window.dispatchEvent(new Event("user-login"));
        } else {
          alert("Failed to add item to cart.");
        }
      }}
    >
      Add to Cart
    </Button>
  </div>
      </div>
    </div>
  );
};

export default ProductInfo;