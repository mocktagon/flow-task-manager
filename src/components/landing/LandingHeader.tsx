
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-border/10">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center">
          <Calendar className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Flow Tasks
        </h1>
      </div>
      <div className="flex gap-4">
        <Link to="/login">
          <Button variant="ghost" className="text-foreground hover:text-foreground/80 font-medium">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="rounded-full font-medium px-5">Sign Up</Button>
        </Link>
      </div>
    </header>
  );
};

export default LandingHeader;
