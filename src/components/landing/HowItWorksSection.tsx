
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  BrainCircuit, 
  BarChart, 
  Calendar, 
  Sparkles, 
  Bot, 
  Workflow 
} from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 bg-accent/20 backdrop-blur-md">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 glow-text">
            <span className="ai-gradient-text">How Flow Tasks Works</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Optimize your productivity without the stress.
          </p>
        </div>
        
        <div className="space-y-16">
          <WorkflowStep
            step="1"
            title="Prioritize Tasks"
            description="Assign priority levels and time estimates to each task. Flow Tasks uses this information to organize your day optimally."
            icon={<BrainCircuit className="h-5 w-5 text-primary" />}
            imageItems={[
              { label: "High Priority Tasks", color: "bg-priority-high" },
              { label: "Medium Priority Tasks", color: "bg-priority-medium" },
              { label: "Low Priority Tasks", color: "bg-priority-low" }
            ]}
            imageSide="right"
          />
          
          <Separator className="bg-accent/30" />
          
          <WorkflowStep
            step="2"
            title="Set Energy Zones"
            description="Define your peak productivity periods. Flow Tasks will schedule high-priority tasks during your high-energy times."
            icon={<BarChart className="h-5 w-5 text-primary" />}
            imageItems={[
              { label: "High Energy (8am - 11am)", color: "bg-energy-high" },
              { label: "Medium Energy (2pm - 4pm)", color: "bg-energy-medium" },
              { label: "Low Energy (4pm - 6pm)", color: "bg-energy-low" }
            ]}
            imageSide="left"
          />
          
          <Separator className="bg-accent/30" />
          
          <WorkflowStep
            step="3"
            title="Sync with Google Calendar"
            description="Connect your Google Calendar to ensure tasks are scheduled around your existing commitments."
            icon={<Calendar className="h-5 w-5 text-primary" />}
            imageItems={[
              { label: "Weekly Team Meeting (10:00 AM)" },
              { label: "Client Call (1:30 PM)" },
              { label: "Project Review (3:00 PM)" }
            ]}
            itemIcon={<Calendar className="h-4 w-4 text-primary" />}
            imageSide="right"
          />
          
          <Separator className="bg-accent/30" />
          
          <WorkflowStep
            step="4"
            title="Let AI Optimize Your Day"
            description="Flow Tasks' AI engine arranges your tasks into an optimal schedule that respects your energy levels, priorities, and calendar commitments."
            icon={<Sparkles className="h-5 w-5 text-primary" />}
            imageItems={[
              { label: "AI Optimized Schedule", icon: <Bot className="h-4 w-4 text-primary" /> },
              { label: "Smart Task Distribution", icon: <Workflow className="h-4 w-4 text-primary" /> },
              { label: "Personalized Focus Periods", icon: <Sparkles className="h-4 w-4 text-primary" /> }
            ]}
            imageSide="left"
          />
        </div>
      </div>
    </section>
  );
};

interface WorkflowStepProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageItems: Array<{
    label: string;
    color?: string;
    icon?: React.ReactNode;
  }>;
  itemIcon?: React.ReactNode;
  imageSide: 'left' | 'right';
}

const WorkflowStep = ({ 
  step, 
  title, 
  description, 
  icon, 
  imageItems, 
  itemIcon, 
  imageSide 
}: WorkflowStepProps) => {
  const textContent = (
    <div className={imageSide === 'right' ? 'order-1' : 'order-2'}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm font-medium text-primary">STEP {step}</span>
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-foreground/80 mb-4 leading-relaxed">
        {description}
      </p>
    </div>
  );

  const imageContent = (
    <div className={imageSide === 'right' ? 'order-2' : 'order-1'}>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-cyan-400/30 rounded-xl blur-lg opacity-40"></div>
        <Card className="glow-border overflow-hidden">
          <CardContent className="p-6">
            <div className="bg-accent/30 backdrop-blur-md rounded-md flex items-center justify-center p-6">
              <div className="w-full space-y-4">
                {imageItems.map((item, index) => (
                  <div key={index} className="glass-card p-3 rounded-lg flex items-center gap-3">
                    {item.color ? (
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    ) : item.icon ? (
                      item.icon
                    ) : itemIcon ? (
                      itemIcon
                    ) : null}
                    <p className="font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="md:w-1/2 order-2 md:order-1">{imageSide === 'left' ? imageContent : textContent}</div>
      <div className="md:w-1/2 order-1 md:order-2">{imageSide === 'left' ? textContent : imageContent}</div>
    </div>
  );
};

export default HowItWorksSection;
