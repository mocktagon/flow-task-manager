
import React from 'react';
import { Zap, ListTodo, PlusCircle } from 'lucide-react';
import { Task } from '@/types';

interface DashboardStatsProps {
  tasks: Task[];
}

const DashboardStats = ({ tasks }: DashboardStatsProps) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const inProgressTasks = tasks.filter(t => !t.completed && t.inProgress).length;
  const newTasks = tasks.filter(t => !t.completed && !t.inProgress).length;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="p-4 genz-glass rounded-xl bg-genz-purple/5 border border-genz-purple/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-genz-purple/10 flex items-center justify-center animate-pulse">
            <Zap className="h-4 w-4 text-genz-purple" />
          </div>
          <span className="text-sm font-medium text-foreground/70">Completed</span>
        </div>
        <p className="text-2xl font-bold">{completedTasks}</p>
      </div>
      <div className="p-4 genz-glass rounded-xl bg-genz-blue/5 border border-genz-blue/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-genz-blue/10 flex items-center justify-center animate-pulse">
            <ListTodo className="h-4 w-4 text-genz-blue" />
          </div>
          <span className="text-sm font-medium text-foreground/70">In Progress</span>
        </div>
        <p className="text-2xl font-bold">{inProgressTasks}</p>
      </div>
      <div className="p-4 genz-glass rounded-xl bg-genz-teal/5 border border-genz-teal/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-genz-teal/10 flex items-center justify-center animate-pulse">
            <PlusCircle className="h-4 w-4 text-genz-teal" />
          </div>
          <span className="text-sm font-medium text-foreground/70">New</span>
        </div>
        <p className="text-2xl font-bold">{newTasks}</p>
      </div>
      <div className="p-4 genz-glass rounded-xl bg-genz-yellow/5 border border-genz-yellow/10 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground/70 mb-1">Energy Score</p>
          <p className="text-2xl font-bold">86%</p>
        </div>
        <div className="h-12 w-12 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="3"
              strokeDasharray="86, 100"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
