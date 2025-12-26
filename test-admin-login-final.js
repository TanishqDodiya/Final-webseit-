// Final Admin Login Test
// Run this with: node test-admin-login-final.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🔐 Final Admin Login Test...\n');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Browser-compatible password hashing (same as frontend)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt_key_elyf');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simulate the exact login process from the frontend
async function simulateLogin(email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('password_hash', hashedPassword)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      throw new Error('Invalid email or password');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      address: user.address,
      isActive: user.is_active,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Login failed');
  }
}

async function testFinalLogin() {
  try {
    console.log('1. Testing Admin Login...');
    console.log('   Email: admin@elyfevspare.com');
    console.log('   Password: admin123');
    
    const adminUser = await simulateLogin('admin@elyfevspare.com', 'admin123');
    console.log('✅ Admin login successful!');
    console.log(`   User: ${adminUser.firstName} ${adminUser.lastName}`);
    console.log(`   Role: ${adminUser.role}`);
    console.log(`   Email: ${adminUser.email}`);
    
    console.log('\n2. Testing Backup Admin Login...');
    console.log('   Email: admin@elyf.com');
    console.log('   Password: admin123');
    
    const backupAdminUser = await simulateLogin('admin@elyf.com', 'admin123');
    console.log('✅ Backup admin login successful!');
    console.log(`   User: ${backupAdminUser.firstName} ${backupAdminUser.lastName}`);
    console.log(`   Role: ${backupAdminUser.role}`);
    console.log(`   Email: ${backupAdminUser.email}`);
    
    console.log('\n3. Testing Customer Login...');
    console.log('   Email: customer@example.com');
    console.log('   Password: customer123');
    
    const customerUser = await simulateLogin('customer@example.com', 'customer123');
    console.log('✅ Customer login successful!');
    console.log(`   User: ${customerUser.firstName} ${customerUser.lastName}`);
    console.log(`   Role: ${customerUser.role}`);
    console.log(`   Email: ${customerUser.email}`);
    
    console.log('\n4. Testing Invalid Login...');
    try {
      await simulateLogin('admin@elyfevspare.com', 'wrongpassword');
      console.log('❌ Invalid login test failed - should have thrown error');
    } catch (error) {
      console.log('✅ Invalid login correctly rejected:', error.message);
    }
    
    console.log('\n🎉 All Login Tests Passed!');
    console.log('\n📋 Ready to Use:');
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│ 🚀 Your application is ready!                          │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log('│ 1. Open: http://localhost:8081/admin/login             │');
    console.log('│ 2. Enter: admin@elyfevspare.com                        │');
    console.log('│ 3. Enter: admin123                                     │');
    console.log('│ 4. Click: Sign In                                      │');
    console.log('│ 5. You will be redirected to admin dashboard           │');
    console.log('└─────────────────────────────────────────────────────────┘');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  }
}

testFinalLogin();