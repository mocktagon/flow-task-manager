
import { Task, Priority, TimeBlock, EnergyLevel } from '../types';

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Format minutes to hours and minutes
export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
};

// Format seconds to MM:SS
export const formatTimerTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Get color class based on priority
export const getPriorityClass = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'priority-high';
    case 'medium':
      return 'priority-medium';
    case 'low':
      return 'priority-low';
    default:
      return '';
  }
};

// Get color class based on energy level
export const getEnergyLevelClass = (energyLevel: EnergyLevel): string => {
  switch (energyLevel) {
    case 'high':
      return 'time-block-high';
    case 'medium':
      return 'time-block-medium';
    case 'low':
      return 'time-block-low';
    default:
      return '';
  }
};

// Get tasks for the current day
export const getTasksForDate = (tasks: Task[], date: Date): Task[] => {
  const dateString = date.toDateString();
  return tasks.filter(task => {
    return task.dueDate && task.dueDate.toDateString() === dateString;
  });
};

// Get backlog tasks (tasks from previous days that aren't completed)
export const getBacklogTasks = (tasks: Task[], date: Date): Task[] => {
  const today = date.toDateString();
  return tasks.filter(task => {
    return task.dueDate && 
           task.dueDate.toDateString() !== today && 
           new Date(task.dueDate) < date &&
           !task.completed;
  });
};

// Calculate optimal task arrangement based on priority and energy levels
export const arrangeTasksByEnergyLevels = (
  tasks: Task[], 
  timeBlocks: TimeBlock[]
): Task[] => {
  if (!tasks.length || !timeBlocks.length) return tasks;

  // Sort tasks by priority (high first)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityMap: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
    return priorityMap[b.priority] - priorityMap[a.priority];
  });

  const highPriorityTasks = sortedTasks.filter(t => t.priority === 'high');
  const mediumPriorityTasks = sortedTasks.filter(t => t.priority === 'medium');
  const lowPriorityTasks = sortedTasks.filter(t => t.priority === 'low');

  // Group time blocks by energy level
  const highEnergyBlocks = timeBlocks.filter(b => b.energyLevel === 'high');
  const mediumEnergyBlocks = timeBlocks.filter(b => b.energyLevel === 'medium');
  const lowEnergyBlocks = timeBlocks.filter(b => b.energyLevel === 'low');

  // Assign tasks to time blocks based on priority and energy level
  const assignedTasks: Task[] = [];
  
  // Ideally high priority tasks go to high energy blocks
  highPriorityTasks.forEach(task => {
    if (highEnergyBlocks.length > 0) {
      const block = highEnergyBlocks[0];
      const updatedTask = { 
        ...task, 
        scheduledTime: `${block.startTime}-${block.endTime}` 
      };
      assignedTasks.push(updatedTask);
    } else {
      assignedTasks.push(task);
    }
  });

  // Medium priority tasks go to medium energy blocks
  mediumPriorityTasks.forEach(task => {
    if (mediumEnergyBlocks.length > 0) {
      const block = mediumEnergyBlocks[0];
      const updatedTask = { 
        ...task, 
        scheduledTime: `${block.startTime}-${block.endTime}` 
      };
      assignedTasks.push(updatedTask);
    } else {
      assignedTasks.push(task);
    }
  });

  // Low priority tasks go to low energy blocks
  lowPriorityTasks.forEach(task => {
    if (lowEnergyBlocks.length > 0) {
      const block = lowEnergyBlocks[0];
      const updatedTask = { 
        ...task, 
        scheduledTime: `${block.startTime}-${block.endTime}` 
      };
      assignedTasks.push(updatedTask);
    } else {
      assignedTasks.push(task);
    }
  });

  return assignedTasks;
};

// Get hour divisions for day view
export const getHourDivisions = (): string[] => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const amPm = i < 12 ? 'AM' : 'PM';
    hours.push(`${hour} ${amPm}`);
  }
  return hours;
};
