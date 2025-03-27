
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
    <div className="animate-scale">
      {!isExpanded ? (
        <div 
          className="p-4 rounded-xl border border-genz-purple/10 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center gap-2 text-genz-purple">
            <div className="h-7 w-7 rounded-full bg-genz-purple/10 flex items-center justify-center">
              <Plus className="h-4 w-4" />
            </div>
            <span className="font-medium">Create new task</span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-genz-purple/20 bg-white shadow-md transition-all duration-200">
          <TaskCreatorForm 
            onSubmit={handleAddTask}
            onCancel={() => setIsExpanded(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskCreator;
