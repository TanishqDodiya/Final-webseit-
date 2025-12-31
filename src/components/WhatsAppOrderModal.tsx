import React, { useState } from 'react';
import { X, MessageCircle, User, Phone, MapPin, FileText } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WhatsAppService } from '@/services/whatsappService';
import { toast } from 'sonner';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({ isOpen, onClose }) => {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
    customerPhone: user?.phone || '',
    customerAddress: user?.address || '',
    notes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.customerPhone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare WhatsApp order data
      const orderData = {
        items,
        customerName: formData.customerName.trim(),
        customerPhone: formData.customerPhone.trim(),
        customerAddress: formData.customerAddress.trim() || undefined,
        notes: formData.notes.trim() || undefined,
      };

      // Open WhatsApp with pre-filled message
      WhatsAppService.openWhatsApp(orderData);
      
      // Show success message
      toast.success('Opening WhatsApp with your order details!', {
        description: 'Complete your order by sending the message.',
        duration: 4000,
      });
      
      // Clear cart after successful WhatsApp redirect
      setTimeout(() => {
        clearCart();
        onClose();
      }, 1000);
      
    } catch (error) {
      toast.error('Failed to open WhatsApp. Please try again.');
      console.error('WhatsApp order error:', error);
    } finally {
      setIsSubmitting(false);
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

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Order on WhatsApp</h2>
              <p className="text-sm text-muted-foreground">Send your order directly via WhatsApp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 -m-2 touch-target"
            aria-label="Close order form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleWhatsAppOrder} className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Order Summary</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              {items.slice(0, 3).map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-sm">
                  <div className="flex-1">
                    <p className="font-medium text-foreground line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} × {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <p className="font-medium text-foreground">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
              
              {items.length > 3 && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  ... and {items.length - 3} more items
                </p>
              )}
              
              <div className="border-t border-border pt-3 space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Total Items:</span>
                  <span className="text-foreground">{totalItems}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total Value:</span>
                  <span className="text-foreground">{formatPrice(totalValue)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Your Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  required
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerPhone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  required
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerAddress" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address (Optional)
                </Label>
                <Input
                  id="customerAddress"
                  type="text"
                  value={formData.customerAddress}
                  onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                  className="form-input"
                  placeholder="Enter your address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Special Notes (Optional)
                </Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="form-input min-h-[80px] resize-none"
                  placeholder="Any special requirements or notes"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-green-800 mb-1">How it works:</p>
                <ul className="text-green-700 space-y-1">
                  <li>• Click "Send WhatsApp Message" below</li>
                  <li>• WhatsApp will open with your order details</li>
                  <li>• Send the message to complete your order</li>
                  <li>• We'll respond with pricing and availability</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Opening WhatsApp...
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send WhatsApp Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppOrderModal;