import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

const RelatedProducts = ({ products, title = "Similar Products" }: RelatedProductsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block group"
          >
            <div className="border border-border rounded-lg p-3 hover:shadow-lg transition-all duration-200 group-hover:border-primary/50 bg-card">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <h3 className="font-medium text-foreground line-clamp-2 mb-2 text-sm group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                SKU: {product.sku}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">
                  {formatPrice(product.price)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.stockQuantity > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;