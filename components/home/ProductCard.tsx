import React from 'react'
import Image from "next/image"


export const productList = [
  {
    name: "Cold-Pressed Coconut Oil",
    price: "$8.00",
    image: "/cold_pressed_coconut_oil.webp",
    alt: "Cold-Pressed Coconut Oil"
  },
  {
    name: "Coconut Bowl",
    price: "$5.00",
    image: "/coconut_bowl.jpg",
    alt: "Coconut Bowl"
  },
  {
    name: "Coconut Chips",
    price: "$3.50",
    image: "/coconut_chips.jpg",
    alt: "Coconut Chips"
  },
  {
    name: "Coconut Soap",
    price: "$4.00",
    image: "/coconut_soap.jpg",
    alt: "Coconut Soap"
  }
];

const ProductCard = ({ index }: { index: number }) => {
  const { name, price, image, alt } = productList[index];
  return (
    <div className="w-[260px] rounded-lg shadow-md bg-white flex flex-col items-center gap-4 px-5 py-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
      <div className="w-[200px] h-[200px] rounded-md overflow-hidden">
        <Image
          src={image}
          className="object-cover w-full h-full"
          width={200}
          height={200}
          alt={alt}
        />
      </div>
      {/* Product Name */}
      <p className="text-center text-lg font-semibold text-gray-800">{name}</p>
      {/* Product Price */}
      <p className="text-[18px] text-center font-bold text-black">{price}</p>
    </div>
  );
};

export default ProductCard