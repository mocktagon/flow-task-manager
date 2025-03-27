
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, Star } from 'lucide-react';

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-genz-purple/10">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 genz-gradient-bg rounded-xl flex items-center justify-center animate-pulse-glow">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-gradient">Flow Tasks</span>
        </h1>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="#features" className="text-foreground/80 hover:text-foreground font-medium text-sm transition-colors">
          Features
        </Link>
        <Link to="#how-it-works" className="text-foreground/80 hover:text-foreground font-medium text-sm transition-colors">
          How it Works
        </Link>
        <Link to="#pricing" className="text-foreground/80 hover:text-foreground font-medium text-sm transition-colors">
          Pricing
        </Link>
        <Link to="#faq" className="text-foreground/80 hover:text-foreground font-medium text-sm transition-colors">
          FAQ
        </Link>
      </div>
      
      <div className="flex gap-4">
        <Link to="/login">
          <Button variant="ghost" className="text-foreground hover:text-foreground/80 font-medium">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="genz-button px-5 py-2">
            <span>Sign Up</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default LandingHeader;
