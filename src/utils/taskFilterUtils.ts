
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
