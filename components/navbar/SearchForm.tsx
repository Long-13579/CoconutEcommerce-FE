
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";


interface SearchFormProps {
  onSearch?: (results: any[]) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await import("@/service/ProductService").then(mod => mod.searchProductByName(query));
    if (onSearch) onSearch(data || []);
    setLoading(false);
    // Chuyển hướng sang trang search
    router.push("/search");
  };
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        name="query"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-1 font-bold w-full outline-none"
        placeholder="Search Products"
      />
      <button type="submit" className="size-[30px] rounded-full bg-black flex justify-center items-center cursor-pointer text-white">
        <Search className="size-4" />
      </button>
      {loading && <div className="mt-2 text-gray-500">Searching...</div>}
    </form>
  );
};

export default SearchForm;
