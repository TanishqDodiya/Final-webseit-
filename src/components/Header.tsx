import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, X, Shield, LayoutDashboard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const { getItemCount } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch?.('');
    setSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const itemCount = getItemCount();

  return (
    <>
      {/* Admin Bar - Only show when admin is viewing store */}
      {isAdmin && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Admin Mode</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Viewing store as administrator
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <header className={`header-sticky transition-all duration-200 ${
        isScrolled ? 'shadow-md bg-background/98' : 'bg-background'
      }`}>
        <div className="flex items-center justify-between px-4 sm:px-5 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor" aria-hidden="true">
                <path d="M12 2L8 6H4v4l-4 4 4 4v4h4l4 4 4-4h4v-4l4-4-4-4V6h-4L12 2zm0 4l2.5 2.5H17v2.5L19.5 12 17 14.5V17h-2.5L12 19.5 9.5 17H7v-2.5L4.5 12 7 9.5V7h2.5L12 4.5z"/>
              </svg>
            </div>
            <span className="font-bold text-foreground text-sm sm:text-base">ELYF EVSPARE</span>
          </Link>

          {/* Center Link - Hidden on mobile */}
          <a 
            href="#" 
            className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            onClick={(e) => e.preventDefault()}
          >
            Terms and Conditions
          </a>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="relative animate-slide-up">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-48 sm:w-64 px-3 py-2 pl-10 pr-10 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Search products"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors touch-target"
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Cart Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              <span className="text-sm font-semibold text-foreground min-w-[1ch]">
                {itemCount}
              </span>
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 touch-target">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {user?.firstName?.[0] || user?.email[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm">
                      {user?.firstName || 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium line-clamp-1">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-muted-foreground line-clamp-1">{user?.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/my-account" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-orders" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="w-full">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="touch-target">
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="touch-target">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;