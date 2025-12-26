import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  // Mock analytics data
  const analytics = {
    revenue: {
      current: 125000,
      previous: 98000,
      growth: 27.6
    },
    orders: {
      current: 128,
      previous: 95,
      growth: 34.7
    },
    customers: {
      current: 45,
      previous: 38,
      growth: 18.4
    },
    products: {
      current: 35,
      previous: 32,
      growth: 9.4
    }
  };

  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, orders: 32 },
    { month: 'Feb', revenue: 52000, orders: 38 },
    { month: 'Mar', revenue: 48000, orders: 35 },
    { month: 'Apr', revenue: 61000, orders: 42 },
    { month: 'May', revenue: 55000, orders: 39 },
    { month: 'Jun', revenue: 67000, orders: 48 },
    { month: 'Jul', revenue: 72000, orders: 52 },
    { month: 'Aug', revenue: 69000, orders: 49 },
    { month: 'Sep', revenue: 78000, orders: 56 },
    { month: 'Oct', revenue: 85000, orders: 61 },
    { month: 'Nov', revenue: 92000, orders: 68 },
    { month: 'Dec', revenue: 125000, orders: 89 }
  ];

  const topProducts = [
    { name: '[IMP 67.2V+6A] LITHIUM EV CHARGER', sales: 45, revenue: 33660 },
    { name: '48V 25A SINE WAVE CONTROLLER', sales: 28, revenue: 35000 },
    { name: '60V 24AH LITHIUM BATTERY PACK', sales: 18, revenue: 27900 },
    { name: '[IMP 54.6V+5A] LITHIUM EV CHARGER', sales: 32, revenue: 20736 },
    { name: '500W HUB MOTOR - REAR', sales: 12, revenue: 54000 }
  ];

  const categoryBreakdown = [
    { category: '60V Lithium Charger', percentage: 28, revenue: 35000 },
    { category: 'Controllers', percentage: 22, revenue: 27500 },
    { category: 'Battery Packs', percentage: 18, revenue: 22500 },
    { category: 'Hub Motors', percentage: 15, revenue: 18750 },
    { category: '48V Lithium Charger', percentage: 10, revenue: 12500 },
    { category: 'Others', percentage: 7, revenue: 8750 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatGrowth = (growth: number) => {
    const isPositive = growth > 0;
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span className="text-xs font-medium">{Math.abs(growth).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Track your business performance and insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.revenue.current)}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">vs last month</p>
              {formatGrowth(analytics.revenue.growth)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.orders.current}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">vs last month</p>
              {formatGrowth(analytics.orders.growth)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.customers.current}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">vs last month</p>
              {formatGrowth(analytics.customers.growth)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.products.current}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">vs last month</p>
              {formatGrowth(analytics.products.growth)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monthly Revenue
            </CardTitle>
            <CardDescription>
              Revenue and order trends over the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyRevenue.slice(-6).map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 text-sm text-muted-foreground">{data.month}</div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${(data.revenue / 125000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatCurrency(data.revenue)}</div>
                    <div className="text-xs text-muted-foreground">{data.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Sales by Category
            </CardTitle>
            <CardDescription>
              Revenue breakdown by product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryBreakdown.map((category, index) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)` 
                      }}
                    />
                    <span className="text-sm font-medium">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{category.percentage}%</div>
                    <div className="text-xs text-muted-foreground">{formatCurrency(category.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Top Selling Products
          </CardTitle>
          <CardDescription>
            Best performing products by sales volume and revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(product.revenue)}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(976)}</div>
            <p className="text-sm text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3.2%</div>
            <p className="text-sm text-muted-foreground">+0.8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">68%</div>
            <p className="text-sm text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;