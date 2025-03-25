
import React from 'react';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';

interface TimeEstimateSelectorProps {
  estimatedMinutes: number;
  onChange: (minutes: number) => void;
}

export const TimeEstimateSelector = ({ estimatedMinutes, onChange }: TimeEstimateSelectorProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-muted-foreground">Estimated time</label>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <Input
          type="number"
          min="5"
          max="480"
          step="5"
          value={estimatedMinutes}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-20"
        />
        <span className="text-sm text-muted-foreground">minutes</span>
      </div>
    </div>
  );
};
