
import { Task, TimeBlock, Priority } from '../types';

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

  // Group time blocks by energy level
  const highEnergyBlocks = timeBlocks.filter(b => b.energyLevel === 'high');
  const mediumEnergyBlocks = timeBlocks.filter(b => b.energyLevel === 'medium');
  const lowEnergyBlocks = timeBlocks.filter(b => b.energyLevel === 'low');
  
  // Combine all time blocks for later use if needed
  const allTimeBlocks = [...highEnergyBlocks, ...mediumEnergyBlocks, ...lowEnergyBlocks];

  // Create a copy of all tasks for assignment
  const tasksToAssign = [...sortedTasks];
  const assignedTasks: Task[] = [];
  
  // First, fill high energy blocks with any priority tasks
  // Higher priority tasks get the first pick at high energy blocks
  while (highEnergyBlocks.length > 0 && tasksToAssign.length > 0) {
    const task = tasksToAssign.shift();
    if (task) {
      const block = highEnergyBlocks.shift();
      if (block) {
        const updatedTask = { 
          ...task, 
          scheduledTime: `${block.startTime}-${block.endTime}`,
          energyLevel: 'high'
        };
        assignedTasks.push(updatedTask);
      }
    }
  }
  
  // Next, fill medium energy blocks with remaining tasks
  while (mediumEnergyBlocks.length > 0 && tasksToAssign.length > 0) {
    const task = tasksToAssign.shift();
    if (task) {
      const block = mediumEnergyBlocks.shift();
      if (block) {
        const updatedTask = { 
          ...task, 
          scheduledTime: `${block.startTime}-${block.endTime}`,
          energyLevel: 'medium'
        };
        assignedTasks.push(updatedTask);
      }
    }
  }
  
  // Finally, fill low energy blocks with remaining tasks
  while (lowEnergyBlocks.length > 0 && tasksToAssign.length > 0) {
    const task = tasksToAssign.shift();
    if (task) {
      const block = lowEnergyBlocks.shift();
      if (block) {
        const updatedTask = { 
          ...task, 
          scheduledTime: `${block.startTime}-${block.endTime}`,
          energyLevel: 'low'
        };
        assignedTasks.push(updatedTask);
      }
    }
  }
  
  // Randomly assign remaining tasks to any available time blocks, if available
  // If we have more tasks than time blocks, some will remain unscheduled
  if (tasksToAssign.length > 0 && allTimeBlocks.length > 0) {
    for (const task of tasksToAssign) {
      if (allTimeBlocks.length === 0) break;
      
      // Take a random time block from the remaining ones
      const randomIndex = Math.floor(Math.random() * allTimeBlocks.length);
      const block = allTimeBlocks.splice(randomIndex, 1)[0];
      
      const updatedTask = { 
        ...task, 
        scheduledTime: `${block.startTime}-${block.endTime}`,
        energyLevel: block.energyLevel
      };
      assignedTasks.push(updatedTask);
    }
  }
  
  // Add any remaining unscheduled tasks
  assignedTasks.push(...tasksToAssign);
  
  return assignedTasks;
};
