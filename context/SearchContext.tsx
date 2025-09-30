import React, { createContext } from "react";

export type SearchContextType = {
  searchResults: any[] | null;
  setSearchResults: (results: any[] | null) => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchResults: null,
  setSearchResults: () => {},
});
