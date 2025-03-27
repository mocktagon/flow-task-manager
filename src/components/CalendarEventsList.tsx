
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
}

const CalendarEventsList = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { isCalendarSynced, lastSyncedAt } = useAuth();
  
  useEffect(() => {
    // Load events from localStorage (in a real app, this would come from your state management)
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, [lastSyncedAt]);
  
  const formatEventTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (!isCalendarSynced || events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-6">
            {isCalendarSynced 
              ? "No events found for today" 
              : "Sync your Google Calendar to see events here"}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendar Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map(event => (
            <div 
              key={event.id} 
              className="p-3 rounded-md border border-gray-200 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-medium mb-1">{event.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>
                  {formatEventTime(event.start)} - {formatEventTime(event.end)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarEventsList;
