# 🚀 Supabase Integration Guide - ELYF EVSPARE

## ⚠️ **Setup Required**

Your ELYF EVSPARE application is configured for your Supabase project, but you need to complete the setup:

- **Project ID**: `fqgibdytzciderlfehjz`
- **Project URL**: `https://fqgibdytzciderlfehjz.supabase.co`
- **API Key**: `sb_publishable_BRHmAv6p5lCQCwo5DC2U9Q_bMzYkZIF` ⚠️ *May be incomplete*

## 🔧 **Required Setup Steps**

### **1. Get Complete API Key (Important!)**

The API key provided appears to be truncated. You need the full key:

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/fqgibdytzciderlfehjz
2. **Navigate to Settings > API** (left sidebar)
3. **Copy the full "anon public" key** (it should be much longer, like a JWT token)
4. **Update your `.env` file** with the complete key:
   ```env
   VITE_SUPABASE_PUBLISHABLE_KEY="your_complete_key_here"
   ```

### **2. Database Setup (Required)**

You need to run the database setup script in your Supabase project:

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/fqgibdytzciderlfehjz
2. **Navigate to SQL Editor** (left sidebar)
3. **Create a new query**
4. **Copy and paste the entire content** from `setup-supabase.sql`
5. **Click "Run"** to execute the script

This will create:
- ✅ Users table with admin/customer roles
- ✅ Enhanced products and categories tables
- ✅ Orders and order items tables
- ✅ Row Level Security policies
- ✅ Sample data (categories, products, admin user)
- ✅ Database indexes for performance

### **2. Verify Setup**

After running the SQL script, you should see these tables in your Supabase dashboard:
- `users` - User accounts with roles
- `categories` - Product categories
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items

### **3. Test the Integration**

1. **Install dependencies** (if not done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Test the application**:
   - **Customer site**: http://localhost:5173/
   - **Admin panel**: http://localhost:5173/admin/login

## 🔐 **Demo Credentials**

### **Admin Login**
```
URL: http://localhost:5173/admin/login
Email: admin@elyfevspare.com
Password: admin123
```

### **Customer Login**
```
URL: http://localhost:5173/login
Email: customer@example.com
Password: customer123
```

## 📊 **What's Included**

### **Sample Data**
- ✅ **8 Categories**: 60V/48V/72V Chargers, Controllers, Motors, etc.
- ✅ **15+ Products**: Complete product catalog with prices and stock
- ✅ **Admin User**: Ready-to-use admin account
- ✅ **Test Customer**: Sample customer account

### **Database Features**
- ✅ **Authentication**: Custom user management with roles
- ✅ **Product Management**: Full CRUD operations
- ✅ **Order System**: Complete order tracking
- ✅ **Security**: Row Level Security policies
- ✅ **Performance**: Optimized with indexes

## 🔍 **Verify Integration**

### **Check Database Connection**
1. Start your app: `npm run dev`
2. Open browser console (F12)
3. Look for any Supabase connection errors
4. Products should load from your database

### **Test Authentication**
1. Try logging in as admin: `admin@elyfevspare.com` / `admin123`
2. Try registering a new customer account
3. Check if user data is saved in Supabase dashboard

### **Test Product Management**
1. Login as admin
2. Go to `/admin/products`
3. Products should load from your Supabase database
4. Try searching and filtering products

## 🛠️ **Configuration Files Updated**

### **Environment Variables** (`.env`)
```env
VITE_SUPABASE_PROJECT_ID="fqgibdytzciderlfehjz"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_BRHmAv6p5lCQCwo5DC2U9Q_bMzYkZIF"
VITE_SUPABASE_URL="https://fqgibdytzciderlfehjz.supabase.co"
```

### **Supabase Config** (`supabase/config.toml`)
```toml
project_id = "fqgibdytzciderlfehjz"
```

## 🚨 **Important Notes**

### **API Key Security**
- The API key provided appears to be incomplete
- In Supabase dashboard, go to **Settings > API** to get the full `anon/public` key
- Replace the key in `.env` if needed

### **Database Permissions**
- RLS (Row Level Security) is enabled
- Policies are set up for proper data access
- Admin users can access all data
- Customers can only access their own data

### **Production Deployment**
- Never commit `.env` file to version control
- Use environment variables in your deployment platform
- Consider using Supabase's built-in auth for production

## 🎯 **Next Steps**

1. **Run the SQL setup script** in Supabase dashboard
2. **Start your application**: `npm run dev`
3. **Test admin login**: `/admin/login`
4. **Test customer registration**: `/register`
5. **Verify data is saving** in Supabase dashboard

## 🔧 **Troubleshooting**

### **Connection Issues**
- Check if API key is complete and correct
- Verify project URL is accessible
- Check browser console for errors

### **Authentication Issues**
- Ensure users table exists in database
- Check if RLS policies are properly set
- Verify password hashing is working

### **Data Issues**
- Check if tables were created successfully
- Verify sample data was inserted
- Check table permissions in Supabase

## 📞 **Support**

If you encounter issues:
1. Check Supabase dashboard for errors
2. Review browser console for connection errors
3. Verify all tables exist and have data
4. Test API key in Supabase API docs

## 🎉 **Success!**

Once setup is complete, you'll have:
- ✅ **Full database integration** with Supabase
- ✅ **Working authentication** system
- ✅ **Admin panel** with product management
- ✅ **Customer interface** with shopping cart
- ✅ **Real-time data** from your database

**Your ELYF EVSPARE application is now fully integrated with Supabase! 🚀**