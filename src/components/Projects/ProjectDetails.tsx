
import React from 'react';
import { Project, ProjectActivity } from '@/types';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { Card, CardContent } from '@/components/ui/card';
import { format, subDays, differenceInCalendarDays, parseISO, isValid } from 'date-fns';
import { ResponsiveContainer, RechartTooltip, Tooltip } from 'recharts';

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  // Generate last 90 days for the heatmap if no activity data
  const today = new Date();
  const activity = project.activity || Array.from({ length: 90 }, (_, i) => {
    const date = format(subDays(today, 90 - i - 1), 'yyyy-MM-dd');
    return {
      date,
      count: Math.floor(Math.random() * 5) // Random data for demo
    };
  });

  const getColorIntensity = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count < 2) return 'bg-green-200 dark:bg-green-900';
    if (count < 4) return 'bg-green-400 dark:bg-green-700';
    if (count < 7) return 'bg-green-500 dark:bg-green-600';
    return 'bg-green-700 dark:bg-green-500';
  };

  const weeks = [];
  let currentWeek: ProjectActivity[] = [];

  // Organize data into weeks for the heatmap
  activity.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === activity.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return (
    <div className="space-y-4 mt-4">
      {project.description && (
        <p className="text-sm text-muted-foreground">{project.description}</p>
      )}
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h5 className="text-xs font-medium text-muted-foreground">Activity</h5>
          <span className="text-xs text-muted-foreground">Last 90 days</span>
        </div>
        
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1 min-w-[650px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day) => {
                  const date = isValid(new Date(day.date)) 
                    ? format(new Date(day.date), 'MMM d') 
                    : day.date;
                  
                  return (
                    <div
                      key={day.date}
                      className={`h-3 w-3 rounded-sm ${getColorIntensity(day.count)}`}
                      title={`${date}: ${day.count} activities`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-3 rounded-sm bg-green-200 dark:bg-green-900" />
            <div className="h-3 w-3 rounded-sm bg-green-400 dark:bg-green-700" />
            <div className="h-3 w-3 rounded-sm bg-green-500 dark:bg-green-600" />
            <div className="h-3 w-3 rounded-sm bg-green-700 dark:bg-green-500" />
          </div>
          <span>More</span>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>Created: {format(project.createdAt, 'MMM d, yyyy')}</div>
        <div>{activity.reduce((sum, day) => sum + day.count, 0)} contributions</div>
      </div>
    </div>
  );
};

export default ProjectDetails;
