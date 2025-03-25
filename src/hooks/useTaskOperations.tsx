
import { useState } from 'react';
import { Task } from '../types';
import { generateId } from '../utils/idUtils';

export const useTaskOperations = (tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  // Add new task
  const addTask = (task: Omit<Task, 'id' | 'dateCreated' | 'elapsedSeconds' | 'inProgress' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      dateCreated: new Date(),
      elapsedSeconds: 0,
      inProgress: false,
      completed: false,
    };
    
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  // Update task
  const updateTask = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed, inProgress: false };
        }
        return task;
      })
    );
  };

  return { addTask, updateTask, deleteTask, toggleTaskCompletion };
};
