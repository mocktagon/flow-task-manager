
import React from 'react';
import { Priority } from '@/types';

interface PrioritySelectorProps {
  priority: Priority;
  onChange: (priority: Priority) => void;
}

export const PrioritySelector = ({ priority, onChange }: PrioritySelectorProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-muted-foreground">Priority</label>
      <div className="flex gap-2">
        {(['low', 'medium', 'high'] as Priority[]).map((p) => (
          <button
            key={p}
            type="button"
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              priority === p
                ? `bg-priority-${p} text-white`
                : `bg-muted hover:bg-muted/80 text-muted-foreground`
            }`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};
