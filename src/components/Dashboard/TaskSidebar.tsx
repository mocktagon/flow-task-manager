
import React from 'react';
import { Task } from '@/types';
import TaskCreator from '@/components/TaskCreator';
import BacklogTasks from '@/components/BacklogTasks';
import { ListTodo, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskSidebarProps {
  backlogTasks: Task[];
  onAddTask: (task: any) => void;
  onStartTask: (taskId: string) => void;
  onStopTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskSidebar = ({
  backlogTasks,
  onAddTask,
  onStartTask,
  onStopTask,
  onToggleComplete
}: TaskSidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gradient-to-br from-genz-purple/10 to-genz-pink/10 backdrop-blur-md rounded-2xl p-6 mb-6 genz-glow border border-genz-purple/10">
        <TaskCreator onAddTask={onAddTask} />
      </div>
      
      <div className="genz-card p-6 genz-glow">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold flex items-center gap-2">
            <div className="h-6 w-6 genz-gradient-bg rounded-full flex items-center justify-center">
              <ListTodo className="h-3 w-3 text-white" />
            </div>
            <span>Backlog</span>
          </h3>
          <Button variant="ghost" className="h-8 px-2 text-xs text-genz-purple">
            View All
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        
        <BacklogTasks
          tasks={backlogTasks}
          onStartTask={onStartTask}
          onStopTask={onStopTask}
          onToggleComplete={onToggleComplete}
        />
      </div>
    </div>
  );
};

export default TaskSidebar;
