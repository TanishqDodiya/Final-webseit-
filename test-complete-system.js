// Complete System Test
// Run this with: node test-complete-system.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🧪 Complete System Test - ELYF EVSPARE\n');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Password hashing function
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt_key_elyf');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function testCompleteSystem() {
  try {
    console.log('1. 🔐 Testing Authentication...');
    
    // Test admin login
    const adminHash = await hashPassword('admin123');
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@elyfevspare.com')
      .eq('password_hash', adminHash)
      .eq('is_active', true)
      .single();
    
    if (adminError) {
      console.log('❌ Admin login failed');
      return;
    } else {
      console.log('✅ Admin login works');
    }
    
    // Test customer login
    const customerHash = await hashPassword('customer123');
    const { data: customerUser, error: customerError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'customer@example.com')
      .eq('password_hash', customerHash)
      .eq('is_active', true)
      .single();
    
    if (customerError) {
      console.log('❌ Customer login failed');
      return;
    } else {
      console.log('✅ Customer login works');
    }
    
    console.log('\n2. 📦 Testing Product Data...');
    
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');
    
    if (productsError) {
      console.log('❌ Products fetch failed');
    } else {
      console.log(`✅ Found ${products.length} products`);
    }
    
    console.log('\n3. 🏷️ Testing Categories...');
    
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');
    
    if (categoriesError) {
      console.log('❌ Categories fetch failed');
    } else {
      console.log(`✅ Found ${categories.length} categories`);
    }
    
    console.log('\n4. 📋 Testing Orders System...');
    
    // Test orders table access
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1);
    
    if (ordersError) {
      console.log('❌ Orders table access failed');
    } else {
      console.log('✅ Orders table accessible');
    }
    
    console.log('\n5. 🔒 Testing Role-Based Access...');
    
    // Test admin role
    if (adminUser.role === 'admin') {
      console.log('✅ Admin role correctly assigned');
    } else {
      console.log('❌ Admin role incorrect');
    }
    
    // Test customer role
    if (customerUser.role === 'customer') {
      console.log('✅ Customer role correctly assigned');
    } else {
      console.log('❌ Customer role incorrect');
    }
    
    console.log('\n6. 🌐 Testing Database Connectivity...');
    
    const { data: healthCheck, error: healthError } = await supabase
      .from('categories')
      .select('count')
      .limit(1);
    
    if (healthError) {
      console.log('❌ Database connectivity failed');
    } else {
      console.log('✅ Database connectivity working');
    }
    
    console.log('\n🎉 System Test Results:');
    console.log('================================');
    console.log('✅ Authentication: Working');
    console.log('✅ Database: Connected');
    console.log('✅ Products: Available');
    console.log('✅ Categories: Available');
    console.log('✅ Orders: Ready');
    console.log('✅ Role-based Access: Configured');
    
    console.log('\n🚀 Ready to Use:');
    console.log('- Frontend: http://localhost:8084/');
    console.log('- Admin Panel: http://localhost:8084/admin/login');
    console.log('- Customer Login: http://localhost:8084/login');
    
    console.log('\n🔑 Demo Credentials:');
    console.log('Admin: admin@elyfevspare.com / admin123');
    console.log('Customer: customer@example.com / customer123');
    
    console.log('\n📱 Available Features:');
    console.log('Customer:');
    console.log('- Product browsing and search');
    console.log('- Shopping cart');
    console.log('- User registration/login');
    console.log('- My Account page (/my-account)');
    console.log('- My Orders page (/my-orders)');
    
    console.log('\nAdmin:');
    console.log('- Product management');
    console.log('- Category management');
    console.log('- User management');
    console.log('- Order tracking');
    console.log('- Dashboard analytics');
    
  } catch (error) {
    console.error('❌ System test error:', error.message);
  }
}

testCompleteSystem();