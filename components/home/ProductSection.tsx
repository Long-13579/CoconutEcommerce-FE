import React from "react";
import ProductCard, { productList } from "./ProductCard";

interface Props{
  title: string;
  selectedCategory?: string | null;
}

const categoryMap: Record<string, string[]> = {
  "Oils & Extracts": [
    "Cold-Pressed Coconut Oil",
    "Virgin Coconut Oil",
    "Refined Coconut Oil",
    "Coconut Butter",
    "Coconut Extract"
  ],
  "Kitchenware": [
    "Coconut Bowl",
    "Coconut Cups",
    "Coconut Cutlery",
    "Coconut Serving Trays",
    "Coconut Candle Holders"
  ],
  "Snacks": [
    "Coconut Chips",
    "Toasted Coconut Chips",
    "Coconut Candy",
    "Coconut Cookies",
    "Coconut Granola"
  ],
  "Personal Care": [
    "Coconut Soap",
    "Coconut Shampoo",
    "Coconut Body Lotion",
    "Coconut Lip Balm",
    "Coconut Face Scrub"
  ]
};

const ProductSection = ({title, selectedCategory}: Props) => {
  let filteredList = productList;
  if (selectedCategory && categoryMap[selectedCategory]) {
    const names = categoryMap[selectedCategory];
    filteredList = productList.filter(p => names.includes(p.name));
  }
  return (
    <section id="product_section" className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        {title}
      </h2>

      {/* Content */}
      <div className="flex-center flex-wrap gap-4">
        {filteredList.map((_, idx) => (
          <ProductCard key={idx} index={productList.indexOf(_)} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
