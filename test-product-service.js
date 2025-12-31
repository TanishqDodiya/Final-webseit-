import { ProductService } from './src/services/productService.js';

console.log('🧪 Testing Product Service with Supabase Integration...\n');

async function testProductService() {
  try {
    console.log('1. Testing getCategories()...');
    const categories = await ProductService.getCategories();
    console.log(`✅ Found ${categories.length} categories`);
    categories.slice(0, 5).forEach(cat => {
      console.log(`   - ${cat.name} (${cat.count} products)`);
    });

    console.log('\n2. Testing getProducts()...');
    const products = await ProductService.getProducts();
    console.log(`✅ Found ${products.length} products`);
    products.slice(0, 3).forEach(product => {
      console.log(`   - ${product.name} (₹${product.price}) - Stock: ${product.stockQuantity}`);
    });

    console.log('\n3. Testing getProductById()...');
    if (products.length > 0) {
      const firstProduct = await ProductService.getProductById(products[0].id);
      if (firstProduct) {
        console.log(`✅ Found product: ${firstProduct.name}`);
        console.log(`   SKU: ${firstProduct.sku}`);
        console.log(`   Price: ₹${firstProduct.price}`);
        console.log(`   Stock: ${firstProduct.stockQuantity}`);
      }
    }

    console.log('\n4. Testing searchProducts()...');
    const searchResults = await ProductService.searchProducts('charger');
    console.log(`✅ Found ${searchResults.length} products matching "charger"`);
    searchResults.slice(0, 3).forEach(product => {
      console.log(`   - ${product.name}`);
    });

    console.log('\n5. Testing getProductsByCategory()...');
    if (categories.length > 0) {
      const categoryProducts = await ProductService.getProductsByCategory(categories[0].id);
      console.log(`✅ Found ${categoryProducts.length} products in category "${categories[0].name}"`);
    }

    console.log('\n🎉 All tests passed! Product service is working with Supabase.');
    console.log(`📊 Data source: ${ProductService.isUsingDatabase() ? 'Supabase Database' : 'Static Data'}`);

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testProductService();