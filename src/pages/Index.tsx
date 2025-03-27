
import React from 'react';
import Header from '@/components/Header';
import Calendar from '@/components/Calendar';
import TaskCreator from '@/components/TaskCreator';
import BacklogTasks from '@/components/BacklogTasks';
import Timer from '@/components/Timer';
import { useTasks } from '@/hooks/useTasks';
import { getTasksForDate, getBacklogTasks, arrangeTasksByEnergyLevels } from '@/utils/taskUtils';
import { toast } from 'sonner';
import { PlusCircle, ListTodo, Sparkles, Zap, ChevronRight, Wand2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f9f9ff] to-[#f5f5ff] genz-texture">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Dashboard Header with Stats */}
          <div className="genz-card p-6 genz-glow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Good afternoon, Jacob!</h2>
                <p className="text-foreground/70">Your productivity score today: <span className="font-semibold text-genz-purple">87%</span></p>
              </div>
              <div className="flex flex-col xs:flex-row items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-genz-pink flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">JD</div>
                  <div className="h-8 w-8 rounded-full bg-genz-blue flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">SK</div>
                  <div className="h-8 w-8 rounded-full bg-genz-green flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">AM</div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full border-genz-purple/20 text-genz-purple">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Invite Team
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 genz-glass rounded-xl bg-genz-purple/5 border border-genz-purple/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-genz-purple/10 flex items-center justify-center animate-pulse">
                    <Zap className="h-4 w-4 text-genz-purple" />
                  </div>
                  <span className="text-sm font-medium text-foreground/70">Completed</span>
                </div>
                <p className="text-2xl font-bold">{tasks.filter(t => t.completed).length}</p>
              </div>
              <div className="p-4 genz-glass rounded-xl bg-genz-blue/5 border border-genz-blue/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-genz-blue/10 flex items-center justify-center animate-pulse">
                    <ListTodo className="h-4 w-4 text-genz-blue" />
                  </div>
                  <span className="text-sm font-medium text-foreground/70">In Progress</span>
                </div>
                <p className="text-2xl font-bold">{tasks.filter(t => !t.completed && t.inProgress).length}</p>
              </div>
              <div className="p-4 genz-glass rounded-xl bg-genz-teal/5 border border-genz-teal/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-genz-teal/10 flex items-center justify-center animate-pulse">
                    <PlusCircle className="h-4 w-4 text-genz-teal" />
                  </div>
                  <span className="text-sm font-medium text-foreground/70">New</span>
                </div>
                <p className="text-2xl font-bold">{tasks.filter(t => !t.completed && !t.inProgress).length}</p>
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
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-genz-purple/10 to-genz-pink/10 backdrop-blur-md rounded-2xl p-6 mb-6 genz-glow border border-genz-purple/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <div className="h-6 w-6 genz-gradient-bg rounded-full flex items-center justify-center">
                      <BrainCircuit className="h-3 w-3 text-white" />
                    </div>
                    <span>Create New Task</span>
                  </h3>
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 bg-white/80 hover:bg-white">
                    <Wand2 className="h-3.5 w-3.5 text-genz-purple" />
                  </Button>
                </div>
                <TaskCreator onAddTask={handleAddTask} />
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
                  onStartTask={handleStartTask}
                  onStopTask={handleStopTask}
                  onToggleComplete={handleToggleComplete}
                />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="genz-card p-6 genz-glow">
                <Calendar
                  tasks={arrangedTasks}
                  timeBlocks={timeBlocks}
                  date={selectedDate}
                  onStartTask={handleStartTask}
                  onStopTask={handleStopTask}
                  onToggleComplete={handleToggleComplete}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Timer activeTask={activeTask} onStopTask={handleStopTask} />
    </div>
  );
};

export default Index;
