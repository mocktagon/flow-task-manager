
import React from 'react';
import { Calendar } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="py-14 px-8 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold">Flow Tasks</h2>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-foreground/60 font-medium">© 2023 Flow Tasks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
