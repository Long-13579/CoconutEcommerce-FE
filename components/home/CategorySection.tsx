import React from 'react'
import CategoryCard from './CategoryCard'

const categoryList = [
  {
    name: "Coconut Oil",
    icon: "/cold_pressed_coconut_oil.webp",
    alt: "Coconut Oil"
  },
  {
    name: "Coconut Bowls",
    icon: "/coconut_bowl.jpg",
    alt: "Coconut Bowls"
  },
  {
    name: "Coconut Chips",
    icon: "/coconut_chips.jpg",
    alt: "Coconut Chips"
  },
  {
    name: "Coconut Soap",
    icon: "/coconut_soap.jpg",
    alt: "Coconut Soap"
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