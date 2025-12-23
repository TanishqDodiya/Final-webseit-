import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, AuthUser, LoginCredentials, RegisterData, UserRole } from '@/services/auth';
import { toast } from 'sonner';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<RegisterData>) => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const authUser = await authService.login(credentials);
      setUser(authUser);
      toast.success(`Welcome back, ${authUser.firstName || authUser.email}!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const authUser = await authService.register(data);
      setUser(authUser);
      toast.success(`Welcome to ELYF EVSPARE, ${authUser.firstName}!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const updateProfile = useCallback(async (updates: Partial<RegisterData>) => {
    try {
      setIsLoading(true);
      const updatedUser = await authService.updateProfile(updates);
      setUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile update failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const hasRole = useCallback((role: UserRole) => {
    return authService.hasRole(role);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    isAdmin: user?.role === 'admin',
    isCustomer: user?.role === 'customer',
    login,
    register,
    logout,
    updateProfile,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook for protecting routes
export const useRequireAuth = (requiredRole?: UserRole) => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if not authenticated
      window.location.href = requiredRole === 'admin' ? '/admin/login' : '/login';
    } else if (!isLoading && user && requiredRole && user.role !== requiredRole) {
      // Redirect if user doesn't have required role
      if (requiredRole === 'admin') {
        toast.error('Access denied: Admin privileges required');
        window.location.href = '/';
      } else {
        toast.error('Access denied: Customer account required');
        window.location.href = '/login';
      }
    }
  }, [user, isLoading, requiredRole]);

  return { user, isLoading };
};

// Hook for admin-only access
export const useRequireAdmin = () => {
  return useRequireAuth('admin');
};

// Hook for customer-only access
export const useRequireCustomer = () => {
  return useRequireAuth('customer');
};