
import { Task, TimeBlock, Project } from '../types';
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

  // Demo projects
  const initialProjects: Project[] = [
    {
      id: generateId(),
      title: 'Write a thriller novel',
      description: 'Complete a 300-page psychological thriller by end of year',
      createdAt: new Date(),
      color: 'purple-500',
    }
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
    },
    {
      id: generateId(),
      title: 'Outline plot for first chapter',
      description: 'Create detailed outline for opening chapter',
      priority: 'high',
      estimatedMinutes: 60,
      completed: false,
      inProgress: false,
      dateCreated: new Date(),
      dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
      elapsedSeconds: 0,
      projectId: initialProjects[0].id,
    }
  ];

  return { initialTasks, initialTimeBlocks, initialProjects };
};
