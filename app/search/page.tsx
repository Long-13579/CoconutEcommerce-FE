"use client";
import React, { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import ProductSection from "@/components/home/ProductSection";

const SearchPage = () => {
  const { searchResults } = useContext(SearchContext);
  return (
    <div className="main-max-width mx-auto my-16">
      <ProductSection title="Search Results" searchResults={searchResults} />
    </div>
  );
};

export default SearchPage;
