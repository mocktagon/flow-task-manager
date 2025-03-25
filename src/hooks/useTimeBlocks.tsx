
import { TimeBlock } from '../types';

export const useTimeBlocks = (
  timeBlocks: TimeBlock[], 
  setTimeBlocks: React.Dispatch<React.SetStateAction<TimeBlock[]>>
) => {
  // Add time block
  const addTimeBlock = (timeBlock: TimeBlock) => {
    setTimeBlocks(prev => [...prev, timeBlock]);
  };

  // Update time block
  const updateTimeBlock = (index: number, updatedTimeBlock: TimeBlock) => {
    setTimeBlocks(prev => {
      const newBlocks = [...prev];
      newBlocks[index] = updatedTimeBlock;
      return newBlocks;
    });
  };

  // Delete time block
  const deleteTimeBlock = (index: number) => {
    setTimeBlocks(prev => prev.filter((_, i) => i !== index));
  };

  return { addTimeBlock, updateTimeBlock, deleteTimeBlock };
};
