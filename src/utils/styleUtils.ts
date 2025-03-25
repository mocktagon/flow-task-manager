
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

// Get tailwind classes for Linear-style components
export const getLinearStyleClasses = {
  card: "bg-card/30 border border-border/20 backdrop-blur-sm shadow-sm",
  input: "bg-background/50 border-border/20",
  button: "hover:bg-accent/40 transition-colors",
  glassPanel: "bg-card/20 backdrop-blur-sm border border-border/10 shadow-sm"
};
