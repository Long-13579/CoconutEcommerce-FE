"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { SearchContext } from "@/context/SearchContext";
import SearchForm from "./SearchForm";
import NavItems from "./NavItems";
import MobileNavbar from "./MobileNavbar";
import SearchButton from "./SearchButton";


interface NavBarProps {
  onSearch?: (results: any[]) => void;
}

const NavBar = ({ onSearch }: NavBarProps) => {
  const [showSearchForm, setShowSearchForm] = useState(false);

  const handleSearch = () => {
    setShowSearchForm((curr) => !curr);
  };

  const { setSearchResults } = useContext(SearchContext);
  return (
    <>
      <div className="flex justify-between items-center main-max-width mx-auto padding-x">
        <Link href="/" onClick={() => setSearchResults(null)}>
          <h1 className="text-2xl font-extrabold text-gray-900">Cocoverse</h1>
        </Link>

        <div className="max-lg:hidden">
          <SearchForm onSearch={onSearch} />
        </div>

        <div className="max-lg:block hidden">
          <SearchButton
            handleSearch={handleSearch}
            showSearchForm={showSearchForm}
          />
        </div>

        <div className="max-md:hidden">
          <NavItems />
        </div>

        <div className="max-md:block hidden">
          <MobileNavbar />
        </div>
      </div>

      {showSearchForm && (
        <div className="w-[300px] mx-auto mt-4 max-lg:block hidden">
          <SearchForm onSearch={onSearch} />
        </div>
      )}
    </>
  );
};

export default NavBar;
