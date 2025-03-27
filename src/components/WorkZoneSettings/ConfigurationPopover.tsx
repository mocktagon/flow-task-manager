
import React from 'react';
import { TimeBlock } from '@/types';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import EnergyPatternCard from './EnergyPatternCard';

interface EnergyPattern {
  name: string;
  description: string;
  blocks: TimeBlock[];
}

interface ConfigurationPopoverProps {
  workStartTime: string;
  workEndTime: string;
  autoSchedule: boolean;
  energyPatterns: EnergyPattern[];
  onWorkStartTimeChange: (time: string) => void;
  onWorkEndTimeChange: (time: string) => void;
  onAutoScheduleChange: (enabled: boolean) => void;
  onSaveWorkingHours: () => void;
  onApplyPattern: (blocks: TimeBlock[]) => void;
}

const ConfigurationPopover = ({
  workStartTime,
  workEndTime,
  autoSchedule,
  energyPatterns,
  onWorkStartTimeChange,
  onWorkEndTimeChange,
  onAutoScheduleChange,
  onSaveWorkingHours,
  onApplyPattern,
}: ConfigurationPopoverProps) => {
  return (
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
                onChange={(e) => onWorkStartTimeChange(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end-time">End Time</Label>
              <Input 
                id="end-time" 
                type="time" 
                value={workEndTime} 
                onChange={(e) => onWorkEndTimeChange(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-schedule" className="cursor-pointer">Auto-schedule tasks</Label>
            <Switch 
              id="auto-schedule" 
              checked={autoSchedule}
              onCheckedChange={onAutoScheduleChange}
            />
          </div>
          
          <Button 
            className="w-full" 
            size="sm"
            onClick={onSaveWorkingHours}
          >
            Save Working Hours
          </Button>
          
          <div className="pt-2">
            <h4 className="font-medium mb-2">Quick Energy Patterns</h4>
            <div className="space-y-2">
              {energyPatterns.map((pattern, index) => (
                <EnergyPatternCard 
                  key={index} 
                  pattern={pattern} 
                  onApplyPattern={onApplyPattern}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ConfigurationPopover;
