
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Zap, Clock, Layers } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 glow-text">
            <span className="ai-gradient-text">Designed for your natural workflow</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Flow Tasks adapts to how you naturally work, not the other way around.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Calendar className="h-6 w-6 text-primary" />}
            title="Calendar Integration"
            description="Intelligently reorganize tasks around your Google Calendar events."
          />
          
          <FeatureCard 
            icon={<Zap className="h-6 w-6 text-primary" />}
            title="Energy Zones"
            description="Align high-priority tasks with your peak energy periods for maximum productivity."
          />
          
          <FeatureCard 
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="Built-in Timer"
            description="Track time spent on tasks with a simple one-click timer system."
          />
          
          <FeatureCard 
            icon={<Layers className="h-6 w-6 text-primary" />}
            title="Backlog Management"
            description="Never lose track of incomplete tasks with smart backlog organization."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="ai-card group">
      <CardContent className="pt-8 p-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeaturesSection;
