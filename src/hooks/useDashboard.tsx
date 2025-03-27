
import { Task, TimeBlock } from '@/types';
import { useTasks } from '@/hooks/useTasks';
import { getTasksForDate, getBacklogTasks, arrangeTasksByEnergyLevels } from '@/utils/taskUtils';
import { toast } from 'sonner';

export const useDashboard = () => {
  const {
    tasks,
    timeBlocks,
    selectedDate,
    setSelectedDate,
    addTask,
    toggleTaskCompletion,
    startTaskTimer,
    stopTaskTimer,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
  } = useTasks();
  
  // Get tasks for today
  const todayTasks = getTasksForDate(tasks, selectedDate);
  
  // Get backlog tasks
  const backlogTasks = getBacklogTasks(tasks, selectedDate);
  
  // Arrange tasks by energy levels - returns object with keys for energy levels
  const arrangedTasks = arrangeTasksByEnergyLevels(todayTasks, timeBlocks);
  
  // Find active task
  const activeTask = tasks.find(task => task.inProgress) || null;
  
  // Handle adding a new task
  const handleAddTask = (task: any) => {
    const newTask = addTask(task);
    toast.success('Task added successfully');
    return newTask;
  };
  
  // Handle starting a task
  const handleStartTask = (taskId: string) => {
    startTaskTimer(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast.success(`Started: ${task.title}`);
    }
  };
  
  // Handle stopping a task
  const handleStopTask = (taskId: string) => {
    stopTaskTimer(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast.info(`Paused: ${task.title}`);
    }
  };
  
  // Handle task completion
  const handleToggleComplete = (taskId: string) => {
    toggleTaskCompletion(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      toast.success(`Completed: ${task.title}`);
    }
  };

  return {
    tasks,
    backlogTasks,
    arrangedTasks,
    timeBlocks,
    selectedDate,
    activeTask,
    handleAddTask,
    handleStartTask,
    handleStopTask,
    handleToggleComplete,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock
  };
};
