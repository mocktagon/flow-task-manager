
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContext, User, AuthProviderProps, CalendarEvent } from '@/contexts/AuthContext';
import {
  loginWithEmailPassword,
  signupWithEmailPassword,
  loginWithGoogle as googleLogin,
  syncGoogleCalendar as syncCalendar,
  verifyGoogleCalendarConnection,
  logout as logoutUser
} from '@/services/authService';
import {
  CURRENT_USER_KEY,
  CALENDAR_SYNC_STATUS,
  CALENDAR_LAST_SYNCED
} from '@/utils/authStorage';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCalendarSynced, setIsCalendarSynced] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  
  // Get navigate function
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated on mount
    const authStatus = localStorage.getItem('isAuthenticated');
    const currentUserData = localStorage.getItem(CURRENT_USER_KEY);
    const calendarSynced = localStorage.getItem(CALENDAR_SYNC_STATUS);
    const lastSynced = localStorage.getItem(CALENDAR_LAST_SYNCED);
    
    if (authStatus === 'true' && currentUserData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(currentUserData));
    }
    
    if (calendarSynced === 'true') {
      setIsCalendarSynced(true);
    }
    
    if (lastSynced) {
      setLastSyncedAt(new Date(lastSynced));
    }
    
    setIsLoading(false);
    
    // If calendar is synced, verify the connection periodically
    if (calendarSynced === 'true') {
      const verifyInterval = setInterval(async () => {
        const isValid = await verifyGoogleCalendarConnection();
        if (!isValid) {
          toast.warning('Google Calendar connection may have expired. Please reconnect.');
          setIsCalendarSynced(false);
        }
      }, 24 * 60 * 60 * 1000); // Check once per day
      
      return () => clearInterval(verifyInterval);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { success, user } = await loginWithEmailPassword(email, password);
      
      if (success && user) {
        setUser(user);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { success, user } = await signupWithEmailPassword(name, email, password);
      
      if (success && user) {
        setUser(user);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { success, user } = await googleLogin();
      
      if (success && user) {
        setUser(user);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const syncGoogleCalendar = async (calendarId?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const success = await syncCalendar(calendarId);
      
      if (success) {
        const now = new Date();
        setIsCalendarSynced(true);
        setLastSyncedAt(now);
        toast.success('Calendar synchronized successfully!');
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getCalendarEvents = (): CalendarEvent[] => {
    if (!isCalendarSynced) return [];
    
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      return JSON.parse(storedEvents);
    }
    
    return [];
  };

  const logout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        loginWithGoogle, 
        signup, 
        logout, 
        isLoading,
        syncGoogleCalendar,
        isCalendarSynced,
        lastSyncedAt,
        getCalendarEvents
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
