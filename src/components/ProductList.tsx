import React from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  categoryName: string;
}

const ProductList = ({ products, categoryName }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">{categoryName}</h2>
        <p className="text-xs text-muted-foreground">{products.length} products</p>
      </div>
      <div className="divide-y divide-border">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
