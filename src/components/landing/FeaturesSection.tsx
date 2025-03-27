
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Zap, Clock, Layers } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="apple-section-title">
            Designed for your natural workflow
          </h2>
          <p className="apple-section-description mx-auto">
            Flow Tasks adapts to how you naturally work, not the other way around.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Calendar className="h-8 w-8 text-primary" />}
            title="Calendar Integration"
            description="Intelligently reorganize tasks around your Google Calendar events."
          />
          
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="Energy Zones"
            description="Align high-priority tasks with your peak energy periods for maximum productivity."
          />
          
          <FeatureCard 
            icon={<Clock className="h-8 w-8 text-primary" />}
            title="Built-in Timer"
            description="Track time spent on tasks with a simple one-click timer system."
          />
          
          <FeatureCard 
            icon={<Layers className="h-8 w-8 text-primary" />}
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
    <Card className="apple-feature-card group border-0">
      <CardContent className="pt-6 p-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="apple-feature-title">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeaturesSection;
