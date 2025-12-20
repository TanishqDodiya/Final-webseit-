import React from 'react';
import { Category } from '@/data/products';

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategorySidebar = ({ categories, activeCategory, onCategoryChange }: CategorySidebarProps) => {
  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <div className="sticky top-20">
        <h2 className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Categories
        </h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left category-item ${
                activeCategory === category.id
                  ? 'category-item-active'
                  : 'category-item-inactive'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default CategorySidebar;
