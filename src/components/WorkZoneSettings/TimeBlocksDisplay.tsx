
import React from 'react';
import { TimeBlock } from '@/types';

interface TimeBlocksDisplayProps {
  timeBlocks: TimeBlock[];
}

const TimeBlocksDisplay = ({ timeBlocks }: TimeBlocksDisplayProps) => {
  return (
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
  );
};

export default TimeBlocksDisplay;
