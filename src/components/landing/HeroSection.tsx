
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Clock, LineChart } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-28 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="apple-hero-headline mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Work smarter with your natural flow</span>
          </h1>
          <p className="apple-hero-subheadline text-foreground/80 mb-10 max-w-2xl mx-auto md:mx-0">
            Flow Tasks intelligently reorganizes your to-do list around your calendar and energy levels, 
            helping you accomplish more without burning out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/signup">
              <Button size="lg" className="apple-cta-button group">
                <span className="relative z-10 flex items-center">
                  Get Started
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
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-400/30 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <div className="aspect-video bg-gradient-to-tr from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <div className="w-full max-w-md apple-glass-card p-5">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Today's Flow</span>
                    </h3>
                    <div className="text-sm font-medium text-foreground/70">9:30 AM</div>
                  </div>
                  <div className="space-y-3">
                    <div className="apple-time-block apple-time-block-high">
                      <div className="flex justify-between">
                        <div className="font-semibold flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                          Finish project proposal
                        </div>
                        <div className="apple-priority-badge apple-priority-high flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          High
                        </div>
                      </div>
                    </div>
                    <div className="apple-time-block apple-time-block-medium">
                      <div className="flex justify-between">
                        <div className="font-semibold flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                          Client meeting
                        </div>
                        <div className="apple-priority-badge apple-priority-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Medium
                        </div>
                      </div>
                    </div>
                    <div className="apple-time-block apple-time-block-low">
                      <div className="flex justify-between">
                        <div className="font-semibold flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                          Review analytics
                        </div>
                        <div className="apple-priority-badge apple-priority-low flex items-center gap-1">
                          <LineChart className="h-3 w-3" />
                          Low
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
