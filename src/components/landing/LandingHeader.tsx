
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const LandingHeader = () => {
  return (
    <header className="glass-card sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-accent/20">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
          <Calendar className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">
          <span className="ai-gradient-text">Flow Tasks</span>
        </h1>
      </div>
      <div className="flex gap-2">
        <Link to="/login">
          <Button variant="ghost" className="text-foreground/90 hover:text-foreground">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="ai-button-glow">Sign Up</Button>
        </Link>
      </div>
    </header>
  );
};

export default LandingHeader;
