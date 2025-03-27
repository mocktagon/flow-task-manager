
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useAuth from '@/hooks/useAuth';

const formSchema = z.object({
  calendarId: z.string().optional(),
});

const GoogleCalendarSync = () => {
  const [autoSync, setAutoSync] = useState(false);
  const { syncGoogleCalendar, isCalendarSynced, lastSyncedAt, isLoading } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calendarId: '',
    },
  });

  const handleSyncNow = async (values: z.infer<typeof formSchema>) => {
    await syncGoogleCalendar(values.calendarId || undefined);
  };
  
  const handleAutoSyncChange = (checked: boolean) => {
    setAutoSync(checked);
    toast.success(checked ? 'Auto-sync enabled' : 'Auto-sync disabled');
    
    if (checked) {
      // Set up interval for auto-sync (every hour)
      // This is just for demonstration, in a real app you might use a service worker
      localStorage.setItem('autoSyncEnabled', 'true');
      toast.info('Calendar will sync automatically every hour');
    } else {
      localStorage.removeItem('autoSyncEnabled');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Google Calendar
        </CardTitle>
        <CardDescription>
          Sync your Google Calendar events with Flow Tasks to automatically organize your day
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSyncNow)} className="space-y-4">
            <FormField
              control={form.control}
              name="calendarId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calendar ID (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="primary or your_calendar_id@group.calendar.google.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Leave empty to use your primary calendar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {isCalendarSynced && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">Auto-sync</span>
                    <span className="text-sm text-muted-foreground">
                      Automatically sync your calendar every hour
                    </span>
                  </div>
                  <Switch 
                    checked={autoSync} 
                    onCheckedChange={handleAutoSyncChange} 
                  />
                </div>
                
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm flex items-center gap-2">
                    <RefreshCw className="h-3 w-3" />
                    Last synced: {lastSyncedAt ? new Date(lastSyncedAt).toLocaleString() : 'Never'}
                  </p>
                </div>
              </>
            )}
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Syncing..." : isCalendarSynced ? "Sync Now" : "Connect Google Calendar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GoogleCalendarSync;
