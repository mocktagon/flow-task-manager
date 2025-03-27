
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
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-md shadow-sm">
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="text-base font-medium">
          {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {hours.map((hour) => {
          const { tasks: hourTasks, timeBlocks: hourBlocks } = getTasksForHour(hour);
          const energyBlock = hourBlocks[0];
          
          return (
            <div key={hour} className="mb-2">
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center gap-2 py-1">
                <span className="text-xs font-medium text-gray-500 w-10">{hour}</span>
                <div className="h-px flex-1 bg-gray-100" />
                
                {energyBlock && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getEnergyLevelClass(energyBlock.energyLevel)}`}>
                    {energyBlock.energyLevel}
                  </span>
                )}
              </div>
              
              <div className="pl-10 space-y-1.5">
                {hourTasks.length > 0 ? (
                  hourTasks.map(task => (
                    <TaskItem 
                      key={task.id}
                      task={{...task, energyLevel: energyBlock?.energyLevel}}
                      onStartTask={onStartTask}
                      onStopTask={onStopTask}
                      onToggleComplete={onToggleComplete}
                      isCalendarEvent={true}
                    />
                  ))
                ) : (
                  <div className="py-1 text-center text-xs text-gray-400 italic">
                    {energyBlock 
                      ? `${energyBlock.energyLevel} energy`
                      : ''}
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
