
"use client";
import CategorySection from '@/components/home/CategorySection'
import Hero from '@/components/home/Hero'
import ProductSection from '@/components/home/ProductSection'
import React, { useState, useContext } from 'react'
import { SearchContext } from '@/context/SearchContext';


import NavBar from '@/components/navbar/NavBar';

interface HomePageProps {
  searchResults?: any[] | null;
}

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { searchResults } = useContext(SearchContext);

  return (
    <>
      <Hero />
      <CategorySection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ProductSection title="Featured Products" selectedCategory={selectedCategory} searchResults={searchResults} />
    </>
  );
};

export default HomePage;