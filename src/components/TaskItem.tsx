
import React from 'react';
import { Task } from '@/types';
import { formatTime, formatTimerTime, getPriorityClass } from '@/utils/taskUtils';
import { Button } from '@/components/ui/button';
import { Play, Pause, Check, Clock } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onStartTask: (taskId: string) => void;
  onStopTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskItem = ({ task, onStartTask, onStopTask, onToggleComplete }: TaskItemProps) => {
  const {
    id,
    title,
    description,
    priority,
    estimatedMinutes,
    elapsedSeconds,
    inProgress,
    completed,
    energyLevel = 'medium', // Default to medium if not specified
  } = task;
  
  const priorityClass = getPriorityClass(priority);
  
  // Determine background color based on energy level
  const getEnergyBackgroundClass = () => {
    if (completed) return 'bg-gray-100';
    
    switch (energyLevel) {
      case 'high':
        return 'bg-energy-high text-white';
      case 'medium':
        return 'bg-energy-medium text-white';
      case 'low':
        return 'bg-energy-low text-gray-800';
      default:
        return 'bg-white';
    }
  };
  
  return (
    <div 
      className={`task-item rounded-md p-3 ${getEnergyBackgroundClass()} shadow-sm ${completed ? 'opacity-70' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button 
            className={`h-4 w-4 rounded-full border ${completed ? 'bg-white border-white' : 'border-white bg-transparent'} 
              flex items-center justify-center`}
            onClick={() => onToggleComplete(id)}
          >
            {completed && <Check className="h-2 w-2 text-energy-high" />}
          </button>
          <h3 className={`font-medium text-sm ${completed ? 'line-through opacity-70' : ''}`}>
            {title}
          </h3>
        </div>
        <span className={`priority-badge text-xs ${priorityClass} ${completed ? 'opacity-50' : ''}`}>
          {priority}
        </span>
      </div>
      
      {description && (
        <p className="text-xs opacity-90 mb-2 pl-6">{description}</p>
      )}
      
      <div className="flex items-center justify-between mt-2 text-xs">
        <div className="flex items-center gap-1 opacity-90">
          <Clock className="h-3 w-3" />
          <span>{formatTime(estimatedMinutes)}</span>
          
          {elapsedSeconds > 0 && (
            <span className="ml-1">
              / {formatTimerTime(elapsedSeconds)}
            </span>
          )}
        </div>
        
        {!completed && (
          <div className="flex gap-1">
            {inProgress ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 px-2 bg-white/20 hover:bg-white/30 text-white border-white/30" 
                onClick={() => onStopTask(id)}
              >
                <Pause className="h-3 w-3" />
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 px-2 bg-white/20 hover:bg-white/30 text-white border-white/30" 
                onClick={() => onStartTask(id)}
              >
                <Play className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
