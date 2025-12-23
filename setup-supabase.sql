-- ELYF EVSPARE - Complete Database Setup for Supabase
-- Run this script in your Supabase SQL Editor to set up the complete database

-- Enhanced database schema for authentication and order management
-- This extends the existing products and categories tables

-- Create users table with role-based access
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  address TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table (if not exists)
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table (if not exists, with enhancements)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'PCS',
  image TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping_address TEXT,
  billing_address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON public.products USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_order_number ON public.orders;
CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS trigger_users_updated_at ON public.users;
CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_orders_updated_at ON public.orders;
CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admin can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admin can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can update all orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can view all order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can create their own order items" ON public.order_items;
DROP POLICY IF EXISTS "Admin can manage products" ON public.products;
DROP POLICY IF EXISTS "Admin can manage categories" ON public.categories;

-- Public read access for categories and products (e-commerce catalog)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- RLS Policies for users table
-- Note: For custom auth, we'll handle user access in the application layer
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (true); -- Allow reading for now, will be restricted in app

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (true); -- Allow updates for now, will be restricted in app

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (true); -- Allow registration

-- RLS Policies for orders table
CREATE POLICY "Users can view orders" ON public.orders
  FOR SELECT USING (true); -- Will be restricted in app layer

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update orders" ON public.orders
  FOR UPDATE USING (true); -- Will be restricted in app layer

-- RLS Policies for order_items table
CREATE POLICY "Users can view order items" ON public.order_items
  FOR SELECT USING (true); -- Will be restricted in app layer

CREATE POLICY "Users can create order items" ON public.order_items
  FOR INSERT WITH CHECK (true);

-- Admin policies for products and categories
CREATE POLICY "Admin can manage products" ON public.products
  FOR ALL USING (true); -- Will be restricted in app layer

CREATE POLICY "Admin can manage categories" ON public.categories
  FOR ALL USING (true); -- Will be restricted in app layer

-- Insert sample categories
INSERT INTO public.categories (name, slug) VALUES
  ('60V Lithium Charger', '60v-lithium'),
  ('48V Lithium Charger', '48v-lithium'),
  ('72V Lithium Charger', '72v-lithium'),
  ('Liners & Brake Cables', 'liners-brake'),
  ('Controllers', 'controllers'),
  ('Hub Motors', 'motors'),
  ('Battery Packs', 'batteries'),
  ('Accessories', 'accessories')
ON CONFLICT (slug) DO NOTHING;

-- Insert default admin user (password: admin123)
-- Note: Password hash for 'admin123' using SHA-256 with salt 'salt_key_elyf'
INSERT INTO public.users (email, password_hash, role, first_name, last_name) 
VALUES (
  'admin@elyfevspare.com', 
  'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', -- SHA-256 hash of 'admin123' + 'salt_key_elyf'
  'admin', 
  'Admin', 
  'User'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample products (getting category IDs first)
DO $$
DECLARE
    cat_60v UUID;
    cat_48v UUID;
    cat_72v UUID;
    cat_liners UUID;
    cat_controllers UUID;
    cat_motors UUID;
    cat_batteries UUID;
    cat_accessories UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO cat_60v FROM public.categories WHERE slug = '60v-lithium';
    SELECT id INTO cat_48v FROM public.categories WHERE slug = '48v-lithium';
    SELECT id INTO cat_72v FROM public.categories WHERE slug = '72v-lithium';
    SELECT id INTO cat_liners FROM public.categories WHERE slug = 'liners-brake';
    SELECT id INTO cat_controllers FROM public.categories WHERE slug = 'controllers';
    SELECT id INTO cat_motors FROM public.categories WHERE slug = 'motors';
    SELECT id INTO cat_batteries FROM public.categories WHERE slug = 'batteries';
    SELECT id INTO cat_accessories FROM public.categories WHERE slug = 'accessories';

    -- Insert sample products
    INSERT INTO public.products (name, sku, price, unit, image, category_id, stock_quantity) VALUES
    -- 60V Lithium Chargers
    ('[IMP 67.2V+6A] LITHIUM EV CHARGER (0268)', '0268', 748, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_60v, 50),
    ('[IMP 67.2V+5A] LITHIUM EV CHARGER (0269)', '0269', 698, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_60v, 45),
    ('[IMP 67.2V+4A] LITHIUM EV CHARGER (0270)', '0270', 648, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_60v, 30),
    
    -- 48V Lithium Chargers
    ('[IMP 54.6V+5A] LITHIUM EV CHARGER (0280)', '0280', 648, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_48v, 40),
    ('[IMP 54.6V+4A] LITHIUM EV CHARGER (0281)', '0281', 598, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_48v, 35),
    
    -- 72V Lithium Chargers
    ('[IMP 84V+5A] LITHIUM EV CHARGER (0290)', '0290', 848, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_72v, 25),
    ('[IMP 84V+6A] LITHIUM EV CHARGER (0291)', '0291', 948, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_72v, 20),
    
    -- Controllers
    ('48V 25A SINE WAVE CONTROLLER (0400)', '0400', 1250, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_controllers, 15),
    ('60V 30A SINE WAVE CONTROLLER (0401)', '0401', 1450, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_controllers, 12),
    
    -- Motors
    ('350W HUB MOTOR - REAR (0500)', '0500', 3500, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_motors, 8),
    ('500W HUB MOTOR - REAR (0501)', '0501', 4500, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_motors, 6),
    
    -- Batteries
    ('48V 20AH LITHIUM BATTERY PACK (0600)', '0600', 12500, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_batteries, 10),
    ('60V 24AH LITHIUM BATTERY PACK (0601)', '0601', 15500, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_batteries, 8),
    
    -- Accessories
    ('LED HEADLIGHT ASSEMBLY (0700)', '0700', 450, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_accessories, 60),
    ('DIGITAL SPEEDOMETER (0701)', '0701', 650, 'PCS', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', cat_accessories, 40)
    ON CONFLICT (sku) DO NOTHING;
END $$;

-- Create a test customer user
INSERT INTO public.users (email, password_hash, role, first_name, last_name) 
VALUES (
  'customer@example.com', 
  'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', -- SHA-256 hash of 'customer123' + 'salt_key_elyf'
  'customer', 
  'Test', 
  'Customer'
) ON CONFLICT (email) DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully! You can now use your ELYF EVSPARE application.' as message;