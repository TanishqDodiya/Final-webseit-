import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor" aria-hidden="true">
                  <path d="M12 2L8 6H4v4l-4 4 4 4v4h4l4 4 4-4h4v-4l4-4-4-4V6h-4L12 2zm0 4l2.5 2.5H17v2.5L19.5 12 17 14.5V17h-2.5L12 19.5 9.5 17H7v-2.5L4.5 12 7 9.5V7h2.5L12 4.5z"/>
                </svg>
              </div>
              <span className="font-bold text-foreground">SHREE ASHAPURA AUTO PARTS EV</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium electric vehicle spare parts and accessories. Quality components for all your EV needs.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat: 9AM-6PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/my-account" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                My Account
              </Link>
              <Link to="/my-orders" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                My Orders
              </Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms & Conditions
              </a>
            </nav>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                EV Chargers
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Controllers
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Hub Motors
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Battery Packs
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Accessories
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@shreeashapuraautoparts.com" className="hover:text-foreground transition-colors">
                  info@shreeashapuraautoparts.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-foreground transition-colors">
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Electric Vehicle Parts Hub<br />
                  Industrial Area, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} SHREE ASHAPURA AUTO PARTS EV. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Return Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;