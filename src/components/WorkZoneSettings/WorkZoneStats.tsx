
import React from 'react';

interface WorkZoneStatsProps {
  workStartTime: string;
  workEndTime: string;
  timeBlocksCount: number;
  autoSchedule: boolean;
  calculateWorkingHours: () => number;
}

const WorkZoneStats = ({
  workStartTime,
  workEndTime,
  timeBlocksCount,
  autoSchedule,
  calculateWorkingHours,
}: WorkZoneStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-background/50 p-3 rounded-lg border">
      <div className="text-center p-2">
        <div className="text-sm font-medium text-genz-blue">Working Hours</div>
        <div className="text-lg">{workStartTime} - {workEndTime}</div>
        <div className="text-xs text-muted-foreground">{calculateWorkingHours()} hours</div>
      </div>
      
      <div className="text-center p-2">
        <div className="text-sm font-medium text-genz-green">Energy Zones</div>
        <div className="text-lg">{timeBlocksCount}</div>
        <div className="text-xs text-muted-foreground">Configured zones</div>
      </div>
      
      <div className="text-center p-2">
        <div className="text-sm font-medium text-genz-purple">Auto Schedule</div>
        <div className="text-lg">{autoSchedule ? 'Enabled' : 'Disabled'}</div>
        <div className="text-xs text-muted-foreground">Task assignment</div>
      </div>
    </div>
  );
};

export default WorkZoneStats;
