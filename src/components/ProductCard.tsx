import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  stock?: number;
}

const ProductCard = ({ product, stock = 10 }: ProductCardProps) => {
  const { addToCart, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const currentCartItem = items.find(item => item.product.id === product.id);
  const currentQuantity = currentCartItem?.quantity || 0;
  const availableStock = stock - currentQuantity;
  const isOutOfStock = availableStock <= 0;

  const handleAddToCart = async () => {
    if (isOutOfStock || isAdding) return;
    
    setIsAdding(true);
    try {
      addToCart(product);
    } finally {
      setTimeout(() => setIsAdding(false), 500);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="product-card group hover:bg-muted/30 transition-colors duration-200">
      {/* Product Image - Clickable */}
      <Link 
        to={`/product/${product.id}`}
        className="w-20 h-20 flex-shrink-0 bg-muted rounded-lg overflow-hidden block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
          width="80"
          height="80"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        {/* Product Name - Clickable */}
        <Link 
          to={`/product/${product.id}`}
          className="block"
        >
          <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2 mb-1 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-1">
          SKU: {product.sku}
        </p>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-base font-bold text-foreground">
            {formatPrice(product.price)}
          </p>
          <span className="text-xs text-muted-foreground">/ {product.unit}</span>
        </div>
        
        {/* Stock Status */}
        <div className="flex items-center gap-2">
          {isOutOfStock ? (
            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
          ) : availableStock <= 3 ? (
            <span className="text-xs text-orange-600 font-medium">
              Only {availableStock} left
            </span>
          ) : (
            <span className="text-xs text-green-600 font-medium">In Stock</span>
          )}
          
          {currentQuantity > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {currentQuantity} in cart
            </span>
          )}
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdding}
        className={`btn-add-quote flex items-center gap-1.5 flex-shrink-0 min-h-[44px] transition-all duration-200 ${
          isOutOfStock 
            ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground' 
            : 'hover:bg-primary/90 hover:scale-105 active:scale-95'
        } ${isAdding ? 'animate-pulse' : ''}`}
      >
        {isOutOfStock ? (
          'Out of Stock'
        ) : isAdding ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Adding...
          </>
        ) : (
          <>
            Add to Quote
            <Plus className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;
