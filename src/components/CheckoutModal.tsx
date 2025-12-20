import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { items, getTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const subtotal = getTotal();
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    let message = `🛒 *NEW ORDER - ELYF EVSPARE*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}\n\n`;
    
    message += `📦 *Order Items:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   SKU: ${item.product.sku}\n`;
      message += `   Qty: ${item.quantity} x ${formatPrice(item.product.price)} = ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *Order Summary:*\n`;
    message += `Subtotal: ${formatPrice(subtotal)}\n`;
    message += `GST (18%): ${formatPrice(gst)}\n`;
    message += `*TOTAL: ${formatPrice(total)}*\n\n`;
    
    if (formData.notes) {
      message += `📝 *Notes:* ${formData.notes}\n\n`;
    }
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Thank you for your order! 🙏`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error('Please fill in your name and phone number');
      return;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const whatsappNumber = '919876543210'; // Replace with actual business WhatsApp number
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success('Redirecting to WhatsApp...');
    clearCart();
    onClose();
    setFormData({ name: '', phone: '', email: '', address: '', notes: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Complete Your Order</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              maxLength={100}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              maxLength={15}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              maxLength={255}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Delivery Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              maxLength={500}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Enter your delivery address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Order Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              maxLength={500}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Any special instructions?"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-muted/50 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-foreground mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items ({items.length})</span>
                <span className="text-foreground">{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="text-foreground">{formatPrice(getTotal() * 0.18)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatPrice(getTotal() * 1.18)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-checkout w-full"
          >
            Send Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
