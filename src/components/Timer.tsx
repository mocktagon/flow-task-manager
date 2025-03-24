
import React, { useState, useEffect } from 'react';
import { Task } from '@/types';
import { formatTimerTime, formatTime } from '@/utils/taskUtils';
import { Button } from '@/components/ui/button';
import { Pause, TimerReset } from 'lucide-react';

interface TimerProps {
  activeTask: Task | null;
  onStopTask: (taskId: string) => void;
}

const Timer = ({ activeTask, onStopTask }: TimerProps) => {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  useEffect(() => {
    if (activeTask) {
      const { estimatedMinutes, elapsedSeconds } = activeTask;
      const estimatedSeconds = estimatedMinutes * 60;
      const percentage = Math.min(100, (elapsedSeconds / estimatedSeconds) * 100);
      setCompletionPercentage(percentage);
    } else {
      setCompletionPercentage(0);
    }
  }, [activeTask]);
  
  if (!activeTask) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 w-72 glass-card rounded-lg p-4 shadow-lg border border-primary/20 animate-slide-up">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Current Task</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onStopTask(activeTask.id)}
        >
          <Pause className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm mb-2 truncate">{activeTask.title}</p>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
        <span>
          {formatTimerTime(activeTask.elapsedSeconds)}
        </span>
        <span>
          Est: {formatTime(activeTask.estimatedMinutes)}
        </span>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      
      {completionPercentage >= 100 && (
        <p className="mt-2 text-xs text-amber-500">
          You've exceeded the estimated time for this task.
        </p>
      )}
    </div>
  );
};

export default Timer;
