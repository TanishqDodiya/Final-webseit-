import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  ArrowLeft, 
  Shield,
  LayoutDashboard
} from 'lucide-react';

const AdminAwareHeader: React.FC = () => {
  const { user, isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Admin Mode</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Logged in as {user?.firstName} {user?.lastName}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Admin Dashboard
            </Button>
          </Link>
          <Link to="/admin/settings">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminAwareHeader;