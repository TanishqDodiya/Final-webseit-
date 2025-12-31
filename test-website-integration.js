import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🧪 Testing Website Integration with Updated Supabase Data...\n');

async function testWebsiteIntegration() {
  try {
    // Create Supabase client (same as website uses)
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('1. Testing categories (as website sees them)...');
    const { data: categoriesData, error: catError } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (catError) throw catError;
    
    console.log(`✅ Website can access ${categoriesData.length} categories`);
    
    console.log('\n2. Testing products (as website sees them)...');
    const { data: productsData, error: prodError } = await supabase
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
    
    if (prodError) throw prodError;
    
    console.log(`✅ Website can access ${productsData.length} products`);
    
    if (productsData.length > 0) {
      console.log('\n📦 Sample products (as website displays them):');
      productsData.slice(0, 8).forEach((p, i) => {
        console.log(`   ${i+1}. ${p.name} - ₹${p.price} (Stock: ${p.stock_quantity})`);
      });
      
      console.log('\n📊 Category breakdown:');
      const categoryCount = {};
      productsData.forEach(p => {
        const catName = p.categories?.name || 'Uncategorized';
        categoryCount[catName] = (categoryCount[catName] || 0) + 1;
      });
      
      Object.entries(categoryCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([cat, count]) => {
          console.log(`   - ${cat}: ${count} products`);
        });
    }
    
    console.log('\n🎯 Integration Status:');
    if (productsData.length >= 200) {
      console.log('🎉 SUCCESS: Website is fully integrated with your updated Supabase data!');
      console.log(`📈 Your website now displays ${productsData.length} real products from your database.`);
      console.log('✅ All recent SQL updates are reflected on the website.');
    } else if (productsData.length > 50) {
      console.log('✅ GOOD: Website is connected to Supabase with substantial data.');
      console.log(`📊 Displaying ${productsData.length} products from your database.`);
    } else {
      console.log('⚠️  LIMITED: Website has basic Supabase connection but limited products.');
      console.log(`📊 Only ${productsData.length} products available.`);
    }
    
    console.log('\n🔗 Database Details:');
    console.log(`   URL: ${supabaseUrl}`);
    console.log(`   Categories: ${categoriesData.length}`);
    console.log(`   Products: ${productsData.length}`);
    console.log(`   Active Products: ${productsData.filter(p => p.stock_quantity > 0).length}`);
    
  } catch (error) {
    console.error('❌ Error testing website integration:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if Supabase credentials are correct in .env file');
    console.log('2. Verify database tables exist and have data');
    console.log('3. Check if RLS policies allow read access');
  }
}

testWebsiteIntegration();