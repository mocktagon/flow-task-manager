
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import EnergyZones from '@/components/EnergyZones';
import GoogleCalendarSync from '@/components/GoogleCalendarSync';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import useAuth from '@/hooks/useAuth';

const Settings = () => {
  const {
    timeBlocks,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
  } = useTasks();
  
  const { user } = useAuth();
  
  const handleAddTimeBlock = (timeBlock: any) => {
    addTimeBlock(timeBlock);
    toast.success('Energy zone added');
  };
  
  const handleUpdateTimeBlock = (index: number, timeBlock: any) => {
    updateTimeBlock(index, timeBlock);
    toast.success('Energy zone updated');
  };
  
  const handleDeleteTimeBlock = (index: number) => {
    deleteTimeBlock(index);
    toast.success('Energy zone deleted');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calendar
            </Button>
          </Link>
        </div>
        
        <div className="glass-card rounded-lg p-6 animate-fade-in">
          <h1 className="text-2xl font-semibold mb-2">Settings</h1>
          {user && (
            <p className="text-muted-foreground mb-6">
              Logged in as {user.name} ({user.email})
            </p>
          )}
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-medium mb-4">Google Calendar Integration</h2>
              <GoogleCalendarSync />
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-medium mb-4">Energy Zones</h2>
              <EnergyZones
                timeBlocks={timeBlocks}
                onAddTimeBlock={handleAddTimeBlock}
                onUpdateTimeBlock={handleUpdateTimeBlock}
                onDeleteTimeBlock={handleDeleteTimeBlock}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
