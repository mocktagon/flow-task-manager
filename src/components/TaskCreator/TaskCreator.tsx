
import React, { useState } from 'react';
import { Task } from '@/types';
import { Plus } from 'lucide-react';
import TaskCreatorForm from './TaskCreatorForm';

interface TaskCreatorProps {
  onAddTask: (task: Omit<Task, 'id' | 'dateCreated' | 'elapsedSeconds' | 'inProgress' | 'completed'>) => void;
}

const TaskCreator = ({ onAddTask }: TaskCreatorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddTask = (task: Omit<Task, 'id' | 'dateCreated' | 'elapsedSeconds' | 'inProgress' | 'completed'>) => {
    onAddTask(task);
    setIsExpanded(false);
  };

  return (
    <div className="glass-card rounded-lg p-4 mb-6 animate-scale">
      {!isExpanded ? (
        <button
          className="flex items-center justify-center w-full py-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add new task
        </button>
      ) : (
        <TaskCreatorForm 
          onSubmit={handleAddTask}
          onCancel={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default TaskCreator;
