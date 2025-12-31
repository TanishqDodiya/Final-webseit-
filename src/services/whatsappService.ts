import { CartItem } from '@/context/CartContext';

export interface WhatsAppOrderData {
  items: CartItem[];
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  notes?: string;
}

export class WhatsAppService {
  // WhatsApp business number (replace with actual number)
  private static readonly WHATSAPP_NUMBER = '+919876543210'; // Replace with your actual WhatsApp business number

  /**
   * Generate WhatsApp message for order
   */
  static generateOrderMessage(data: WhatsAppOrderData): string {
    const { items, customerName, customerPhone, customerAddress, notes } = data;
    
    let message = `🛒 *New Order Inquiry*\n\n`;
    
    // Customer Details
    if (customerName) {
      message += `👤 *Customer:* ${customerName}\n`;
    }
    if (customerPhone) {
      message += `📱 *Phone:* ${customerPhone}\n`;
    }
    if (customerAddress) {
      message += `📍 *Address:* ${customerAddress}\n`;
    }
    
    message += `\n📦 *Products:*\n`;
    
    // Product Details
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   SKU: ${item.product.sku}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${item.product.price.toLocaleString('en-IN')}\n\n`;
    });
    
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    message += `💰 *Order Summary:*\n`;
    message += `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
    message += `Total Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n\n`;
    
    // Notes
    if (notes && notes.trim()) {
      message += `📝 *Special Notes:*\n${notes}\n\n`;
    }
    
    message += `Please provide pricing and availability for the above items. Thank you!`;
    
    return message;
  }

  /**
   * Open WhatsApp with pre-filled message
   */
  static openWhatsApp(data: WhatsAppOrderData): void {
    const message = this.generateOrderMessage(data);
    const encodedMessage = encodeURIComponent(message);
    
    // Detect if mobile or desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl: string;
    
    if (isMobile) {
      // Mobile: Use WhatsApp app URL
      whatsappUrl = `whatsapp://send?phone=${this.WHATSAPP_NUMBER}&text=${encodedMessage}`;
    } else {
      // Desktop: Use WhatsApp Web
      whatsappUrl = `https://web.whatsapp.com/send?phone=${this.WHATSAPP_NUMBER}&text=${encodedMessage}`;
    }
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Set WhatsApp business number
   */
  static setWhatsAppNumber(number: string): void {
    // This would typically be stored in environment variables or config
    console.log(`WhatsApp number set to: ${number}`);
  }

  /**
   * Get formatted WhatsApp number
   */
  static getWhatsAppNumber(): string {
    return this.WHATSAPP_NUMBER;
  }

  /**
   * Validate WhatsApp number format
   */
  static isValidWhatsAppNumber(number: string): boolean {
    // Basic validation for international phone number format
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(number);
  }
}