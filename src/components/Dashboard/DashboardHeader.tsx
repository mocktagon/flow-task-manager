
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Good afternoon, Jacob!</h2>
        <p className="text-foreground/70">Your productivity score today: <span className="font-semibold text-genz-purple">87%</span></p>
      </div>
      <div className="flex flex-col xs:flex-row items-center gap-3">
        <div className="flex -space-x-2">
          <div className="h-8 w-8 rounded-full bg-genz-pink flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">JD</div>
          <div className="h-8 w-8 rounded-full bg-genz-blue flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">SK</div>
          <div className="h-8 w-8 rounded-full bg-genz-green flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">AM</div>
        </div>
        <Button variant="outline" size="sm" className="rounded-full border-genz-purple/20 text-genz-purple">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          Invite Team
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
