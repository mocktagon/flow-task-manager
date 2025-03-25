
import { useState, useEffect } from 'react';
import { Task } from '../types';

export const useTaskTimer = (
  tasks: Task[], 
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  const [timerIntervalId, setTimerIntervalId] = useState<number | null>(null);

  // Start task timer
  const startTaskTimer = (taskId: string) => {
    // Stop any currently running timers
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    
    // Mark all tasks as not in progress
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          return { ...task, inProgress: true };
        }
        return { ...task, inProgress: false };
      })
    );
    
    // Start the timer for this task
    const intervalId = window.setInterval(() => {
      setTasks(prev => 
        prev.map(task => {
          if (task.id === taskId && task.inProgress) {
            return { ...task, elapsedSeconds: task.elapsedSeconds + 1 };
          }
          return task;
        })
      );
    }, 1000);
    
    setTimerIntervalId(intervalId);
  };

  // Stop task timer
  const stopTaskTimer = (taskId: string) => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
    
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          return { ...task, inProgress: false };
        }
        return task;
      })
    );
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    };
  }, [timerIntervalId]);

  return { startTaskTimer, stopTaskTimer };
};
