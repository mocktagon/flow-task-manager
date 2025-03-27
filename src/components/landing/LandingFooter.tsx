
import React from 'react';
import { Calendar, Instagram, Twitter, Youtube, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingFooter = () => {
  return (
    <footer className="py-16 px-8 border-t border-genz-purple/10 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 genz-noise pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 genz-gradient-bg rounded-xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">
                <span className="text-gradient">Flow Tasks</span>
              </h2>
            </div>
            <p className="text-sm text-foreground/70 max-w-xs">
              Reorganizing your tasks around your energy levels and calendar for peak productivity.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-genz-purple/5 hover:bg-genz-purple/10">
                <Twitter className="h-4 w-4 text-genz-purple" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-genz-purple/5 hover:bg-genz-purple/10">
                <Instagram className="h-4 w-4 text-genz-purple" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-genz-purple/5 hover:bg-genz-purple/10">
                <Facebook className="h-4 w-4 text-genz-purple" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-genz-purple/5 hover:bg-genz-purple/10">
                <Youtube className="h-4 w-4 text-genz-purple" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Integrations</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Changelog</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Community</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Support</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">About us</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Press</a></li>
              <li><a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Legal</a></li>
              <li>
                <a href="mailto:contact@flowtasks.com" className="text-sm inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors">
                  <Mail className="h-3 w-3" />
                  <span>Contact us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-genz-purple/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">© 2023 Flow Tasks. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-foreground/60 hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-foreground/60 hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-foreground/60 hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
