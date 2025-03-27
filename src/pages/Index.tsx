
import React from 'react';
import Header from '@/components/Header';
import { DashboardLayout } from '@/components/Dashboard';
import { useTasks } from '@/hooks/useTasks';
import { getTasksForDate, getBacklogTasks, arrangeTasksByEnergyLevels } from '@/utils/taskUtils';
import { toast } from 'sonner';

const Index = () => {
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
  
  // Arrange tasks by energy levels
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f9f9ff] to-[#f5f5ff] genz-texture">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-6">
        <DashboardLayout 
          tasks={tasks}
          backlogTasks={backlogTasks}
          arrangedTasks={arrangedTasks}
          timeBlocks={timeBlocks}
          selectedDate={selectedDate}
          activeTask={activeTask}
          onAddTask={handleAddTask}
          onStartTask={handleStartTask}
          onStopTask={handleStopTask}
          onToggleComplete={handleToggleComplete}
          onAddTimeBlock={addTimeBlock}
          onUpdateTimeBlock={updateTimeBlock}
          onDeleteTimeBlock={deleteTimeBlock}
        />
      </main>
    </div>
  );
};

export default Index;
