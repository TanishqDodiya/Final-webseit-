import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Page Not Found | SHREE ASHAPURA AUTO PARTS EV"
        description="The page you're looking for doesn't exist. Browse our electric vehicle spare parts and accessories."
      />
      
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="text-6xl font-bold text-muted-foreground mb-4">404</div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to browsing our products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific?
            </p>
            <Link
              to="/"
              className="text-primary hover:text-primary/80 font-medium text-sm flex items-center justify-center gap-1"
            >
              <Search className="w-4 h-4" />
              Browse All Products
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;