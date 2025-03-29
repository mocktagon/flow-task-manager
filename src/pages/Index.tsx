
import React from 'react';
import Header from '@/components/Header';
import { DashboardLayout } from '@/components/Dashboard';
import { useDashboard } from '@/hooks/useDashboard';

const Index = () => {
  const {
    tasks,
    projects,
    backlogTasks,
    arrangedTasks,
    timeBlocks,
    selectedDate,
    activeTask,
    handleAddTask,
    handleStartTask,
    handleStopTask,
    handleToggleComplete,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock
  } = useDashboard();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f9f9ff] to-[#f5f5ff] genz-texture">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-6">
        <DashboardLayout 
          tasks={tasks}
          projects={projects}
          backlogTasks={backlogTasks}
          arrangedTasks={arrangedTasks}
          timeBlocks={timeBlocks}
          selectedDate={selectedDate}
          activeTask={activeTask}
          onAddTask={handleAddTask}
          onStartTask={handleStartTask}
          onStopTask={handleStopTask}
          onToggleComplete={handleToggleComplete}
          onAddTimeBlock={addTimeBlock}
          onUpdateTimeBlock={updateTimeBlock}
          onDeleteTimeBlock={deleteTimeBlock}
        />
      </main>
    </div>
  );
};

export default Index;
