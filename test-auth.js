// Test Authentication Script
// Run this with: node test-auth.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🔐 Testing Authentication System...\n');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Simple password hashing function (same as in auth service)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt_key_elyf');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function testAuth() {
  try {
    console.log('1. Testing password hashing...');
    
    // Test admin password
    const adminHash = await hashPassword('admin123');
    console.log(`Admin password hash: ${adminHash}`);
    
    // Test customer password
    const customerHash = await hashPassword('customer123');
    console.log(`Customer password hash: ${customerHash}`);
    
    console.log('\n2. Checking database users...');
    
    // Get all users from database
    const { data: users, error } = await supabase
      .from('users')
      .select('email, password_hash, role');
    
    if (error) {
      console.error('❌ Error fetching users:', error.message);
      return;
    }
    
    console.log(`Found ${users.length} users in database:`);
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}): ${user.password_hash}`);
    });
    
    console.log('\n3. Testing login attempts...');
    
    // Test admin login
    console.log('Testing admin login...');
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@elyfevspare.com')
      .eq('password_hash', adminHash)
      .eq('is_active', true)
      .single();
    
    if (adminError) {
      console.log(`❌ Admin login failed: ${adminError.message}`);
    } else {
      console.log(`✅ Admin login successful: ${adminUser.email}`);
    }
    
    // Test customer login
    console.log('Testing customer login...');
    const { data: customerUser, error: customerError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'customer@example.com')
      .eq('password_hash', customerHash)
      .eq('is_active', true)
      .single();
    
    if (customerError) {
      console.log(`❌ Customer login failed: ${customerError.message}`);
    } else {
      console.log(`✅ Customer login successful: ${customerUser.email}`);
    }
    
    console.log('\n4. Hash comparison...');
    
    // Compare expected vs actual hashes
    const expectedAdminHash = 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3';
    const expectedCustomerHash = 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';
    
    console.log(`Expected admin hash:    ${expectedAdminHash}`);
    console.log(`Calculated admin hash:  ${adminHash}`);
    console.log(`Admin hashes match:     ${expectedAdminHash === adminHash ? '✅' : '❌'}`);
    
    console.log(`Expected customer hash: ${expectedCustomerHash}`);
    console.log(`Calculated customer hash: ${customerHash}`);
    console.log(`Customer hashes match:  ${expectedCustomerHash === customerHash ? '✅' : '❌'}`);
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testAuth();