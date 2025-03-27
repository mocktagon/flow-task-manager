
import React, { useState } from 'react';
import { TimeBlock, EnergyLevel } from '@/types';
import { Button } from '@/components/ui/button';
import { Clock, Settings } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface WorkZoneSettingsProps {
  timeBlocks: TimeBlock[];
  onAddTimeBlock: (timeBlock: TimeBlock) => void;
  onUpdateTimeBlock: (index: number, timeBlock: TimeBlock) => void;
  onDeleteTimeBlock: (index: number) => void;
}

const WorkZoneSettings = ({
  timeBlocks,
  onAddTimeBlock,
  onUpdateTimeBlock,
  onDeleteTimeBlock,
}: WorkZoneSettingsProps) => {
  const [workStartTime, setWorkStartTime] = useState('09:00');
  const [workEndTime, setWorkEndTime] = useState('17:00');
  const [autoSchedule, setAutoSchedule] = useState(true);
  
  // Calculate working hours
  const calculateWorkingHours = () => {
    const start = parseInt(workStartTime.split(':')[0]);
    const end = parseInt(workEndTime.split(':')[0]);
    return end - start;
  };
  
  // Define quick energy distribution patterns
  const energyPatterns = [
    { 
      name: "Morning focus", 
      description: "High energy in the morning, tapering off throughout the day",
      blocks: [
        { startTime: workStartTime, endTime: addHours(workStartTime, 3), energyLevel: 'high' as EnergyLevel },
        { startTime: addHours(workStartTime, 3), endTime: addHours(workStartTime, 6), energyLevel: 'medium' as EnergyLevel },
        { startTime: addHours(workStartTime, 6), endTime: workEndTime, energyLevel: 'low' as EnergyLevel },
      ]
    },
    { 
      name: "Afternoon boost", 
      description: "Medium morning, high afternoon, low evening",
      blocks: [
        { startTime: workStartTime, endTime: addHours(workStartTime, 3), energyLevel: 'medium' as EnergyLevel },
        { startTime: addHours(workStartTime, 3), endTime: addHours(workStartTime, 6), energyLevel: 'high' as EnergyLevel },
        { startTime: addHours(workStartTime, 6), endTime: workEndTime, energyLevel: 'low' as EnergyLevel },
      ]
    },
    { 
      name: "Night owl", 
      description: "Energy increases throughout the day",
      blocks: [
        { startTime: workStartTime, endTime: addHours(workStartTime, 3), energyLevel: 'low' as EnergyLevel },
        { startTime: addHours(workStartTime, 3), endTime: addHours(workStartTime, 6), energyLevel: 'medium' as EnergyLevel },
        { startTime: addHours(workStartTime, 6), endTime: workEndTime, energyLevel: 'high' as EnergyLevel },
      ]
    },
  ];
  
  // Helper function to add hours to a time string
  function addHours(timeString: string, hoursToAdd: number): string {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalHours = hours + hoursToAdd;
    return `${String(totalHours % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
  
  // Apply an energy pattern
  const applyEnergyPattern = (pattern: typeof energyPatterns[0]) => {
    // Clear existing time blocks
    while (timeBlocks.length > 0) {
      onDeleteTimeBlock(0);
    }
    
    // Add new time blocks based on pattern
    pattern.blocks.forEach(block => {
      onAddTimeBlock(block);
    });
    
    toast.success(`Applied "${pattern.name}" energy pattern`);
  };
  
  // Save working hours
  const saveWorkingHours = () => {
    // Validate times
    const startHour = parseInt(workStartTime.split(':')[0]);
    const endHour = parseInt(workEndTime.split(':')[0]);
    
    if (startHour >= endHour) {
      toast.error("End time must be after start time");
      return;
    }
    
    toast.success(`Working hours updated: ${workStartTime} to ${workEndTime}`);
    
    // Optionally adjust existing time blocks to fit within new working hours
    // This is a simplistic approach - a more sophisticated one would adjust proportionally
    const adjustedTimeBlocks = timeBlocks.map((block, index) => {
      const blockStartHour = parseInt(block.startTime.split(':')[0]);
      const blockEndHour = parseInt(block.endTime.split(':')[0]);
      
      // If block is outside working hours, adjust it
      if (blockStartHour < startHour || blockEndHour > endHour) {
        return {
          ...block,
          startTime: blockStartHour < startHour ? workStartTime : block.startTime,
          endTime: blockEndHour > endHour ? workEndTime : block.endTime
        };
      }
      
      return block;
    });
    
    // Update all time blocks
    adjustedTimeBlocks.forEach((block, index) => {
      onUpdateTimeBlock(index, block);
    });
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-genz-blue/10 flex items-center justify-center">
            <Clock className="h-4 w-4 text-genz-blue" />
          </div>
          Work Zone Settings
        </h3>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-3.5 w-3.5" />
              Configure
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Working Hours</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input 
                    id="start-time" 
                    type="time" 
                    value={workStartTime} 
                    onChange={(e) => setWorkStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input 
                    id="end-time" 
                    type="time" 
                    value={workEndTime} 
                    onChange={(e) => setWorkEndTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-schedule" className="cursor-pointer">Auto-schedule tasks</Label>
                <Switch 
                  id="auto-schedule" 
                  checked={autoSchedule}
                  onCheckedChange={setAutoSchedule}
                />
              </div>
              
              <Button 
                className="w-full" 
                size="sm"
                onClick={saveWorkingHours}
              >
                Save Working Hours
              </Button>
              
              <div className="pt-2">
                <h4 className="font-medium mb-2">Quick Energy Patterns</h4>
                <div className="space-y-2">
                  {energyPatterns.map((pattern, index) => (
                    <div 
                      key={index}
                      className="p-2 border rounded-md hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => applyEnergyPattern(pattern)}
                    >
                      <div className="font-medium">{pattern.name}</div>
                      <div className="text-xs text-muted-foreground">{pattern.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="grid grid-cols-3 gap-2 bg-background/50 p-3 rounded-lg border">
        <div className="text-center p-2">
          <div className="text-sm font-medium text-genz-blue">Working Hours</div>
          <div className="text-lg">{workStartTime} - {workEndTime}</div>
          <div className="text-xs text-muted-foreground">{calculateWorkingHours()} hours</div>
        </div>
        
        <div className="text-center p-2">
          <div className="text-sm font-medium text-genz-green">Energy Zones</div>
          <div className="text-lg">{timeBlocks.length}</div>
          <div className="text-xs text-muted-foreground">Configured zones</div>
        </div>
        
        <div className="text-center p-2">
          <div className="text-sm font-medium text-genz-purple">Auto Schedule</div>
          <div className="text-lg">{autoSchedule ? 'Enabled' : 'Disabled'}</div>
          <div className="text-xs text-muted-foreground">Task assignment</div>
        </div>
      </div>
      
      <div className="flex mt-2 gap-1 flex-wrap">
        {timeBlocks.map((block, index) => (
          <div 
            key={index}
            className={`text-xs px-2 py-1 rounded-full ${
              block.energyLevel === 'high' ? 'bg-energy-high/10 text-energy-high' :
              block.energyLevel === 'medium' ? 'bg-energy-medium/10 text-energy-medium' :
              'bg-energy-low/10 text-energy-low'
            }`}
          >
            {block.startTime}-{block.endTime} ({block.energyLevel})
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkZoneSettings;
