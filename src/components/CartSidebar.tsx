import React, { useState } from 'react';
import { ShoppingBag, Minus, Plus, X, MessageCircle } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';
import CheckoutModal from './CheckoutModal';

const CartSidebar = () => {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart, isLoading } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const subtotal = getTotal();
  const gstRate = 0.18; // 18% GST for most items
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  if (isLoading) {
    return (
      <aside className="w-full lg:w-80 flex-shrink-0 border-l border-border bg-background">
        <div className="sticky top-20 p-4">
          <div className="h-6 bg-muted rounded animate-pulse mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-12 h-12 bg-muted rounded"></div>
                <div className="flex-1">
                  <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (items.length === 0) {
    return (
      <aside className="w-full lg:w-80 flex-shrink-0 border-l border-border bg-background">
        <div className="sticky top-20 p-4">
          <h2 className="text-lg font-bold text-foreground mb-6">Cart</h2>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm text-center">
              Your cart is empty<br />
              <span className="text-xs">Add some products to get started</span>
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <>
      <aside className="w-full lg:w-80 flex-shrink-0 border-l border-border bg-background">
        <div className="sticky top-20 flex flex-col max-h-[calc(100vh-5rem)]">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                Cart ({items.length})
              </h2>
              <button
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors touch-target"
                aria-label="Clear cart"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {items.map((item, index) => (
              <div key={item.product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CartItemRow
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  formatPrice={formatPrice}
                />
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="text-foreground">{formatPrice(gst)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-checkout flex items-center justify-center gap-2 touch-target"
              aria-label="Proceed to checkout"
            >
              <MessageCircle className="w-5 h-5" />
              Request Quote
            </button>
            
            <p className="text-xs text-muted-foreground text-center mt-2">
              Get instant quote via WhatsApp
            </p>
          </div>
        </div>
      </aside>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  formatPrice: (price: number) => string;
}

const CartItemRow = ({ item, onUpdateQuantity, onRemove, formatPrice }: CartItemRowProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      onUpdateQuantity(item.product.id, newQuantity);
    } finally {
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  return (
    <div className="cart-item group">
      {/* Image */}
      <div className="w-12 h-12 flex-shrink-0 bg-muted rounded overflow-hidden">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          width="48"
          height="48"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-medium text-foreground line-clamp-2 leading-tight mb-1">
          {item.product.name}
        </h4>
        <p className="text-xs text-muted-foreground mb-1">
          {formatPrice(item.product.price)} × {item.quantity}
        </p>
        <p className="text-sm font-semibold text-foreground">
          {formatPrice(item.product.price * item.quantity)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isUpdating || item.quantity <= 1}
          className="quantity-btn"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center text-sm font-medium">
          {isUpdating ? '...' : item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
          className="quantity-btn"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.product.id)}
        className="p-1 hover:bg-destructive/10 rounded transition-colors touch-target"
        aria-label="Remove item"
      >
        <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
      </button>
    </div>
  );
};

export default CartSidebar;
