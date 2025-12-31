import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database service for products and categories
export const DatabaseService = {
  // Fetch all categories
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      // Transform to match frontend interface
      return data.map(cat => ({
        id: cat.slug,
        name: cat.name,
        count: 0 // Will be calculated separately
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Fetch all products
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      
      // Transform to match frontend interface
      return data.map(product => ({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        unit: product.unit,
        image: product.image,
        images: [product.image], // Single image for now
        category: product.categories?.slug || 'accessories',
        sku: product.sku,
        description: `Premium ${product.name} - High quality electric vehicle spare part.`,
        features: [
          'High quality construction',
          'Reliable performance',
          'Easy installation',
          'Warranty included'
        ],
        specifications: {
          'SKU': product.sku,
          'Unit': product.unit,
          'Category': product.categories?.name || 'Accessories'
        },
        useCases: [
          'Electric vehicles',
          'E-bikes and scooters',
          'Industrial applications'
        ],
        inStock: product.stock_quantity > 0,
        stockQuantity: product.stock_quantity,
        rating: 4.5,
        reviewCount: Math.floor(Math.random() * 200) + 10,
        brand: 'ELYF',
        tags: [product.categories?.slug || 'accessories', 'quality', 'reliable']
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Fetch products by category
  async getProductsByCategory(categorySlug: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .eq('is_active', true)
        .eq('categories.slug', categorySlug)
        .order('name');
      
      if (error) throw error;
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        unit: product.unit,
        image: product.image,
        images: [product.image],
        category: product.categories?.slug || 'accessories',
        sku: product.sku,
        description: `Premium ${product.name} - High quality electric vehicle spare part.`,
        features: [
          'High quality construction',
          'Reliable performance',
          'Easy installation',
          'Warranty included'
        ],
        specifications: {
          'SKU': product.sku,
          'Unit': product.unit,
          'Category': product.categories?.name || 'Accessories'
        },
        useCases: [
          'Electric vehicles',
          'E-bikes and scooters',
          'Industrial applications'
        ],
        inStock: product.stock_quantity > 0,
        stockQuantity: product.stock_quantity,
        rating: 4.5,
        reviewCount: Math.floor(Math.random() * 200) + 10,
        brand: 'ELYF',
        tags: [product.categories?.slug || 'accessories', 'quality', 'reliable']
      }));
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Fetch single product by ID
  async getProductById(id: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        name: data.name,
        price: parseFloat(data.price),
        unit: data.unit,
        image: data.image,
        images: [data.image],
        category: data.categories?.slug || 'accessories',
        sku: data.sku,
        description: `Premium ${data.name} - High quality electric vehicle spare part with advanced features and reliable performance.`,
        features: [
          'High quality construction',
          'Reliable performance',
          'Easy installation',
          'Warranty included',
          'Tested for durability',
          'Professional grade components'
        ],
        specifications: {
          'SKU': data.sku,
          'Unit': data.unit,
          'Category': data.categories?.name || 'Accessories',
          'Stock': data.stock_quantity.toString(),
          'Brand': 'ELYF'
        },
        useCases: [
          'Electric vehicles',
          'E-bikes and scooters',
          'Industrial applications',
          'Commercial use',
          'Personal transportation'
        ],
        inStock: data.stock_quantity > 0,
        stockQuantity: data.stock_quantity,
        rating: 4.5,
        reviewCount: Math.floor(Math.random() * 200) + 10,
        brand: 'ELYF',
        tags: [data.categories?.slug || 'accessories', 'quality', 'reliable']
      };
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  },

  // Search products
  async searchProducts(query: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,sku.ilike.%${query}%`)
        .order('name');
      
      if (error) throw error;
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        unit: product.unit,
        image: product.image,
        images: [product.image],
        category: product.categories?.slug || 'accessories',
        sku: product.sku,
        description: `Premium ${product.name} - High quality electric vehicle spare part.`,
        features: [
          'High quality construction',
          'Reliable performance',
          'Easy installation',
          'Warranty included'
        ],
        specifications: {
          'SKU': product.sku,
          'Unit': product.unit,
          'Category': product.categories?.name || 'Accessories'
        },
        useCases: [
          'Electric vehicles',
          'E-bikes and scooters',
          'Industrial applications'
        ],
        inStock: product.stock_quantity > 0,
        stockQuantity: product.stock_quantity,
        rating: 4.5,
        reviewCount: Math.floor(Math.random() * 200) + 10,
        brand: 'ELYF',
        tags: [product.categories?.slug || 'accessories', 'quality', 'reliable']
      }));
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};