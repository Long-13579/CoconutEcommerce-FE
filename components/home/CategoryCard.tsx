import React from 'react'
import Image from "next/image"

interface CategoryCardProps {
  name: string;
  icon: string;
  alt: string;
}

const CategoryCard = ({ name, icon, alt }: CategoryCardProps) => {
  return (
    <div className="w-[220px] h-[120px] bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer">
      {/* Category Icon */}
      <div className="bg-gray-100 p-3 rounded-full">
        <Image src={icon} alt={alt} width={40} height={40} />
      </div>
      {/* Category Name */}
      <p className="font-semibold mt-3 text-gray-800">{name}</p>
    </div>
  );
}

export default CategoryCard