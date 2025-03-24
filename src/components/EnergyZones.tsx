
import React, { useState } from 'react';
import { TimeBlock, EnergyLevel } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getEnergyLevelClass } from '@/utils/taskUtils';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface EnergyZonesProps {
  timeBlocks: TimeBlock[];
  onAddTimeBlock: (timeBlock: TimeBlock) => void;
  onUpdateTimeBlock: (index: number, timeBlock: TimeBlock) => void;
  onDeleteTimeBlock: (index: number) => void;
}

const EnergyZones = ({
  timeBlocks,
  onAddTimeBlock,
  onUpdateTimeBlock,
  onDeleteTimeBlock,
}: EnergyZonesProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>('high');

  const handleSubmit = () => {
    if (editingIndex !== null) {
      onUpdateTimeBlock(editingIndex, { startTime, endTime, energyLevel });
      setEditingIndex(null);
    } else {
      onAddTimeBlock({ startTime, endTime, energyLevel });
    }
    
    resetForm();
  };

  const startEditing = (index: number) => {
    const block = timeBlocks[index];
    setStartTime(block.startTime);
    setEndTime(block.endTime);
    setEnergyLevel(block.energyLevel);
    setEditingIndex(index);
    setIsAdding(true);
  };

  const resetForm = () => {
    setStartTime('09:00');
    setEndTime('12:00');
    setEnergyLevel('high');
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Energy Zones</h2>
        {!isAdding && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Zone
          </Button>
        )}
      </div>
      
      {isAdding && (
        <div className="glass-card rounded-lg p-4 space-y-4 animate-scale">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Start Time</label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">End Time</label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Energy Level</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as EnergyLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                    energyLevel === level
                      ? `bg-energy-${level}/20 border border-energy-${level}`
                      : `bg-muted hover:bg-muted/80 text-muted-foreground`
                  }`}
                  onClick={() => setEnergyLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                resetForm();
                setEditingIndex(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingIndex !== null ? 'Update' : 'Add'} Zone
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {timeBlocks.map((block, index) => (
          <div
            key={index}
            className={`glass-card rounded-lg p-3 flex items-center justify-between ${getEnergyLevelClass(block.energyLevel)}`}
          >
            <div>
              <div className="font-medium">
                {block.startTime} - {block.endTime}
              </div>
              <div className="text-sm opacity-70">
                {block.energyLevel} energy
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => startEditing(index)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => onDeleteTimeBlock(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyZones;
