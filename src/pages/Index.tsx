import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategorySidebar from '@/components/CategorySidebar';
import ProductList from '@/components/ProductList';
import CartSidebar from '@/components/CartSidebar';
import { categories, products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.category === activeCategory);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  const activeCategoryName = useMemo(() => {
    if (searchQuery.trim()) return `Search: "${searchQuery}"`;
    return categories.find(c => c.id === activeCategory)?.name || '';
  }, [activeCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      <HeroBanner />
      
      <main className="flex flex-col lg:flex-row">
        {/* Category Sidebar - Hidden on mobile, shown in drawer */}
        <div className="hidden lg:block">
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(id) => {
              setActiveCategory(id);
              setSearchQuery('');
            }}
          />
        </div>

        {/* Mobile Category Selector */}
        <div className="lg:hidden p-4 border-b border-border">
          <select
            value={activeCategory}
            onChange={(e) => {
              setActiveCategory(e.target.value);
              setSearchQuery('');
            }}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* Product List */}
        <ProductList
          products={filteredProducts}
          categoryName={activeCategoryName}
        />

        {/* Cart Sidebar - Fixed on desktop, shown at bottom on mobile */}
        <div className="hidden lg:block">
          <CartSidebar />
        </div>
      </main>

      {/* Mobile Cart - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg">
        <MobileCartSummary />
      </div>
    </div>
  );
};

const MobileCartSummary = () => {
  const { getItemCount, getTotal } = useCart();
  const [showCart, setShowCart] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const itemCount = getItemCount();
  const total = getTotal();

  if (itemCount === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm">
        Your cart is empty
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowCart(true)}
        className="w-full flex items-center justify-between bg-primary text-primary-foreground px-4 py-3 rounded-lg"
      >
        <span className="font-semibold">{itemCount} items</span>
        <span className="font-bold">{formatPrice(total * 1.18)}</span>
      </button>

      {/* Mobile Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="h-full overflow-y-auto pb-20">
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-muted-foreground"
              >
                Close
              </button>
            </div>
            <CartSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
