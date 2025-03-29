
import React, { useState } from 'react';
import { Project, Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import ProjectDetails from './ProjectDetails';

interface ProjectsListProps {
  projects: Project[];
  onAddTask: (task: Omit<Task, 'id' | 'dateCreated' | 'elapsedSeconds' | 'inProgress' | 'completed'>) => void;
}

const ProjectsList = ({ projects, onAddTask }: ProjectsListProps) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<Record<string, boolean>>({});
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleQuickAddTask = (projectId: string) => {
    if (!newTaskTitle.trim()) {
      toast.error('Task title cannot be empty');
      return;
    }

    onAddTask({
      title: newTaskTitle,
      description: '',
      priority: 'medium',
      estimatedMinutes: 30,
      dueDate: new Date(),
      projectId,
    });

    setNewTaskTitle('');
    toast.success('Task added to project');
  };

  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
      setNewTaskTitle('');
    }
  };
  
  const toggleDetails = (projectId: string) => {
    setDetailsVisible(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Long-term Projects</h3>
        <Button variant="outline" size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className={`transition-all duration-200 overflow-hidden ${
              project.color ? `border-l-4 border-l-${project.color}` : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {project.title}
                </h4>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2"
                    onClick={() => toggleDetails(project.id)}
                  >
                    {detailsVisible[project.id] ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2"
                    onClick={() => toggleProject(project.id)}
                  >
                    {expandedProject === project.id ? 'Close' : 'Add Task'}
                  </Button>
                </div>
              </div>
              
              {project.description && !detailsVisible[project.id] && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              )}
              
              {detailsVisible[project.id] && (
                <ProjectDetails project={project} />
              )}
              
              {expandedProject === project.id && (
                <div className="pt-2 border-t mt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="New task title..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleQuickAddTask(project.id);
                        }
                      }}
                    />
                    <Button 
                      size="sm"
                      onClick={() => handleQuickAddTask(project.id)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
