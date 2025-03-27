
import React from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useAuth from '@/hooks/useAuth';

const CalendarStatusIndicator = () => {
  const { isCalendarSynced, lastSyncedAt } = useAuth();
  
  if (!isCalendarSynced) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <XCircle className="h-3 w-3 text-destructive" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Google Calendar not synced</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // Format time since last sync
  const getTimeSinceLastSync = () => {
    if (!lastSyncedAt) return 'Never';
    
    const now = new Date();
    const lastSync = new Date(lastSyncedAt);
    const diffMs = now.getTime() - lastSync.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <CheckCircle className="h-3 w-3 text-green-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Google Calendar synced {getTimeSinceLastSync()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CalendarStatusIndicator;
