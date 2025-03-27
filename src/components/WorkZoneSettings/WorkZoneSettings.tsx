
import React from 'react';
import { TimeBlock } from '@/types';
import { Clock } from 'lucide-react';
import ConfigurationPopover from './ConfigurationPopover';
import WorkZoneStats from './WorkZoneStats';
import TimeBlocksDisplay from './TimeBlocksDisplay';
import { useWorkZoneSettings } from '@/hooks/useWorkZoneSettings';

interface WorkZoneSettingsProps {
  timeBlocks: TimeBlock[];
  onAddTimeBlock: (timeBlock: TimeBlock) => void;
  onUpdateTimeBlock: (index: number, timeBlock: TimeBlock) => void;
  onDeleteTimeBlock: (index: number) => void;
}

const WorkZoneSettings = ({
  timeBlocks,
  onAddTimeBlock,
  onUpdateTimeBlock,
  onDeleteTimeBlock,
}: WorkZoneSettingsProps) => {
  const {
    workStartTime,
    workEndTime,
    autoSchedule,
    energyPatterns,
    calculateWorkingHours,
    setWorkStartTime,
    setWorkEndTime,
    setAutoSchedule,
    applyEnergyPattern,
    saveWorkingHours
  } = useWorkZoneSettings(timeBlocks, onAddTimeBlock, onUpdateTimeBlock, onDeleteTimeBlock);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-genz-blue/10 flex items-center justify-center">
            <Clock className="h-4 w-4 text-genz-blue" />
          </div>
          Work Zone Settings
        </h3>
        
        <ConfigurationPopover
          workStartTime={workStartTime}
          workEndTime={workEndTime}
          autoSchedule={autoSchedule}
          energyPatterns={energyPatterns}
          onWorkStartTimeChange={setWorkStartTime}
          onWorkEndTimeChange={setWorkEndTime}
          onAutoScheduleChange={setAutoSchedule}
          onSaveWorkingHours={saveWorkingHours}
          onApplyPattern={applyEnergyPattern}
        />
      </div>
      
      <WorkZoneStats
        workStartTime={workStartTime}
        workEndTime={workEndTime}
        timeBlocksCount={timeBlocks.length}
        autoSchedule={autoSchedule}
        calculateWorkingHours={calculateWorkingHours}
      />
      
      <TimeBlocksDisplay timeBlocks={timeBlocks} />
    </div>
  );
};

export default WorkZoneSettings;
