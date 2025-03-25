
import { Task, TimeBlock } from '../types';
import { generateId } from '../utils/taskUtils';

export const useDemoData = () => {
  // Demo time blocks
  const initialTimeBlocks: TimeBlock[] = [
    { startTime: '9:00', endTime: '11:00', energyLevel: 'high' },
    { startTime: '11:00', endTime: '13:00', energyLevel: 'medium' },
    { startTime: '13:00', endTime: '14:00', energyLevel: 'low' },
    { startTime: '14:00', endTime: '16:00', energyLevel: 'medium' },
    { startTime: '16:00', endTime: '18:00', energyLevel: 'high' },
  ];

  // Demo tasks
  const initialTasks: Task[] = [
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

  return { initialTasks, initialTimeBlocks };
};
