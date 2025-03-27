
import React from 'react';
import { Task, TimeBlock } from '@/types';
import Calendar from '@/components/Calendar';
import WorkZoneSettings from '@/components/WorkZoneSettings';

interface CalendarSectionProps {
  arrangedTasks: { [key: string]: Task[] };
  timeBlocks: TimeBlock[];
  selectedDate: Date;
  onStartTask: (taskId: string) => void;
  onStopTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onAddTimeBlock: (timeBlock: TimeBlock) => void;
  onUpdateTimeBlock: (index: number, timeBlock: TimeBlock) => void;
  onDeleteTimeBlock: (index: number) => void;
}

const CalendarSection = ({
  arrangedTasks,
  timeBlocks,
  selectedDate,
  onStartTask,
  onStopTask,
  onToggleComplete,
  onAddTimeBlock,
  onUpdateTimeBlock,
  onDeleteTimeBlock
}: CalendarSectionProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="genz-card p-6 genz-glow">
        <WorkZoneSettings 
          timeBlocks={timeBlocks}
          onAddTimeBlock={onAddTimeBlock}
          onUpdateTimeBlock={onUpdateTimeBlock}
          onDeleteTimeBlock={onDeleteTimeBlock}
        />
        
        <Calendar
          tasks={arrangedTasks}
          timeBlocks={timeBlocks}
          date={selectedDate}
          onStartTask={onStartTask}
          onStopTask={onStopTask}
          onToggleComplete={onToggleComplete}
        />
      </div>
    </div>
  );
};

export default CalendarSection;
