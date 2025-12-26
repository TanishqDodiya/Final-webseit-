import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  date: string;
}

const AdminOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-20241222-0001',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 1248,
      status: 'pending',
      items: 3,
      date: '2024-12-22'
    },
    {
      id: '2',
      orderNumber: 'ORD-20241222-0002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 2450,
      status: 'confirmed',
      items: 5,
      date: '2024-12-22'
    },
    {
      id: '3',
      orderNumber: 'ORD-20241221-0015',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      total: 890,
      status: 'shipped',
      items: 2,
      date: '2024-12-21'
    },
    {
      id: '4',
      orderNumber: 'ORD-20241221-0014',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      total: 1650,
      status: 'delivered',
      items: 4,
      date: '2024-12-21'
    },
    {
      id: '5',
      orderNumber: 'ORD-20241220-0008',
      customer: 'David Brown',
      email: 'david@example.com',
      total: 3200,
      status: 'processing',
      items: 6,
      date: '2024-12-20'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Pending', 
          variant: 'secondary' as const, 
          icon: Clock,
          color: 'text-yellow-600 bg-yellow-100'
        };
      case 'confirmed':
        return { 
          label: 'Confirmed', 
          variant: 'default' as const, 
          icon: CheckCircle,
          color: 'text-blue-600 bg-blue-100'
        };
      case 'processing':
        return { 
          label: 'Processing', 
          variant: 'secondary' as const, 
          icon: Package,
          color: 'text-purple-600 bg-purple-100'
        };
      case 'shipped':
        return { 
          label: 'Shipped', 
          variant: 'default' as const, 
          icon: Truck,
          color: 'text-indigo-600 bg-indigo-100'
        };
      case 'delivered':
        return { 
          label: 'Delivered', 
          variant: 'default' as const, 
          icon: CheckCircle,
          color: 'text-green-600 bg-green-100'
        };
      case 'cancelled':
        return { 
          label: 'Cancelled', 
          variant: 'destructive' as const, 
          icon: AlertCircle,
          color: 'text-red-600 bg-red-100'
        };
      default:
        return { 
          label: 'Unknown', 
          variant: 'secondary' as const, 
          icon: AlertCircle,
          color: 'text-gray-600 bg-gray-100'
        };
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all customer orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orderStats.total}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-purple-600">{orderStats.processing}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shipped</p>
                <p className="text-2xl font-bold text-indigo-600">{orderStats.shipped}</p>
              </div>
              <Truck className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by number, customer, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            {filteredOrders.length} of {orders.length} orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${statusConfig.color}`}>
                      <StatusIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(order.total)}</p>
                      <p className="text-sm text-muted-foreground">{order.items} items</p>
                    </div>
                    
                    <Badge variant={statusConfig.variant} className="min-w-[80px] justify-center">
                      {statusConfig.label}
                    </Badge>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          Print Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Orders will appear here when customers place them.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;