
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Settings, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';

const Header = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <header className="glass-card sticky top-0 z-50 flex justify-between items-center px-6 py-4 mb-6">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Flow Tasks
        </h1>
      </div>
      <div className="flex gap-2">
        <Link to="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
