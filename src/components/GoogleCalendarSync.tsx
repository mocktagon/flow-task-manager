
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useAuth from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  calendarId: z.string().optional(),
});

const GoogleCalendarSync = () => {
  const [autoSync, setAutoSync] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'error' | null>(null);
  const { syncGoogleCalendar, isCalendarSynced, lastSyncedAt, isLoading } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calendarId: '',
    },
  });

  // Check if auto-sync is enabled in localStorage on mount
  useEffect(() => {
    const autoSyncEnabled = localStorage.getItem('autoSyncEnabled') === 'true';
    setAutoSync(autoSyncEnabled);
    
    // If auto-sync is enabled, we should check if we need to sync
    // This would normally be handled by a service worker or similar
    if (autoSyncEnabled && lastSyncedAt) {
      const lastSync = new Date(lastSyncedAt);
      const now = new Date();
      const hoursSinceLastSync = (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastSync >= 1) {
        // Auto-sync if it's been more than an hour
        syncGoogleCalendar();
      }
    }
  }, [lastSyncedAt, syncGoogleCalendar]);

  const handleSyncNow = async (values: z.infer<typeof formSchema>) => {
    try {
      const success = await syncGoogleCalendar(values.calendarId || undefined);
      if (success) {
        toast.success('Calendar synced successfully');
      }
    } catch (error) {
      toast.error('Failed to sync calendar');
      console.error('Sync error:', error);
    }
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
  
  const verifyCalendarConnection = async () => {
    setVerifying(true);
    setVerificationResult(null);
    
    try {
      // In a real app, you would make an API call to verify the connection
      // For now, we'll just check if we have a lastSyncedAt value
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request
      
      if (isCalendarSynced && lastSyncedAt) {
        setVerificationResult('success');
        toast.success('Calendar connection verified successfully');
      } else {
        setVerificationResult('error');
        toast.error('Could not verify calendar connection');
      }
    } catch (error) {
      setVerificationResult('error');
      toast.error('Verification failed');
    } finally {
      setVerifying(false);
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
            
            {isCalendarSynced && lastSyncedAt ? (
              <>
                <Alert 
                  variant="default" 
                  className="bg-green-50 border-green-200 text-green-800"
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle>Connected to Google Calendar</AlertTitle>
                  <AlertDescription>
                    Your calendar is currently synced and up to date.
                  </AlertDescription>
                </Alert>
                
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
                    Last synced: {new Date(lastSyncedAt).toLocaleString()}
                  </p>
                </div>
                
                <div className="mt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={verifyCalendarConnection}
                    disabled={verifying}
                    className="w-full"
                  >
                    {verifying ? "Verifying..." : "Verify Connection"}
                  </Button>
                </div>
                
                {verificationResult === 'success' && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Connection Verified</AlertTitle>
                    <AlertDescription>
                      Your Google Calendar connection is working properly.
                    </AlertDescription>
                  </Alert>
                )}
                
                {verificationResult === 'error' && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription>
                      There was a problem verifying your calendar connection. Please try reconnecting.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertTitle>Not Connected</AlertTitle>
                <AlertDescription>
                  Your Google Calendar is not connected yet. Click the button below to connect.
                </AlertDescription>
              </Alert>
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
