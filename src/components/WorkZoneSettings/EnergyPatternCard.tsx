
import React from 'react';
import { TimeBlock, EnergyLevel } from '@/types';
import { toast } from 'sonner';

interface EnergyPatternCardProps {
  pattern: {
    name: string;
    description: string;
    blocks: TimeBlock[];
  };
  onApplyPattern: (blocks: TimeBlock[]) => void;
}

const EnergyPatternCard = ({ pattern, onApplyPattern }: EnergyPatternCardProps) => {
  const handleClick = () => {
    onApplyPattern(pattern.blocks);
    toast.success(`Applied "${pattern.name}" energy pattern`);
  };

  return (
    <div 
      className="p-2 border rounded-md hover:bg-accent cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <div className="font-medium">{pattern.name}</div>
      <div className="text-xs text-muted-foreground">{pattern.description}</div>
    </div>
  );
};

export default EnergyPatternCard;
