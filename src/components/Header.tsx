import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const { getItemCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between px-5 h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
              <path d="M12 2L8 6H4v4l-4 4 4 4v4h4l4 4 4-4h4v-4l4-4-4-4V6h-4L12 2zm0 4l2.5 2.5H17v2.5L19.5 12 17 14.5V17h-2.5L12 19.5 9.5 17H7v-2.5L4.5 12 7 9.5V7h2.5L12 4.5z"/>
            </svg>
          </div>
          <span className="font-bold text-foreground text-sm">ELYF EVSPARE</span>
        </div>

        {/* Center Link */}
        <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
          Terms and Conditions
        </a>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {searchOpen ? (
            <div className="relative animate-fade-in">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                onBlur={() => !searchQuery && setSearchOpen(false)}
                autoFocus
                className="w-48 px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          )}

          {/* Cart Badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            <span className="text-sm font-semibold text-foreground">{getItemCount()}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
