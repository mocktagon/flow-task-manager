
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Settings, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="linear-card sticky top-0 z-50 flex justify-between items-center px-4 py-3 mb-4">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 bg-primary/90 rounded-md flex items-center justify-center">
          <Calendar className="h-4 w-4 text-white" />
        </div>
        <Link to="/dashboard" className="text-lg font-medium text-foreground tracking-tight">
          Flow Tasks
        </Link>
      </div>
      <div className="flex gap-2">
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
