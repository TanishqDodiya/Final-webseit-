// Test Supabase Connection Script
// Run this with: node test-supabase-connection.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🧪 Testing Supabase Connection...\n');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Please check your .env file contains:');
  console.log('- VITE_SUPABASE_URL');
  console.log('- VITE_SUPABASE_PUBLISHABLE_KEY');
  process.exit(1);
}

console.log('📋 Configuration:');
console.log(`URL: ${SUPABASE_URL}`);
console.log(`Key: ${SUPABASE_KEY.substring(0, 20)}...`);
console.log('');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection() {
  try {
    console.log('1. Testing basic connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('categories')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check if you ran the setup-supabase.sql script');
      console.log('2. Verify your API key is correct');
      console.log('3. Check if RLS policies allow access');
      return;
    }
    
    console.log('✅ Basic connection successful\n');
    
    // Test categories
    console.log('2. Testing categories table...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*');
    
    if (catError) {
      console.error('❌ Categories error:', catError.message);
      return;
    }
    
    console.log(`✅ Found ${categories.length} categories`);
    categories.forEach(cat => console.log(`   - ${cat.name}`));
    console.log('');
    
    // Test products
    console.log('3. Testing products table...');
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('*');
    
    if (prodError) {
      console.error('❌ Products error:', prodError.message);
      return;
    }
    
    console.log(`✅ Found ${products.length} products`);
    console.log('');
    
    // Test users
    console.log('4. Testing users table...');
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('email, role');
    
    if (userError) {
      console.error('❌ Users error:', userError.message);
      return;
    }
    
    console.log(`✅ Found ${users.length} users`);
    users.forEach(user => console.log(`   - ${user.email} (${user.role})`));
    console.log('');
    
    console.log('🎉 All tests passed! Your Supabase integration is working correctly.');
    console.log('\n📋 Summary:');
    console.log(`- Categories: ${categories.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Users: ${users.length}`);
    console.log('\n🚀 You can now start your application with: npm run dev');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.log('\n🔧 Please check:');
    console.log('1. Your internet connection');
    console.log('2. Supabase project is active');
    console.log('3. API credentials are correct');
  }
}

testConnection();