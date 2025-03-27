
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Settings, LogOut, Bell, Search, Star, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-genz-purple/10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 genz-gradient-bg rounded-xl flex items-center justify-center animate-pulse-glow">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <Link to="/dashboard" className="text-xl font-bold tracking-tight">
          <span className="text-gradient">Flow Tasks</span>
        </Link>
      </div>

      <div className="hidden md:flex max-w-sm w-full mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tasks..." 
            className="bg-secondary/40 pl-10 pr-4 border-0 rounded-full w-full focus:ring-2 focus:ring-genz-purple/20"
          />
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-genz-red rounded-full border-2 border-white"></span>
        </Button>
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
        </Button>
        <div className="h-9 w-9 rounded-full genz-gradient-bg flex items-center justify-center text-white text-sm font-bold">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;
