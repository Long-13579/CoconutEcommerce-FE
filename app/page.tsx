
"use client";
import CategorySection from '@/components/home/CategorySection'
import Hero from '@/components/home/Hero'
import ProductSection from '@/components/home/ProductSection'
import React, { useState } from 'react'

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Hero />
      <CategorySection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductSection title="Featured Products" selectedCategory={selectedCategory} />
    </>
  )
}

export default HomePage