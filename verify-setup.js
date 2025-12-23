// Quick Setup Verification Script
// Run this after completing the Supabase setup: node verify-setup.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🔍 ELYF EVSPARE - Setup Verification\n');

// Check environment variables
console.log('1. Checking environment variables...');
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing environment variables in .env file');
  process.exit(1);
}

// Check API key format
if (SUPABASE_KEY.length < 100) {
  console.warn('⚠️  API key looks incomplete (too short)');
  console.log('   Please get the full "anon public" key from Supabase dashboard');
  console.log('   Go to: Settings > API > anon public key\n');
}

console.log('✅ Environment variables found\n');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verifySetup() {
  try {
    console.log('2. Testing database connection...');
    
    // Test each table
    const tables = ['categories', 'products', 'users', 'orders'];
    const results = {};
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          results[table] = { status: 'error', message: error.message };
        } else {
          results[table] = { status: 'success', count: data || 0 };
        }
      } catch (err) {
        results[table] = { status: 'error', message: err.message };
      }
    }
    
    // Display results
    console.log('\n📊 Database Tables Status:');
    let allGood = true;
    
    for (const [table, result] of Object.entries(results)) {
      if (result.status === 'success') {
        console.log(`✅ ${table}: Ready`);
      } else {
        console.log(`❌ ${table}: ${result.message}`);
        allGood = false;
      }
    }
    
    if (!allGood) {
      console.log('\n🔧 Setup Required:');
      console.log('1. Run the setup-supabase.sql script in your Supabase dashboard');
      console.log('2. Go to: https://supabase.com/dashboard/project/fqgibdytzciderlfehjz');
      console.log('3. Navigate to SQL Editor');
      console.log('4. Copy and paste the entire setup-supabase.sql content');
      console.log('5. Click "Run" to execute');
      return;
    }
    
    // Test sample data
    console.log('\n3. Checking sample data...');
    const { data: categories } = await supabase.from('categories').select('*');
    const { data: products } = await supabase.from('products').select('*');
    const { data: users } = await supabase.from('users').select('email, role');
    
    console.log(`✅ Categories: ${categories?.length || 0}`);
    console.log(`✅ Products: ${products?.length || 0}`);
    console.log(`✅ Users: ${users?.length || 0}`);
    
    if (users?.length > 0) {
      console.log('\n👥 Available Users:');
      users.forEach(user => {
        console.log(`   - ${user.email} (${user.role})`);
      });
    }
    
    console.log('\n🎉 Setup Complete! Your application is ready to use.');
    console.log('\n🚀 Next Steps:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Open: http://localhost:5173');
    console.log('3. Try admin login: admin@elyfevspare.com / admin123');
    console.log('4. Try customer login: customer@example.com / customer123');
    
  } catch (error) {
    console.error('\n❌ Connection Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your internet connection');
    console.log('2. Verify Supabase project is active');
    console.log('3. Get the complete API key from Supabase dashboard');
    console.log('4. Run the database setup script');
  }
}

verifySetup();