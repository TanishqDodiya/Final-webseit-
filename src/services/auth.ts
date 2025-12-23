import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type User = Tables<'users'>;
export type UserRole = 'admin' | 'customer';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  isActive: boolean;
}

class AuthService {
  private currentUser: AuthUser | null = null;
  private token: string | null = null;

  constructor() {
    // Initialize from localStorage on app start
    this.initializeFromStorage();
  }

  private initializeFromStorage() {
    try {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedUser && storedToken) {
        this.currentUser = JSON.parse(storedUser);
        this.token = storedToken;
      }
    } catch (error) {
      console.error('Error initializing auth from storage:', error);
      this.clearStorage();
    }
  }

  private setStorage(user: AuthUser, token: string) {
    localStorage.setItem('auth_user', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
    this.currentUser = user;
    this.token = token;
  }

  private clearStorage() {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    this.currentUser = null;
    this.token = null;
  }

  // Simple password hashing (in production, use bcrypt on backend)
  private async hashPassword(password: string): Promise<string> {
    // This is a simple hash for demo purposes
    // In production, use proper bcrypt hashing on the backend
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'salt_key_elyf');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Generate simple JWT-like token (in production, use proper JWT library on backend)
  private generateToken(user: AuthUser): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    return btoa(JSON.stringify(payload));
  }

  private validateToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      const hashedPassword = await this.hashPassword(credentials.password);
      
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email.toLowerCase())
        .eq('password_hash', hashedPassword)
        .eq('is_active', true)
        .single();

      if (error || !user) {
        throw new Error('Invalid email or password');
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        address: user.address,
        isActive: user.is_active,
      };

      const token = this.generateToken(authUser);
      this.setStorage(authUser, token);

      return authUser;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  async register(data: RegisterData): Promise<AuthUser> {
    try {
      const hashedPassword = await this.hashPassword(data.password);
      
      const { data: user, error } = await supabase
        .from('users')
        .insert({
          email: data.email.toLowerCase(),
          password_hash: hashedPassword,
          role: 'customer',
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          address: data.address,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('Email already exists');
        }
        throw new Error('Registration failed');
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        address: user.address,
        isActive: user.is_active,
      };

      const token = this.generateToken(authUser);
      this.setStorage(authUser, token);

      return authUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  }

  logout(): void {
    this.clearStorage();
  }

  getCurrentUser(): AuthUser | null {
    if (this.currentUser && this.token && this.validateToken(this.token)) {
      return this.currentUser;
    }
    this.clearStorage();
    return null;
  }

  getToken(): string | null {
    if (this.token && this.validateToken(this.token)) {
      return this.token;
    }
    this.clearStorage();
    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isCustomer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'customer';
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  async updateProfile(updates: Partial<RegisterData>): Promise<AuthUser> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    try {
      const updateData: any = {};
      if (updates.firstName) updateData.first_name = updates.firstName;
      if (updates.lastName) updateData.last_name = updates.lastName;
      if (updates.phone) updateData.phone = updates.phone;
      if (updates.address) updateData.address = updates.address;
      if (updates.password) {
        updateData.password_hash = await this.hashPassword(updates.password);
      }

      const { data: user, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', currentUser.id)
        .select()
        .single();

      if (error) {
        throw new Error('Profile update failed');
      }

      const updatedAuthUser: AuthUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        address: user.address,
        isActive: user.is_active,
      };

      const token = this.generateToken(updatedAuthUser);
      this.setStorage(updatedAuthUser, token);

      return updatedAuthUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error(error instanceof Error ? error.message : 'Profile update failed');
    }
  }

  // Admin-only methods
  async getAllUsers(): Promise<User[]> {
    if (!this.isAdmin()) {
      throw new Error('Unauthorized: Admin access required');
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Failed to fetch users');
    }

    return data || [];
  }

  async updateUserRole(userId: string, role: UserRole): Promise<void> {
    if (!this.isAdmin()) {
      throw new Error('Unauthorized: Admin access required');
    }

    const { error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId);

    if (error) {
      throw new Error('Failed to update user role');
    }
  }

  async deactivateUser(userId: string): Promise<void> {
    if (!this.isAdmin()) {
      throw new Error('Unauthorized: Admin access required');
    }

    const { error } = await supabase
      .from('users')
      .update({ is_active: false })
      .eq('id', userId);

    if (error) {
      throw new Error('Failed to deactivate user');
    }
  }
}

export const authService = new AuthService();
export default authService;