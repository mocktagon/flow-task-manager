
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TimeBlock } from '../types';
import { useDemoData } from '../hooks/useDemoData';
import { useTaskOperations } from '../hooks/useTaskOperations';
import { useTimeBlocks } from '../hooks/useTimeBlocks';
import { useTaskTimer } from '../hooks/useTaskTimer';

interface TaskContextType {
  tasks: Task[];
  timeBlocks: TimeBlock[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addTask: (task: Omit<Task, 'id' | 'dateCreated' | 'elapsedSeconds' | 'inProgress' | 'completed'>) => Task;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  startTaskTimer: (taskId: string) => void;
  stopTaskTimer: (taskId: string) => void;
  addTimeBlock: (timeBlock: TimeBlock) => void;
  updateTimeBlock: (index: number, updatedTimeBlock: TimeBlock) => void;
  deleteTimeBlock: (index: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initialTasks, initialTimeBlocks } = useDemoData();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(initialTimeBlocks);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Tasks operations
  const { addTask, updateTask, deleteTask, toggleTaskCompletion } = useTaskOperations(tasks, setTasks);
  
  // Time blocks operations
  const { addTimeBlock, updateTimeBlock, deleteTimeBlock } = useTimeBlocks(timeBlocks, setTimeBlocks);
  
  // Timer functionality
  const { startTaskTimer, stopTaskTimer } = useTaskTimer(tasks, setTasks);

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

  const value = {
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

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
