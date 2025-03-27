
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-28 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to optimize your workflow?
        </h2>
        <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Join thousands of professionals who have transformed their productivity with Flow Tasks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="apple-cta-button group">
              <span className="relative z-10 flex items-center">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="rounded-full border-gray-300 hover:bg-gray-100">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
