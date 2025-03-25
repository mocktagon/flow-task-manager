
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface DueDateSelectorProps {
  dueDate: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export const DueDateSelector = ({ dueDate, onChange }: DueDateSelectorProps) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-muted-foreground">Due date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
