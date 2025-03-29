
import React from 'react';
import { Task, TimeBlock, Project } from '@/types';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import TaskSidebar from './TaskSidebar';
import CalendarSection from './CalendarSection';
import Timer from '@/components/Timer';
import { ProjectsList } from '@/components/Projects';

interface DashboardLayoutProps {
  tasks: Task[];
  projects: Project[];
  backlogTasks: Task[];
  arrangedTasks: { [key: string]: Task[] };
  timeBlocks: TimeBlock[];
  selectedDate: Date;
  activeTask: Task | null;
  onAddTask: (task: any) => void;
  onStartTask: (taskId: string) => void;
  onStopTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onAddTimeBlock: (timeBlock: TimeBlock) => void;
  onUpdateTimeBlock: (index: number, timeBlock: TimeBlock) => void;
  onDeleteTimeBlock: (index: number) => void;
}

const DashboardLayout = ({
  tasks,
  projects,
  backlogTasks,
  arrangedTasks,
  timeBlocks,
  selectedDate,
  activeTask,
  onAddTask,
  onStartTask,
  onStopTask,
  onToggleComplete,
  onAddTimeBlock,
  onUpdateTimeBlock,
  onDeleteTimeBlock
}: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="genz-card p-6 genz-glow">
        <DashboardHeader />
        <DashboardStats tasks={tasks} />
      </div>
      
      <div className="genz-card p-6 genz-glow">
        <ProjectsList projects={projects} onAddTask={onAddTask} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskSidebar 
          backlogTasks={backlogTasks}
          onAddTask={onAddTask}
          onStartTask={onStartTask}
          onStopTask={onStopTask}
          onToggleComplete={onToggleComplete}
        />
        
        <CalendarSection 
          arrangedTasks={arrangedTasks}
          timeBlocks={timeBlocks}
          selectedDate={selectedDate}
          onStartTask={onStartTask}
          onStopTask={onStopTask}
          onToggleComplete={onToggleComplete}
          onAddTimeBlock={onAddTimeBlock}
          onUpdateTimeBlock={onUpdateTimeBlock}
          onDeleteTimeBlock={onDeleteTimeBlock}
        />
      </div>
      
      <Timer activeTask={activeTask} onStopTask={onStopTask} />
    </div>
  );
};

export default DashboardLayout;
