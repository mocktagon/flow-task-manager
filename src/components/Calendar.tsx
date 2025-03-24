
import React from 'react';
import { Task, TimeBlock } from '@/types';
import { getHourDivisions, getEnergyLevelClass } from '@/utils/taskUtils';
import TaskItem from './TaskItem';

interface CalendarProps {
  tasks: Task[];
  timeBlocks: TimeBlock[];
  date: Date;
  onStartTask: (taskId: string) => void;
  onStopTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const Calendar = ({
  tasks,
  timeBlocks,
  date,
  onStartTask,
  onStopTask,
  onToggleComplete,
}: CalendarProps) => {
  const hours = getHourDivisions();
  
  // Arrange tasks into time slots
  const getTasksForHour = (hour: string) => {
    const hourNum = parseInt(hour.split(' ')[0]);
    const isPM = hour.includes('PM');
    let militaryHour = hourNum;
    
    if (isPM && hourNum !== 12) {
      militaryHour += 12;
    } else if (!isPM && hourNum === 12) {
      militaryHour = 0;
    }
    
    // Find time blocks that overlap with this hour
    const relevantTimeBlocks = timeBlocks.filter(block => {
      const startHour = parseInt(block.startTime.split(':')[0]);
      const endHour = parseInt(block.endTime.split(':')[0]);
      return militaryHour >= startHour && militaryHour < endHour;
    });
    
    // Find tasks scheduled for relevant time blocks
    const hourTasks = tasks.filter(task => {
      if (!task.scheduledTime) return false;
      
      const [startTime, endTime] = task.scheduledTime.split('-');
      const taskStartHour = parseInt(startTime.split(':')[0]);
      const taskEndHour = parseInt(endTime.split(':')[0]);
      
      return militaryHour >= taskStartHour && militaryHour < taskEndHour;
    });
    
    return { tasks: hourTasks, timeBlocks: relevantTimeBlocks };
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-semibold">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        {hours.map((hour) => {
          const { tasks: hourTasks, timeBlocks: hourBlocks } = getTasksForHour(hour);
          const energyBlock = hourBlocks[0];
          
          return (
            <div key={hour} className="mb-4">
              <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 flex items-center gap-2 pb-1">
                <span className="text-sm font-medium text-muted-foreground">{hour}</span>
                <div className="h-px flex-1 bg-border" />
                
                {energyBlock && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getEnergyLevelClass(energyBlock.energyLevel)}`}>
                    {energyBlock.energyLevel} energy
                  </span>
                )}
              </div>
              
              <div className="pl-14 space-y-2 animate-fade-in">
                {hourTasks.length > 0 ? (
                  hourTasks.map(task => (
                    <TaskItem 
                      key={task.id}
                      task={task}
                      onStartTask={onStartTask}
                      onStopTask={onStopTask}
                      onToggleComplete={onToggleComplete}
                    />
                  ))
                ) : (
                  <div className="py-3 text-center text-sm text-muted-foreground italic">
                    {energyBlock 
                      ? `Available time slot (${energyBlock.energyLevel} energy)`
                      : 'No tasks scheduled'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
