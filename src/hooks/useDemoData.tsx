
import { Task, TimeBlock, Project, ProjectActivity } from '../types';
import { generateId } from '../utils/taskUtils';
import { format, subDays } from 'date-fns';

export const useDemoData = () => {
  // Generate activity data for the last 90 days
  const generateActivityData = (): ProjectActivity[] => {
    const today = new Date();
    return Array.from({ length: 90 }, (_, i) => {
      const date = format(subDays(today, 90 - i - 1), 'yyyy-MM-dd');
      // Create some patterns in the data
      let count = 0;
      
      // More activity on weekends
      const dayOfWeek = new Date(date).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        count = Math.floor(Math.random() * 5) + 2;
      } else {
        // Random activity on weekdays with some empty days
        count = Math.random() > 0.3 ? Math.floor(Math.random() * 3) : 0;
      }
      
      return { date, count };
    });
  };

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
      description: 'Complete a 300-page psychological thriller by end of year. The story follows a detective trying to solve a series of mysterious disappearances in a small coastal town, only to discover supernatural elements at play. The protagonist must confront their own past traumas while racing against time.',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      color: 'purple-500',
      activity: generateActivityData()
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
