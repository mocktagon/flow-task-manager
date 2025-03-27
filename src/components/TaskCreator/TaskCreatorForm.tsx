
import React, { useState } from 'react';
import { Task, Priority } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PrioritySelector } from './PrioritySelector';
import { TimeEstimateSelector } from './TimeEstimateSelector';
import { DueDateSelector } from './DueDateSelector';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface TaskCreatorFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'dateCreated' | 'elapsedSeconds' | 'inProgress' | 'completed'>) => void;
  onCancel: () => void;
}

const TaskCreatorForm = ({ onSubmit, onCancel }: TaskCreatorFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onSubmit({
      title,
      description,
      priority,
      estimatedMinutes,
      dueDate,
    });
    
    // Reset form is handled by parent component
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
          required
          autoFocus
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none"
          rows={2}
        />
      </div>
      
      <Alert variant="default" className="bg-blue-50/50 border-blue-200/50">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-xs text-blue-700">
          Tasks are automatically scheduled in energy zones based on priority. High priority tasks get assigned to high energy zones first.
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-wrap gap-4">
        <PrioritySelector 
          priority={priority} 
          onChange={setPriority} 
        />
        
        <TimeEstimateSelector 
          estimatedMinutes={estimatedMinutes} 
          onChange={setEstimatedMinutes} 
        />
        
        <DueDateSelector 
          dueDate={dueDate} 
          onChange={setDueDate} 
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
};

export default TaskCreatorForm;
