import React from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../uiComponents/Button";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    photo?: string;
    price: string | number;
    discount_percent?: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const priceValue = typeof product.price === "string" ? parseFloat(product.price) : product.price;
  let discountPercent = product.discount_percent || 0;
  let discountedPrice = priceValue;
  if (discountPercent > 0) {
    discountedPrice = priceValue * (1 - discountPercent / 100);
  }
  const priceDisplay = priceValue ? `$${priceValue.toFixed(2)}` : "$0.00";
  const discountedPriceDisplay = `$${discountedPrice.toFixed(2)}`;

  let imageSrc = "/default.jpg";
  const img = product.photo || product.image;
  if (img) {
    imageSrc = img.startsWith("http") ? img : `http://localhost:8000${img}`;
  }

  const handleProductClick = () => {
    router.push(`/products/${product.slug}`);
  };

  return (
    <div className="w-[220px] h-[320px] bg-white rounded-2xl p-4 shadow-lg transition-transform duration-200 hover:scale-105">
      <div className="flex flex-col h-full">
        {/* Image section */}
        <div className="h-[160px] relative mb-3">
          <div 
            className="relative w-full h-full cursor-pointer"
            onClick={handleProductClick}
          >
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              className="p-2"
            />
          </div>
        </div>

        {/* Product info section */}
        <div className="flex flex-col flex-1">
          <h3 
            className="font-semibold text-gray-800 text-center mb-2 line-clamp-2 hover:text-gray-600 cursor-pointer"
            style={{ minHeight: '40px' }}
            onClick={handleProductClick}
          >
            {product.name}
          </h3>

          {/* Price section */}
          <div className="text-center">
            {discountPercent > 0 ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-500 line-through">{priceDisplay}</span>
                  <span className="text-blue-600 font-semibold">{discountedPriceDisplay}</span>
                  <span className="text-xs text-red-500">-{discountPercent}%</span>
                </div>
              </>
            ) : (
              <p className="text-blue-600 font-semibold">{priceDisplay}</p>
            )}
          </div>

          {/* Button section */}
          <div className="mt-auto pt-2 flex justify-center">
            <Button
              className="bg-black text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-800 w-[80px] whitespace-nowrap"
              onClick={handleProductClick}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;