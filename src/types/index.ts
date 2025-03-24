
export type Priority = 'high' | 'medium' | 'low';
export type EnergyLevel = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  estimatedMinutes: number;
  completed: boolean;
  inProgress: boolean;
  dateCreated: Date;
  dueDate?: Date;
  scheduledTime?: string;
  elapsedSeconds: number;
}

export interface TimeBlock {
  startTime: string;
  endTime: string;
  energyLevel: EnergyLevel;
}

export interface DaySchedule {
  date: Date;
  timeBlocks: TimeBlock[];
  tasks: Task[];
}
