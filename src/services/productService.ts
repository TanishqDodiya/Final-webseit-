import { Product, Category } from '@/data/products';
import { DatabaseService } from './database';
import { products as staticProducts, categories as staticCategories } from '@/data/products';

// Product service that uses Supabase as primary source with static fallback
export class ProductService {
  private static useDatabase = true; // Toggle to switch between database and static data

  // Get all categories
  static async getCategories(): Promise<Category[]> {
    if (this.useDatabase) {
      try {
        const dbCategories = await DatabaseService.getCategories();
        if (dbCategories.length > 0) {
          // Calculate product counts for each category
          const products = await this.getProducts();
          return dbCategories.map(cat => ({
            ...cat,
            count: products.filter(p => p.category === cat.id).length
          }));
        }
      } catch (error) {
        console.warn('Failed to fetch categories from database, using static data:', error);
      }
    }
    
    return staticCategories;
  }

  // Get all products
  static async getProducts(): Promise<Product[]> {
    if (this.useDatabase) {
      try {
        const dbProducts = await DatabaseService.getProducts();
        if (dbProducts.length > 0) {
          return dbProducts;
        }
      } catch (error) {
        console.warn('Failed to fetch products from database, using static data:', error);
      }
    }
    
    return staticProducts;
  }

  // Get products by category
  static async getProductsByCategory(categoryId: string): Promise<Product[]> {
    if (this.useDatabase) {
      try {
        const dbProducts = await DatabaseService.getProductsByCategory(categoryId);
        if (dbProducts.length > 0) {
          return dbProducts;
        }
      } catch (error) {
        console.warn('Failed to fetch products by category from database, using static data:', error);
      }
    }
    
    return staticProducts.filter(p => p.category === categoryId);
  }

  // Get single product by ID
  static async getProductById(id: string): Promise<Product | null> {
    if (this.useDatabase) {
      try {
        const dbProduct = await DatabaseService.getProductById(id);
        if (dbProduct) {
          return dbProduct;
        }
      } catch (error) {
        console.warn('Failed to fetch product by ID from database, using static data:', error);
      }
    }
    
    return staticProducts.find(p => p.id === id) || null;
  }

  // Search products
  static async searchProducts(query: string): Promise<Product[]> {
    if (this.useDatabase) {
      try {
        const dbProducts = await DatabaseService.searchProducts(query);
        if (dbProducts.length > 0) {
          return dbProducts;
        }
      } catch (error) {
        console.warn('Failed to search products in database, using static data:', error);
      }
    }
    
    // Fallback to static search
    const lowerQuery = query.toLowerCase();
    return staticProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery)
    );
  }

  // Get related products (same category, excluding current product)
  static async getRelatedProducts(productId: string, categoryId: string, limit: number = 6): Promise<Product[]> {
    const products = await this.getProductsByCategory(categoryId);
    return products
      .filter(p => p.id !== productId)
      .slice(0, limit);
  }

  // Toggle between database and static data (for testing)
  static setUseDatabase(use: boolean) {
    this.useDatabase = use;
  }

  // Check if using database
  static isUsingDatabase(): boolean {
    return this.useDatabase;
  }
}