# 🛒 ELYF EVSPARE - E-Commerce Platform

A complete e-commerce solution for electric vehicle spare parts with separate customer and admin interfaces.

## 🚀 **Quick Start**

### **⚠️ Important: Complete Supabase Setup First**

Before running the application, you need to complete the database setup:

1. **Get Complete API Key**:
   - Go to: https://supabase.com/dashboard/project/fqgibdytzciderlfehjz
   - Settings > API > Copy "anon public" key
   - Update `.env` with the full key

2. **Setup Database**:
   - Go to SQL Editor in Supabase dashboard
   - Copy entire content from `setup-supabase.sql`
   - Paste and run the script

3. **Verify Setup**:
   ```bash
   node verify-setup.js
   ```

4. **Start Application**:
   ```bash
   npm install
   npm run dev
   ```

### **🔗 Access URLs**
- **Customer Site**: http://localhost:5173/
- **Admin Panel**: http://localhost:5173/admin/login

### **🔑 Demo Credentials**
```
Admin: admin@elyfevspare.com / admin123
Customer: customer@example.com / customer123
```

## 📚 **Documentation**

- **Setup Guide**: `SUPABASE_INTEGRATION.md`
- **Setup Status**: `SETUP_STATUS.md`
- **Authentication**: `AUTHENTICATION_SETUP.md`

## 🎯 **Features**

### **Customer Interface**
- ✅ Product catalog with categories
- ✅ Advanced search and filtering
- ✅ Shopping cart functionality
- ✅ User registration and login
- ✅ Order placement and tracking

### **Admin Interface**
- ✅ Product management (CRUD)
- ✅ Category management
- ✅ User management
- ✅ Order tracking and management
- ✅ Dashboard with analytics

### **Technical Features**
- ✅ Supabase integration
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Real-time database
- ✅ Responsive design
- ✅ TypeScript support

## 🛠️ **Development**

### **Local Development**

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Complete Supabase setup (see above)
# Then start development server
npm run dev
```

### **Environment Setup**

Create `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_PROJECT_ID="fqgibdytzciderlfehjz"
VITE_SUPABASE_PUBLISHABLE_KEY="your_complete_api_key_here"
VITE_SUPABASE_URL="https://fqgibdytzciderlfehjz.supabase.co"
```

## 🏗️ **Tech Stack**

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State**: React Context, Custom hooks
- **Routing**: React Router v6
- **Icons**: Lucide React

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   └── Index.tsx       # Customer homepage
├── services/           # API and business logic
│   ├── auth.ts         # Authentication service
│   └── database.ts     # Database operations
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client and types
└── utils/              # Utility functions
```

## 🔧 **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 **Deployment**

The application can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo
- **Netlify**: Deploy from Git
- **Supabase**: Use built-in hosting

Make sure to set environment variables in your deployment platform.

## 📞 **Support**

If you encounter issues:

1. Check `SETUP_STATUS.md` for current status
2. Run `node verify-setup.js` to test connection
3. Review browser console for errors
4. Check Supabase dashboard for data

## 🎉 **Success!**

Once setup is complete, you'll have a fully functional e-commerce platform with:
- Real-time product management
- Secure user authentication
- Complete order processing
- Responsive design for all devices

**Happy coding! 🚀**
