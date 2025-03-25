
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// This would be replaced with actual OAuth client ID
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const GOOGLE_REDIRECT_URI = window.location.origin + "/auth/google/callback";
const GOOGLE_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";

const GoogleCalendarSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  
  const handleConnectGoogle = () => {
    // In a real implementation, this would redirect to Google's OAuth flow
    if (isConnected) {
      // Simulate disconnecting
      setIsConnected(false);
      toast.success('Disconnected from Google Calendar');
      return;
    }
    
    // Simulate Google OAuth
    setIsSyncing(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsSyncing(false);
      toast.success('Connected to Google Calendar');
    }, 1500);
    
    // In a real implementation, you would redirect to Google's OAuth flow:
    // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${GOOGLE_SCOPE}&access_type=offline&prompt=consent`;
    // window.location.href = authUrl;
  };
  
  const handleSyncNow = () => {
    setIsSyncing(true);
    
    // Simulate syncing
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Calendar synced successfully');
    }, 1500);
  };
  
  const handleAutoSyncChange = (checked: boolean) => {
    setAutoSync(checked);
    toast.success(checked ? 'Auto-sync enabled' : 'Auto-sync disabled');
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
        <div className="space-y-4">
          {isConnected ? (
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
                <p className="text-sm">
                  Last synced: {new Date().toLocaleString()}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Connect your Google Calendar to automatically organize your tasks around your existing schedule.
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2">
        <Button
          variant={isConnected ? "outline" : "default"}
          onClick={handleConnectGoogle}
          disabled={isSyncing}
        >
          {isConnected ? "Disconnect" : "Connect Google Calendar"}
        </Button>
        
        {isConnected && (
          <Button 
            onClick={handleSyncNow} 
            disabled={isSyncing}
          >
            {isSyncing ? "Syncing..." : "Sync Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GoogleCalendarSync;
