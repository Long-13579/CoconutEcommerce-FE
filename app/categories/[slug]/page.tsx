
"use client";
import CategoryBtn from '@/components/category/CategoryBtn'
import ProductCard, { productList } from '@/components/home/ProductCard'
import React from 'react'
import { useParams } from 'next/navigation'

const categoryMap: Record<string, string[]> = {
  oils_extracts: [
    "Cold-Pressed Coconut Oil",
    "Virgin Coconut Oil",
    "Refined Coconut Oil",
    "Coconut Butter",
    "Coconut Extract"
  ],
  kitchenware: [
    "Coconut Bowl",
    "Coconut Cups",
    "Coconut Cutlery",
    "Coconut Serving Trays",
    "Coconut Candle Holders"
  ],
  snacks: [
    "Coconut Chips",
    "Toasted Coconut Chips",
    "Coconut Candy",
    "Coconut Cookies",
    "Coconut Granola"
  ],
  personal_care: [
    "Coconut Soap",
    "Coconut Shampoo",
    "Coconut Body Lotion",
    "Coconut Lip Balm",
    "Coconut Face Scrub"
  ]
};

const slugify = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

const CategoryPage = () => {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';
  const productNames = categoryMap[slug] || [];
  const filteredProducts = productList
    .map((product, idx) => ({ ...product, idx }))
    .filter(product => productNames.includes(product.name));

  return (
    <div className='main-max-width mx-auto padding-x py-9'>
      <p className="font-semibold text-center text-xl mb-6">{slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Products</p>

      <div className='flex-center flex-wrap my-6 gap-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.idx} index={product.idx} />
          ))
        ) : (
          <p className="text-center w-full">No products found for this category.</p>
        )}
      </div>
    </div>
  )
}

export default CategoryPage