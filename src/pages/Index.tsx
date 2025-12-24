import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategorySidebar from '@/components/CategorySidebar';
import ProductList from '@/components/ProductList';
import CartSidebar from '@/components/CartSidebar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { categories, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Menu, X } from 'lucide-react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
    if (query.trim()) {
      setActiveCategory(''); // Clear category when searching
    }
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setSearchQuery('');
    setShowMobileMenu(false);
  };

  // Dynamic SEO based on search/category
  const seoTitle = searchQuery 
    ? `Search: ${searchQuery} | ELYF EVSPARE`
    : `${activeCategoryName} | ELYF EVSPARE - Electric Vehicle Parts`;
  
  const seoDescription = searchQuery
    ? `Search results for "${searchQuery}" - Find electric vehicle spare parts, chargers, and accessories.`
    : `Shop ${activeCategoryName.toLowerCase()} and other premium electric vehicle spare parts. Quality EV components with fast delivery.`;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={`${activeCategoryName}, electric vehicle parts, EV chargers, ${searchQuery}`}
      />
      
      <Header onSearch={handleSearch} />
      <HeroBanner />
      
      <main className="flex flex-col lg:flex-row relative flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden fixed top-20 left-4 z-50 bg-background border border-border rounded-lg p-2 shadow-lg touch-target"
          aria-label="Toggle category menu"
        >
          {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Category Sidebar - Desktop */}
        <div className="hidden lg:block">
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Mobile Category Overlay */}
        {showMobileMenu && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setShowMobileMenu(false)}>
            <div className="absolute left-0 top-0 h-full w-80 max-w-[80vw] bg-background shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Categories</h2>
              </div>
              <CategorySidebar
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        )}

        {/* Mobile Category Selector - Alternative */}
        <div className="lg:hidden p-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-16 z-30">
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px]"
            aria-label="Select product category"
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
          isLoading={isLoading}
          isSearching={!!searchQuery.trim()}
        />

        {/* Cart Sidebar - Desktop */}
        <div className="hidden lg:block">
          <CartSidebar />
        </div>
      </main>

      {/* Mobile Cart - Fixed at bottom */}
      <div className="lg:hidden">
        <MobileCartSummary />
      </div>

      <Footer />
    </div>
  );
};

const MobileCartSummary = () => {
  const { getItemCount, getTotal, isLoading } = useCart();
  const [showCart, setShowCart] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const itemCount = getItemCount();
  const total = getTotal();

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg safe-area-inset-bottom">
        <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg safe-area-inset-bottom">
        <div className="text-center text-muted-foreground text-sm py-2">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-40 safe-area-inset-bottom">
        <button
          onClick={() => setShowCart(true)}
          className="w-full flex items-center justify-between bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors min-h-[44px]"
          aria-label={`View cart with ${itemCount} items`}
        >
          <span className="font-semibold">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </span>
          <span className="font-bold">{formatPrice(total * 1.18)}</span>
        </button>
      </div>

      {/* Mobile Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="h-full overflow-y-auto pb-20">
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background z-10">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-muted-foreground hover:text-foreground p-2 -m-2 min-h-[44px] min-w-[44px]"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
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
