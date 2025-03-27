import React from 'react';
import { Task, TimeBlock, EnergyLevel } from '@/types';
import { getHourDivisions, getEnergyLevelClass } from '@/utils/taskUtils';
import TaskItem from './TaskItem';
import { CalendarDays, CircleDot, BarChart } from 'lucide-react';

interface CalendarProps {
  tasks: { [key: string]: Task[] };
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
  // Flatten tasks object into array for processing
  const flattenedTasks = Object.values(tasks).flat();
  
  const hours = getHourDivisions();
  
  // Get the energy level for a specific hour
  const getEnergyLevelForHour = (hour: string): EnergyLevel | null => {
    const hourNum = parseInt(hour.split(' ')[0]);
    const isPM = hour.includes('PM');
    let militaryHour = hourNum;
    
    if (isPM && hourNum !== 12) {
      militaryHour += 12;
    } else if (!isPM && hourNum === 12) {
      militaryHour = 0;
    }
    
    // Find time blocks that overlap with this hour
    const relevantTimeBlock = timeBlocks.find(block => {
      const startHour = parseInt(block.startTime.split(':')[0]);
      const endHour = parseInt(block.endTime.split(':')[0]);
      return militaryHour >= startHour && militaryHour < endHour;
    });
    
    return relevantTimeBlock ? relevantTimeBlock.energyLevel : null;
  };
  
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
    
    // Find tasks scheduled for this hour
    const hourTasks = flattenedTasks.filter(task => {
      if (!task.scheduledTime) return false;
      
      const [startTime, endTime] = task.scheduledTime.split('-');
      const taskStartHour = parseInt(startTime.split(':')[0]);
      const taskEndHour = parseInt(endTime.split(':')[0]);
      
      return militaryHour >= taskStartHour && militaryHour < taskEndHour;
    });
    
    return hourTasks;
  };
  
  // Count tasks by energy level
  const tasksByEnergyLevel = {
    high: flattenedTasks.filter(task => task.energyLevel === 'high').length,
    medium: flattenedTasks.filter(task => task.energyLevel === 'medium').length,
    low: flattenedTasks.filter(task => task.energyLevel === 'low').length,
    unassigned: flattenedTasks.filter(task => !task.energyLevel).length
  };
  
  return (
    <div className="flex flex-col h-full rounded-md overflow-hidden bg-white">
      <div className="flex items-center justify-between p-3 border-b bg-white">
        <h2 className="text-base font-medium flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-genz-blue" />
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </h2>
        
        {/* Energy level distribution */}
        <div className="flex items-center gap-2">
          <div className="text-xs flex items-center gap-1 bg-energy-high/10 text-energy-high px-2 py-0.5 rounded-full">
            <CircleDot className="h-3 w-3" />
            <span>{tasksByEnergyLevel.high}</span>
          </div>
          <div className="text-xs flex items-center gap-1 bg-energy-medium/10 text-energy-medium px-2 py-0.5 rounded-full">
            <CircleDot className="h-3 w-3" />
            <span>{tasksByEnergyLevel.medium}</span>
          </div>
          <div className="text-xs flex items-center gap-1 bg-energy-low/10 text-energy-low px-2 py-0.5 rounded-full">
            <CircleDot className="h-3 w-3" />
            <span>{tasksByEnergyLevel.low}</span>
          </div>
          {tasksByEnergyLevel.unassigned > 0 && (
            <div className="text-xs flex items-center gap-1 bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              <CircleDot className="h-3 w-3" />
              <span>{tasksByEnergyLevel.unassigned}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Energy zone legend */}
      <div className="flex items-center justify-between p-2 border-b bg-white/90 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <BarChart className="h-3 w-3" />
          <span>Energy zones:</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-energy-high"></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-energy-medium"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-energy-low"></div>
            <span>Low</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {hours.map((hour) => {
          const energyLevel = getEnergyLevelForHour(hour);
          const hourTasks = getTasksForHour(hour);
          
          return (
            <div key={hour} className="mb-2">
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center gap-2 py-1">
                <span className="text-xs font-medium text-gray-500 w-10">{hour}</span>
                <div className={`h-px flex-1 ${energyLevel ? `bg-energy-${energyLevel}/30` : 'bg-gray-100'}`} />
                
                {energyLevel && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getEnergyLevelClass(energyLevel)}`}>
                    {energyLevel}
                  </span>
                )}
              </div>
              
              <div className="pl-10 space-y-1.5">
                {hourTasks.length > 0 ? (
                  hourTasks.map(task => (
                    <TaskItem 
                      key={task.id}
                      task={task}
                      onStartTask={onStartTask}
                      onStopTask={onStopTask}
                      onToggleComplete={onToggleComplete}
                      isCalendarEvent={true}
                    />
                  ))
                ) : (
                  <div className={`py-1 text-center text-xs ${
                    energyLevel ? `text-energy-${energyLevel}/70 italic` : 'text-gray-400 italic'
                  }`}>
                    {energyLevel 
                      ? `${energyLevel} energy zone${hourTasks.length === 0 ? ' (available)' : ''}`
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
