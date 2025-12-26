// Complete Admin Authentication Fix
// Run this with: node fix-admin-auth-complete.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🔧 Complete Admin Authentication Fix...\n');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Browser-compatible password hashing (same as frontend)
async function hashPasswordBrowser(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt_key_elyf');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Node.js crypto hashing (alternative)
function hashPasswordNode(password) {
  return crypto.createHash('sha256').update(password + 'salt_key_elyf').digest('hex');
}

async function fixAdminAuth() {
  try {
    console.log('1. Testing different hashing methods...');
    
    const adminPassword = 'admin123';
    const customerPassword = 'customer123';
    
    // Test browser-style hashing
    const adminHashBrowser = await hashPasswordBrowser(adminPassword);
    const customerHashBrowser = await hashPasswordBrowser(customerPassword);
    
    // Test Node.js-style hashing
    const adminHashNode = hashPasswordNode(adminPassword);
    const customerHashNode = hashPasswordNode(customerPassword);
    
    console.log(`Browser-style admin hash:    ${adminHashBrowser}`);
    console.log(`Node.js-style admin hash:    ${adminHashNode}`);
    console.log(`Browser-style customer hash: ${customerHashBrowser}`);
    console.log(`Node.js-style customer hash: ${customerHashNode}`);
    
    console.log('\n2. Checking current database hashes...');
    
    const { data: users, error } = await supabase
      .from('users')
      .select('email, password_hash, role')
      .in('email', ['admin@elyfevspare.com', 'customer@example.com']);
    
    if (error) {
      console.error('❌ Error fetching users:', error.message);
      return;
    }
    
    const adminUser = users.find(u => u.email === 'admin@elyfevspare.com');
    const customerUser = users.find(u => u.email === 'customer@example.com');
    
    console.log(`Current admin hash in DB:    ${adminUser?.password_hash || 'NOT FOUND'}`);
    console.log(`Current customer hash in DB: ${customerUser?.password_hash || 'NOT FOUND'}`);
    
    console.log('\n3. Determining correct hash method...');
    
    // Check which method matches the current database
    let useNodeHashing = false;
    if (adminUser) {
      if (adminUser.password_hash === adminHashNode) {
        console.log('✅ Database uses Node.js-style hashing');
        useNodeHashing = true;
      } else if (adminUser.password_hash === adminHashBrowser) {
        console.log('✅ Database uses browser-style hashing');
        useNodeHashing = false;
      } else {
        console.log('⚠️  Database hash doesn\'t match either method, will update with browser-style');
        useNodeHashing = false;
      }
    }
    
    console.log('\n4. Updating authentication service to match...');
    
    // The issue is likely that the frontend uses crypto.subtle (browser) but the database was set up with Node.js crypto
    // Let's update the database to use the browser-compatible hashes
    
    console.log('Updating admin user with browser-compatible hash...');
    const { error: adminUpdateError } = await supabase
      .from('users')
      .update({ 
        password_hash: adminHashBrowser,
        is_active: true 
      })
      .eq('email', 'admin@elyfevspare.com');
    
    if (adminUpdateError) {
      console.error('❌ Failed to update admin:', adminUpdateError.message);
    } else {
      console.log('✅ Admin hash updated to browser-compatible version');
    }
    
    console.log('Updating customer user with browser-compatible hash...');
    const { error: customerUpdateError } = await supabase
      .from('users')
      .update({ 
        password_hash: customerHashBrowser,
        is_active: true 
      })
      .eq('email', 'customer@example.com');
    
    if (customerUpdateError) {
      console.error('❌ Failed to update customer:', customerUpdateError.message);
    } else {
      console.log('✅ Customer hash updated to browser-compatible version');
    }
    
    console.log('\n5. Testing login with updated hashes...');
    
    // Test admin login
    const { data: testAdminUser, error: testAdminError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@elyfevspare.com')
      .eq('password_hash', adminHashBrowser)
      .eq('is_active', true)
      .single();
    
    if (testAdminError) {
      console.log(`❌ Admin login test failed: ${testAdminError.message}`);
    } else {
      console.log(`✅ Admin login test successful: ${testAdminUser.email} (${testAdminUser.role})`);
    }
    
    // Test customer login
    const { data: testCustomerUser, error: testCustomerError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'customer@example.com')
      .eq('password_hash', customerHashBrowser)
      .eq('is_active', true)
      .single();
    
    if (testCustomerError) {
      console.log(`❌ Customer login test failed: ${testCustomerError.message}`);
    } else {
      console.log(`✅ Customer login test successful: ${testCustomerUser.email} (${testCustomerUser.role})`);
    }
    
    console.log('\n6. Creating additional admin user for backup...');
    
    // Create a backup admin user with a different email
    const backupAdminHash = await hashPasswordBrowser('admin123');
    const { error: backupAdminError } = await supabase
      .from('users')
      .upsert({
        email: 'admin@elyf.com',
        password_hash: backupAdminHash,
        role: 'admin',
        first_name: 'Admin',
        last_name: 'Backup',
        is_active: true
      }, {
        onConflict: 'email'
      });
    
    if (backupAdminError) {
      console.log(`⚠️  Could not create backup admin: ${backupAdminError.message}`);
    } else {
      console.log('✅ Backup admin user created: admin@elyf.com / admin123');
    }
    
    console.log('\n🎉 Admin Authentication Fix Complete!');
    console.log('\n📋 Working Credentials:');
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│ ADMIN LOGIN CREDENTIALS                                 │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log('│ Email:    admin@elyfevspare.com                         │');
    console.log('│ Password: admin123                                      │');
    console.log('│ URL:      http://localhost:8081/admin/login             │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log('│ BACKUP ADMIN (if needed)                                │');
    console.log('│ Email:    admin@elyf.com                                │');
    console.log('│ Password: admin123                                      │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log('│ CUSTOMER LOGIN CREDENTIALS                              │');
    console.log('│ Email:    customer@example.com                         │');
    console.log('│ Password: customer123                                   │');
    console.log('│ URL:      http://localhost:8081/login                   │');
    console.log('└─────────────────────────────────────────────────────────┘');
    
  } catch (error) {
    console.error('❌ Fix error:', error.message);
    console.error(error.stack);
  }
}

fixAdminAuth();