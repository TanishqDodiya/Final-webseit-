import React, { useState } from 'react';
import { ShoppingBag, Minus, Plus, X, MessageCircle } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';
import CheckoutModal from './CheckoutModal';

const CartSidebar = () => {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getTotal();
  const gstRate = 0.18; // 18% GST for most items
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  if (items.length === 0) {
    return (
      <aside className="w-full lg:w-80 flex-shrink-0 border-l border-border bg-background">
        <div className="sticky top-20 p-4">
          <h2 className="text-lg font-bold text-foreground mb-6">Cart</h2>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Cart is empty</p>
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
              <h2 className="text-lg font-bold text-foreground">Cart</h2>
              <button
                onClick={clearCart}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                formatPrice={formatPrice}
              />
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
              className="btn-checkout flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Proceed to WhatsApp
            </button>
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
  return (
    <div className="cart-item animate-slide-in">
      {/* Image */}
      <div className="w-12 h-12 flex-shrink-0 bg-muted rounded overflow-hidden">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
          {item.product.name}
        </h4>
        <p className="text-xs font-semibold text-foreground mt-1">
          {formatPrice(item.product.price * item.quantity)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
          className="quantity-btn"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
          className="quantity-btn"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.product.id)}
        className="p-1 hover:bg-destructive/10 rounded transition-colors"
      >
        <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
      </button>
    </div>
  );
};

export default CartSidebar;
