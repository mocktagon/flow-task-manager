
import { useState } from 'react';
import { TimeBlock, EnergyLevel } from '@/types';
import { toast } from 'sonner';

interface EnergyPattern {
  name: string;
  description: string;
  blocks: TimeBlock[];
}

export const useWorkZoneSettings = (
  timeBlocks: TimeBlock[],
  onAddTimeBlock: (timeBlock: TimeBlock) => void,
  onUpdateTimeBlock: (index: number, timeBlock: TimeBlock) => void,
  onDeleteTimeBlock: (index: number) => void
) => {
  const [workStartTime, setWorkStartTime] = useState('09:00');
  const [workEndTime, setWorkEndTime] = useState('17:00');
  const [autoSchedule, setAutoSchedule] = useState(true);
  
  // Calculate working hours
  const calculateWorkingHours = () => {
    const start = parseInt(workStartTime.split(':')[0]);
    const end = parseInt(workEndTime.split(':')[0]);
    return end - start;
  };
  
  // Helper function to add hours to a time string
  function addHours(timeString: string, hoursToAdd: number): string {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalHours = hours + hoursToAdd;
    return `${String(totalHours % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
  
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
  
  // Apply an energy pattern
  const applyEnergyPattern = (patternBlocks: TimeBlock[]) => {
    // Clear existing time blocks
    while (timeBlocks.length > 0) {
      onDeleteTimeBlock(0);
    }
    
    // Add new time blocks based on pattern
    patternBlocks.forEach(block => {
      onAddTimeBlock(block);
    });
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

  return {
    workStartTime,
    workEndTime,
    autoSchedule,
    energyPatterns,
    calculateWorkingHours,
    setWorkStartTime,
    setWorkEndTime,
    setAutoSchedule,
    applyEnergyPattern,
    saveWorkingHours
  };
};
