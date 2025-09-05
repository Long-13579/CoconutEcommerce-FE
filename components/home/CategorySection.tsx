import React from 'react'
import CategoryCard from './CategoryCard'

const categoryList = [
  {
    name: "Oils & Extracts",
    icon: "/Oil_Extracts.svg",
    alt: "Oils & Extracts"
  },
  {
    name: "Kitchenware",
    icon: "/Kitchenware.svg",
    alt: "Kitchenware"
  },
  {
    name: "Snacks",
    icon: "/Snacks.svg",
    alt: "Snacks"
  },
  {
    name: "Personal Care",
    icon: "/Personal_Care.svg",
    alt: "Personal Care"
  }
];

const CategorySection = () => {
  return (
    <section className="main-max-width padding-x mx-auto">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        Browse By Category
      </h2>

      {/* Content */}
      <div className="flex justify-center flex-wrap gap-8">
        {categoryList.map((cat, idx) => (
          <CategoryCard key={idx} name={cat.name} icon={cat.icon} alt={cat.alt} />
        ))}
      </div>
    </section>
  )
}

export default CategorySection