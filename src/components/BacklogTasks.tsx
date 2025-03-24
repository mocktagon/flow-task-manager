
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
    <div className="mb-8 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold">Backlog</h2>
        <div className="bg-destructive/10 text-destructive text-xs px-2 py-0.5 rounded-full">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </div>
      
      <div className="space-y-3">
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
