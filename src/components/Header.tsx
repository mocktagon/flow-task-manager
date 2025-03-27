
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
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <Link to="/dashboard" className="text-xl font-bold tracking-tight">
          Flow Tasks
        </Link>
      </div>
      <div className="flex gap-3">
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
