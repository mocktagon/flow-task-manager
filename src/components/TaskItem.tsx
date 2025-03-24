
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
  } = task;
  
  const priorityClass = getPriorityClass(priority);
  
  return (
    <div className={`glass-card task-item rounded-lg p-4 ${completed ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button 
            className={`h-5 w-5 rounded-full border ${completed ? 'bg-primary border-primary' : 'border-muted-foreground'} 
              flex items-center justify-center`}
            onClick={() => onToggleComplete(id)}
          >
            {completed && <Check className="h-3 w-3 text-white" />}
          </button>
          <h3 className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}>
            {title}
          </h3>
        </div>
        <span className={`priority-badge ${priorityClass}`}>
          {priority}
        </span>
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
      )}
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Est: {formatTime(estimatedMinutes)}</span>
          
          {elapsedSeconds > 0 && (
            <span className="ml-1">
              Elapsed: {formatTimerTime(elapsedSeconds)}
            </span>
          )}
        </div>
        
        {!completed && (
          <div className="flex gap-1">
            {inProgress ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2" 
                onClick={() => onStopTask(id)}
              >
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2" 
                onClick={() => onStartTask(id)}
              >
                <Play className="h-3 w-3 mr-1" />
                Start
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
