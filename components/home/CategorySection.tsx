import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { fetchCategories } from '../../service/CategoryService';

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
}

const CategorySection = ({ selectedCategory, setSelectedCategory }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data || []);
      setLoading(false);
    }
    loadCategories();
  }, []);

  if (loading) return <div>Đang tải danh mục...</div>;
  return (
    <section className="main-max-width padding-x mx-auto">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        Browse By Category
      </h2>
      <div className="flex justify-center flex-wrap gap-8">
        {categories.map((cat, idx) => {
          let iconSrc = "/default.svg";
          if (cat.image) {
            iconSrc = cat.image.startsWith("http")
              ? cat.image
              : `http://localhost:8000${cat.image}`;
          }
          return (
            <CategoryCard
              key={idx}
              name={cat.name}
              icon={iconSrc}
              alt={cat.name}
              selected={selectedCategory === cat.name}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default CategorySection