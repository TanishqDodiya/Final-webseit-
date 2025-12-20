import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name.slice(0, 30)}... added to cart`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-card animate-fade-in">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          SKU: {product.sku}
        </p>
        <p className="mt-1 text-base font-bold text-foreground">
          {formatPrice(product.price)}/ {product.unit}
        </p>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddToCart}
        className="btn-add-quote flex items-center gap-1.5 flex-shrink-0"
      >
        Add to Quote
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ProductCard;
