import React from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: string | number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  // Chuyển giá sang USD, đảm bảo price là số
  const priceVND = typeof product.price === "string" ? parseFloat(product.price) : product.price;
  const priceUSD = priceVND ? (priceVND / 26000).toFixed(2) : "0.00";
  // Xử lý hình ảnh: nếu là đường dẫn tương đối, ghép với domain backend
  let imageSrc = "/default.jpg";
  if (product.image) {
    imageSrc = product.image.startsWith("http")
      ? product.image
      : `http://localhost:8000${product.image}`;
  }
  return (
    <div
      className="w-[220px] h-[320px] bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={() => router.push(`/products/${product.slug}`)}
    >
      <Image src={imageSrc} alt={product.name} width={120} height={120} />
      <p className="font-semibold mt-3 text-gray-800">{product.name}</p>
      <p className="text-blue-600 font-bold mt-2">${priceUSD} USD</p>
    </div>
  );
};

export default ProductCard;