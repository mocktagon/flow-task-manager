
import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';

interface BacklogTasksProps {
  tasks: Task[];
  onStartTask: (taskId: string) => void;
  onStopTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const BacklogTasks = ({
  tasks,
  onStartTask,
  onStopTask,
  onToggleComplete,
}: BacklogTasksProps) => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-base font-medium">Backlog</h2>
        <div className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
          {tasks.length}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onStartTask={onStartTask}
            onStopTask={onStopTask}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default BacklogTasks;
