import React from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    photo?: string;
    price: string | number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  // Debug dữ liệu truyền vào
  console.log('ProductCard data:', product);
  console.log('ProductCard price:', product.price);
    // Hiển thị giá tiền đúng kiểu $9.00
    const priceValue = typeof product.price === "string" ? parseFloat(product.price) : product.price;
    const priceDisplay = priceValue ? `$${priceValue.toFixed(2)}` : "$0.00";
  // Xử lý hình ảnh: ưu tiên product.photo, nếu không có thì lấy product.image
  let imageSrc = "/default.jpg";
  const img = product.photo || product.image;
  if (img) {
    imageSrc = img.startsWith("http")
      ? img
      : `http://localhost:8000${img}`;
  }
  return (
    <div
      className="w-[220px] h-[320px] bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={() => router.push(`/products/${product.slug}`)}
    >
      <Image src={imageSrc} alt={product.name} width={120} height={120} />
      <p className="font-semibold mt-3 text-gray-800">{product.name}</p>
        <p className="text-blue-600 font-bold mt-2">{priceDisplay}</p>
    </div>
  );
};

export default ProductCard;