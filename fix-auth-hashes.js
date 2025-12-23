// Fix Authentication Hashes
// Run this with: node fix-auth-hashes.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🔧 Fixing Authentication Hashes...\n');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Simple password hashing function (same as in auth service)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt_key_elyf');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function fixHashes() {
  try {
    console.log('1. Calculating correct password hashes...');
    
    const adminHash = await hashPassword('admin123');
    const customerHash = await hashPassword('customer123');
    
    console.log(`Admin hash: ${adminHash}`);
    console.log(`Customer hash: ${customerHash}`);
    
    console.log('\n2. Updating admin user...');
    const { error: adminError } = await supabase
      .from('users')
      .update({ password_hash: adminHash })
      .eq('email', 'admin@elyfevspare.com');
    
    if (adminError) {
      console.error('❌ Failed to update admin:', adminError.message);
    } else {
      console.log('✅ Admin password hash updated');
    }
    
    console.log('\n3. Updating customer user...');
    const { error: customerError } = await supabase
      .from('users')
      .update({ password_hash: customerHash })
      .eq('email', 'customer@example.com');
    
    if (customerError) {
      console.error('❌ Failed to update customer:', customerError.message);
    } else {
      console.log('✅ Customer password hash updated');
    }
    
    console.log('\n4. Testing login after fix...');
    
    // Test admin login
    const { data: adminUser, error: adminLoginError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@elyfevspare.com')
      .eq('password_hash', adminHash)
      .eq('is_active', true)
      .single();
    
    if (adminLoginError) {
      console.log(`❌ Admin login still failed: ${adminLoginError.message}`);
    } else {
      console.log(`✅ Admin login now works: ${adminUser.email}`);
    }
    
    // Test customer login
    const { data: customerUser, error: customerLoginError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'customer@example.com')
      .eq('password_hash', customerHash)
      .eq('is_active', true)
      .single();
    
    if (customerLoginError) {
      console.log(`❌ Customer login still failed: ${customerLoginError.message}`);
    } else {
      console.log(`✅ Customer login now works: ${customerUser.email}`);
    }
    
    console.log('\n🎉 Authentication fix complete!');
    console.log('You can now login with:');
    console.log('- Admin: admin@elyfevspare.com / admin123');
    console.log('- Customer: customer@example.com / customer123');
    
  } catch (error) {
    console.error('❌ Fix error:', error.message);
  }
}

fixHashes();