
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Clock, LineChart } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-24 px-4 ai-gradient-bg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 glow-text">
            <span className="ai-gradient-text">Work smarter with your natural flow</span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto md:mx-0">
            Flow Tasks intelligently reorganizes your to-do list around your calendar and energy levels, 
            helping you accomplish more without burning out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto group ai-button-glow relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Get Started
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
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-xl blur-xl opacity-30"></div>
            <div className="relative glow-border rounded-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-tr from-accent/80 to-accent/30 flex items-center justify-center p-6">
                <div className="w-full max-w-md glass-card rounded-lg p-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Today's Flow</span>
                    </h3>
                    <div className="text-sm text-foreground/70">9:30 AM</div>
                  </div>
                  <div className="space-y-3">
                    <div className="time-block time-block-high animate-pulse-subtle bg-energy-high/20 backdrop-blur-sm">
                      <div className="flex justify-between">
                        <div className="font-medium flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-energy-high"></div>
                          Finish project proposal
                        </div>
                        <div className="priority-badge priority-high flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          High
                        </div>
                      </div>
                    </div>
                    <div className="time-block time-block-medium bg-energy-medium/20 backdrop-blur-sm">
                      <div className="flex justify-between">
                        <div className="font-medium flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-energy-medium"></div>
                          Client meeting
                        </div>
                        <div className="priority-badge priority-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Medium
                        </div>
                      </div>
                    </div>
                    <div className="time-block time-block-low bg-energy-low/20 backdrop-blur-sm">
                      <div className="flex justify-between">
                        <div className="font-medium flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-energy-low"></div>
                          Review analytics
                        </div>
                        <div className="priority-badge priority-low flex items-center gap-1">
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
