import React from 'react'
import Image from "next/image"


export const productList = [
  // Oils & Extracts
  {
    name: "Cold-Pressed Coconut Oil",
    price: "$8.00",
    image: "/cold_pressed_coconut_oil.webp",
    alt: "Cold-Pressed Coconut Oil"
  },
  {
    name: "Virgin Coconut Oil",
    price: "$9.00",
    image: "/cold_pressed_coconut_oil.webp",
    alt: "Virgin Coconut Oil"
  },
  {
    name: "Refined Coconut Oil",
    price: "$7.50",
    image: "/cold_pressed_coconut_oil.webp",
    alt: "Refined Coconut Oil"
  },
  {
    name: "Coconut Butter",
    price: "$6.00",
    image: "/cold_pressed_coconut_oil.webp",
    alt: "Coconut Butter"
  },
  {
    name: "Coconut Extract",
    price: "$5.50",
    image: "/cold_pressed_coconut_oil.webp",
    alt: "Coconut Extract"
  },
  // Kitchenware
  {
    name: "Coconut Bowl",
    price: "$5.00",
    image: "/coconut_bowl.jpg",
    alt: "Coconut Bowl"
  },
  {
    name: "Coconut Cups",
    price: "$4.50",
    image: "/coconut_bowl.jpg",
    alt: "Coconut Cups"
  },
  {
    name: "Coconut Cutlery",
    price: "$3.00",
    image: "/coconut_bowl.jpg",
    alt: "Coconut Cutlery"
  },
  {
    name: "Coconut Serving Trays",
    price: "$6.50",
    image: "/coconut_bowl.jpg",
    alt: "Coconut Serving Trays"
  },
  {
    name: "Coconut Candle Holders",
    price: "$4.00",
    image: "/coconut_bowl.jpg",
    alt: "Coconut Candle Holders"
  },
  // Snacks
  {
    name: "Coconut Chips",
    price: "$3.50",
    image: "/coconut_chips.jpg",
    alt: "Coconut Chips"
  },
  {
    name: "Toasted Coconut Chips",
    price: "$3.80",
    image: "/coconut_chips.jpg",
    alt: "Toasted Coconut Chips"
  },
  {
    name: "Coconut Candy",
    price: "$2.50",
    image: "/coconut_chips.jpg",
    alt: "Coconut Candy"
  },
  {
    name: "Coconut Cookies",
    price: "$4.20",
    image: "/coconut_chips.jpg",
    alt: "Coconut Cookies"
  },
  {
    name: "Coconut Granola",
    price: "$5.00",
    image: "/coconut_chips.jpg",
    alt: "Coconut Granola"
  },
  // Personal Care
  {
    name: "Coconut Soap",
    price: "$4.00",
    image: "/coconut_soap.jpg",
    alt: "Coconut Soap"
  },
  {
    name: "Coconut Shampoo",
    price: "$6.00",
    image: "/coconut_soap.jpg",
    alt: "Coconut Shampoo"
  },
  {
    name: "Coconut Body Lotion",
    price: "$7.00",
    image: "/coconut_soap.jpg",
    alt: "Coconut Body Lotion"
  },
  {
    name: "Coconut Lip Balm",
    price: "$2.00",
    image: "/coconut_soap.jpg",
    alt: "Coconut Lip Balm"
  },
  {
    name: "Coconut Face Scrub",
    price: "$5.50",
    image: "/coconut_soap.jpg",
    alt: "Coconut Face Scrub"
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