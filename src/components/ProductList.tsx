import React from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { Package, Search } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  categoryName: string;
  isLoading?: boolean;
  isSearching?: boolean;
}

const ProductList = ({ products, categoryName, isLoading = false, isSearching = false }: ProductListProps) => {
  if (isLoading) {
    return (
      <div className="flex-1 min-w-0">
        <div className="px-4 py-3 border-b border-border">
          <div className="h-4 bg-muted rounded animate-pulse w-32 mb-1"></div>
          <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-4 flex items-center gap-4 animate-pulse">
              <div className="w-20 h-20 bg-muted rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
              <div className="w-24 h-10 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 min-w-0">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">{categoryName}</h2>
          <p className="text-xs text-muted-foreground">0 products</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center max-w-md">
            {isSearching ? (
              <>
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any products matching your search. Try adjusting your search terms or browse our categories.
                </p>
              </>
            ) : (
              <>
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No products available
                </h3>
                <p className="text-muted-foreground mb-4">
                  This category doesn't have any products yet. Check back later or explore other categories.
                </p>
              </>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="text-primary hover:text-primary/80 font-medium text-sm"
            >
              Refresh page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm sticky top-16 z-10">
        <h2 className="text-sm font-semibold text-foreground">{categoryName}</h2>
        <p className="text-xs text-muted-foreground">
          {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="divide-y divide-border">
        {products.map((product, index) => (
          <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
