import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Star, Shield, Truck, RotateCcw, Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { ProductService } from '@/services/productService';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import RelatedProducts from '@/components/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [isLoading, setIsLoading] = useState(true);

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const productData = await ProductService.getProductById(id);
        if (productData) {
          setProduct(productData);
          
          // Load related products
          const related = await ProductService.getRelatedProducts(id, productData.category, 6);
          setRelatedProducts(related);
        } else {
          navigate('/404', { replace: true });
        }
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/404', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const currentCartItem = items.find(item => item.product.id === product?.id);
  const currentQuantity = currentCartItem?.quantity || 0;
  const maxQuantity = Math.max(0, (product?.stockQuantity || 0) - currentQuantity);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-12 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const handleAddToCart = async () => {
    if (isAddingToCart || maxQuantity === 0) return;
    
    setIsAddingToCart(true);
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    } finally {
      setTimeout(() => setIsAddingToCart(false), 500);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${product.name} | SHREE ASHAPURA AUTO PARTS EV`}
        description={product.description || `Buy ${product.name} - Premium electric vehicle spare part. SKU: ${product.sku}. Price: ${formatPrice(product.price)}`}
        keywords={`${product.name}, ${product.sku}, ${product.brand}, electric vehicle parts, EV spare parts, ${product.tags?.join(', ')}`}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 touch-target"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index 
                        ? 'border-primary' 
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                <span className="text-muted-foreground">/ {product.unit}</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">SKU:</span>
                <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {product.sku}
                </span>
              </div>
              {product.brand && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Brand:</span>
                  <span className="text-sm font-medium">{product.brand}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Stock:</span>
                <span className={`text-sm font-medium ${
                  product.stockQuantity > 10 
                    ? 'text-green-600' 
                    : product.stockQuantity > 0 
                    ? 'text-orange-600' 
                    : 'text-red-600'
                }`}>
                  {product.stockQuantity > 0 
                    ? `${product.stockQuantity} available` 
                    : 'Out of stock'
                  }
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity}
                    className="quantity-btn"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {maxQuantity < 5 && maxQuantity > 0 && (
                  <span className="text-sm text-orange-600">
                    Only {maxQuantity} left
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={maxQuantity === 0 || isAddingToCart}
                  className={`flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2 ${
                    maxQuantity === 0 
                      ? 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground' 
                      : ''
                  } ${isAddingToCart ? 'animate-pulse' : ''}`}
                >
                  {maxQuantity === 0 ? (
                    'Out of Stock'
                  ) : isAddingToCart ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      Add to Cart
                      <Plus className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors touch-target">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-xs font-medium">Warranty</span>
                <span className="text-xs text-muted-foreground">1 Year</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-xs font-medium">Fast Delivery</span>
                <span className="text-xs text-muted-foreground">2-3 Days</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-xs font-medium">Easy Returns</span>
                <span className="text-xs text-muted-foreground">7 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <div className="border-b border-border mb-6">
            <nav className="flex gap-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 px-1 border-b-2 font-medium transition-colors touch-target ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="prose prose-sm max-w-none">
            {activeTab === 'description' && (
              <div className="space-y-6">
                {product.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}
                
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.useCases && product.useCases.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Ideal Use Cases</h3>
                    <ul className="space-y-2">
                      {product.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="font-medium text-muted-foreground">{key}:</span>
                        <span className="text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Reviews feature coming soon!</p>
                  <p className="text-sm mt-2">
                    Current rating: {product.rating || 0}/5 ({product.reviewCount || 0} reviews)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;