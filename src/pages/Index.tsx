
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Calendar from '@/components/Calendar';
import TaskCreator from '@/components/TaskCreator';
import BacklogTasks from '@/components/BacklogTasks';
import Timer from '@/components/Timer';
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
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4">
        <TaskCreator onAddTask={handleAddTask} />
        
        <BacklogTasks
          tasks={backlogTasks}
          onStartTask={handleStartTask}
          onStopTask={handleStopTask}
          onToggleComplete={handleToggleComplete}
        />
        
        <Calendar
          tasks={arrangedTasks}
          timeBlocks={timeBlocks}
          date={selectedDate}
          onStartTask={handleStartTask}
          onStopTask={handleStopTask}
          onToggleComplete={handleToggleComplete}
        />
      </main>
      
      <Timer activeTask={activeTask} onStopTask={handleStopTask} />
    </div>
  );
};

export default Index;
