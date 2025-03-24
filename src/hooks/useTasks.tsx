
import { useState, useEffect } from 'react';
import { Task, Priority, TimeBlock } from '../types';
import { generateId } from '../utils/taskUtils';

// Demo data
const initialTimeBlocks: TimeBlock[] = [
  { startTime: '9:00', endTime: '11:00', energyLevel: 'high' },
  { startTime: '11:00', endTime: '13:00', energyLevel: 'medium' },
  { startTime: '13:00', endTime: '14:00', energyLevel: 'low' },
  { startTime: '14:00', endTime: '16:00', energyLevel: 'medium' },
  { startTime: '16:00', endTime: '18:00', energyLevel: 'high' },
];

const demoTasks: Task[] = [
  {
    id: generateId(),
    title: 'Prepare presentation',
    description: 'Finalize slides for the client meeting',
    priority: 'high',
    estimatedMinutes: 60,
    completed: false,
    inProgress: false,
    dateCreated: new Date(),
    dueDate: new Date(),
    elapsedSeconds: 0,
  },
  {
    id: generateId(),
    title: 'Research competitors',
    description: 'Analyze top 3 competitors in the market',
    priority: 'medium',
    estimatedMinutes: 45,
    completed: false,
    inProgress: false,
    dateCreated: new Date(),
    dueDate: new Date(),
    elapsedSeconds: 0,
  },
  {
    id: generateId(),
    title: 'Email weekly report',
    description: 'Send status update to the team',
    priority: 'low',
    estimatedMinutes: 15,
    completed: false,
    inProgress: false,
    dateCreated: new Date(),
    dueDate: new Date(),
    elapsedSeconds: 0,
  },
  {
    id: generateId(),
    title: 'Budget review',
    description: 'Quarterly budget analysis',
    priority: 'high',
    estimatedMinutes: 90,
    completed: false,
    inProgress: false,
    dateCreated: new Date(Date.now() - 86400000), // Yesterday
    dueDate: new Date(Date.now() - 86400000),
    elapsedSeconds: 0,
  }
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(initialTimeBlocks);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timerIntervalId, setTimerIntervalId] = useState<number | null>(null);

  useEffect(() => {
    // Load data from localStorage if available
    const savedTasks = localStorage.getItem('flow-tasks');
    const savedTimeBlocks = localStorage.getItem('flow-time-blocks');
    
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      // Convert date strings back to Date objects
      const processedTasks = parsedTasks.map((task: any) => ({
        ...task,
        dateCreated: new Date(task.dateCreated),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
      setTasks(processedTasks);
    }
    
    if (savedTimeBlocks) {
      setTimeBlocks(JSON.parse(savedTimeBlocks));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever data changes
    localStorage.setItem('flow-tasks', JSON.stringify(tasks));
    localStorage.setItem('flow-time-blocks', JSON.stringify(timeBlocks));
  }, [tasks, timeBlocks]);

  // Add new task
  const addTask = (task: Omit<Task, 'id' | 'dateCreated' | 'elapsedSeconds' | 'inProgress' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      dateCreated: new Date(),
      elapsedSeconds: 0,
      inProgress: false,
      completed: false,
    };
    
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  // Update task
  const updateTask = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          // If task is in progress, stop the timer first
          if (task.inProgress) {
            stopTaskTimer(taskId);
          }
          return { ...task, completed: !task.completed, inProgress: false };
        }
        return task;
      })
    );
  };

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

  // Add time block
  const addTimeBlock = (timeBlock: TimeBlock) => {
    setTimeBlocks(prev => [...prev, timeBlock]);
  };

  // Update time block
  const updateTimeBlock = (index: number, updatedTimeBlock: TimeBlock) => {
    setTimeBlocks(prev => {
      const newBlocks = [...prev];
      newBlocks[index] = updatedTimeBlock;
      return newBlocks;
    });
  };

  // Delete time block
  const deleteTimeBlock = (index: number) => {
    setTimeBlocks(prev => prev.filter((_, i) => i !== index));
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    };
  }, [timerIntervalId]);

  return {
    tasks,
    timeBlocks,
    selectedDate,
    setSelectedDate,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    startTaskTimer,
    stopTaskTimer,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
  };
};
