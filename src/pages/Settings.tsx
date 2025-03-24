
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import EnergyZones from '@/components/EnergyZones';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const {
    timeBlocks,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
  } = useTasks();
  
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
          <Link to="/">
            <Button variant="ghost" className="p-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calendar
            </Button>
          </Link>
        </div>
        
        <div className="glass-card rounded-lg p-6 animate-fade-in">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>
          
          <EnergyZones
            timeBlocks={timeBlocks}
            onAddTimeBlock={handleAddTimeBlock}
            onUpdateTimeBlock={handleUpdateTimeBlock}
            onDeleteTimeBlock={handleDeleteTimeBlock}
          />
        </div>
      </main>
    </div>
  );
};

export default Settings;
