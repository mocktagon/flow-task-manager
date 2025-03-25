
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-cyan-500/5"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
          <span className="ai-gradient-text">Ready to optimize your workflow?</span>
        </h2>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have transformed their productivity with Flow Tasks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto ai-button-glow group">
              <span className="relative z-10 flex items-center">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-accent/50 hover:bg-accent/30">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
