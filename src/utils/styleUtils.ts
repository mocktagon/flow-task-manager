
import { Priority, EnergyLevel } from '../types';

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
