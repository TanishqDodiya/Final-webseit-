import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';
import { authService } from './auth';

export type DatabaseOrder = Tables<'orders'>;
export type DatabaseOrderItem = Tables<'order_items'>;
export type OrderInsert = TablesInsert<'orders'>;
export type OrderItemInsert = TablesInsert<'order_items'>;

export interface OrderWithItems extends DatabaseOrder {
  order_items: (DatabaseOrderItem & {
    product: {
      id: string;
      name: string;
      sku: string;
      image: string;
      price: number;
    };
  })[];
}

export interface CreateOrderData {
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
  shippingAddress?: string;
  billingAddress?: string;
  notes?: string;
}

export class OrderService {
  // Get orders for the current user
  static async getUserOrders(): Promise<OrderWithItems[]> {
    const user = authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (
            id,
            name,
            sku,
            image,
            price
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }

    return data || [];
  }

  // Get a specific order by ID (user can only access their own orders)
  static async getOrderById(orderId: string): Promise<OrderWithItems | null> {
    const user = authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (
            id,
            name,
            sku,
            image,
            price
          )
        )
      `)
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error('Error fetching order:', error);
      throw new Error(`Failed to fetch order: ${error.message}`);
    }

    return data;
  }

  // Create a new order
  static async createOrder(orderData: CreateOrderData): Promise<DatabaseOrder> {
    const user = authService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Calculate totals
    const subtotal = orderData.items.reduce((sum, item) => 
      sum + (item.unitPrice * item.quantity), 0
    );
    const taxAmount = subtotal * 0.18; // 18% GST
    const totalAmount = subtotal + taxAmount;

    try {
      // Start a transaction by creating the order first
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          subtotal,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          shipping_address: orderData.shippingAddress,
          billing_address: orderData.billingAddress,
          notes: orderData.notes,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) {
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      // Create order items
      const orderItems: OrderItemInsert[] = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.unitPrice * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        // If order items creation fails, we should ideally rollback the order
        // For now, we'll just throw an error
        throw new Error(`Failed to create order items: ${itemsError.message}`);
      }

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to create order');
    }
  }

  // Admin-only methods
  static async getAllOrders(): Promise<OrderWithItems[]> {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Admin access required');
    }

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        user:users (
          id,
          email,
          first_name,
          last_name
        ),
        order_items (
          *,
          product:products (
            id,
            name,
            sku,
            image,
            price
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all orders:', error);
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }

    return data || [];
  }

  static async updateOrderStatus(orderId: string, status: string): Promise<void> {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Admin access required');
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid order status');
    }

    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  }

  // Get order statistics (admin only)
  static async getOrderStats(): Promise<{
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalRevenue: number;
  }> {
    if (!authService.isAdmin()) {
      throw new Error('Unauthorized: Admin access required');
    }

    const { data, error } = await supabase
      .from('orders')
      .select('status, total_amount');

    if (error) {
      throw new Error(`Failed to fetch order statistics: ${error.message}`);
    }

    const stats = {
      totalOrders: data.length,
      pendingOrders: data.filter(order => order.status === 'pending').length,
      completedOrders: data.filter(order => order.status === 'delivered').length,
      totalRevenue: data.reduce((sum, order) => sum + order.total_amount, 0)
    };

    return stats;
  }
}

export default OrderService;