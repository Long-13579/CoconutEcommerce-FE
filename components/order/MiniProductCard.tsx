import React from 'react';
import Image from 'next/image';

interface MiniProductCardProps {
  item: any;
}

const MiniProductCard = ({ item }: MiniProductCardProps) => {
  let imageSrc = '/coconut_product.jpg';
  if (item.product && item.product.photo) {
    imageSrc = item.product.photo.startsWith('http')
      ? item.product.photo
      : `http://localhost:8000${item.product.photo}`;
  } else if (item.product && item.product.image) {
    imageSrc = item.product.image.startsWith('http')
      ? item.product.image
      : `http://localhost:8000${item.product.image}`;
  }
  return (
    <div className="w-[220px] rounded-lg shadow-md bg-white flex flex-col items-center gap-3 px-4 py-5 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
      <div className="w-[160px] h-[160px] rounded-md overflow-hidden">
        <Image
          src={imageSrc}
          className="object-cover w-full h-full"
          width={160}
          height={160}
          alt={item.product?.name || 'product'}
        />
      </div>
      {/* Product Name */}
      <p className="text-center text-base font-medium text-gray-800">{item.product?.name || 'Product'}</p>
      {/* Product Price & Quantity */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[16px] font-bold text-black">
          Price: ${item.price ? Number(item.price).toFixed(2) : '0.00'}
        </span>
        <span className="text-[14px] text-gray-600">
          Quantity: {item.quantity || 1}
        </span>
      </div>
    </div>
  );
};

export default MiniProductCard;