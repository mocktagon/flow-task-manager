
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// Define the User interface
interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
}

// Define the AuthContext interface
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  syncGoogleCalendar: (calendarId?: string) => Promise<boolean>;
  isCalendarSynced: boolean;
  lastSyncedAt: Date | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a mock database for demo purposes
// In a real app, this would be replaced with actual backend API calls
const USERS_STORAGE_KEY = 'flowTasks_users';
const CURRENT_USER_KEY = 'flowTasks_currentUser';
const CALENDAR_SYNC_STATUS = 'flowTasks_calendarSynced';
const CALENDAR_LAST_SYNCED = 'flowTasks_calendarLastSynced';

const getStoredUsers = (): Record<string, User & { password: string }> => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : {};
};

const setStoredUsers = (users: Record<string, User & { password: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCalendarSynced, setIsCalendarSynced] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  
  // Get navigate function only after component has mounted in browser context
  const navigate = useNavigate();
  const location = useLocation();

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
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay for a more realistic experience
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getStoredUsers();
      const user = Object.values(users).find(u => u.email === email);
      
      if (!user || user.password !== password) {
        toast.error('Invalid email or password');
        return false;
      }
      
      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = user;
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      localStorage.setItem('authProvider', 'password');
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getStoredUsers();
      
      // Check if user already exists
      if (Object.values(users).some(u => u.email === email)) {
        toast.error('User with this email already exists');
        return false;
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        name,
        password,
      };
      
      // Save to "database"
      users[newUser.id] = newUser;
      setStoredUsers(users);
      
      // Auto-login after signup
      const { password: _, ...userWithoutPassword } = newUser;
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      localStorage.setItem('authProvider', 'password');
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      navigate('/dashboard');
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during signup');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be a Google OAuth flow
      const googleUser = {
        id: `google_user_${Date.now()}`,
        email: `user${Date.now()}@gmail.com`,
        name: 'Google User',
        photoUrl: 'https://lh3.googleusercontent.com/a/default-user',
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(googleUser));
      localStorage.setItem('authProvider', 'google');
      
      setUser(googleUser);
      setIsAuthenticated(true);
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Google authentication error:', error);
      toast.error('Google authentication failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const syncGoogleCalendar = async (calendarId?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real implementation, this would:
      // 1. Request permission to access Google Calendar
      // 2. Fetch events from the specified calendar or primary calendar if not specified
      // 3. Store events in the app's state
      
      const now = new Date();
      
      localStorage.setItem(CALENDAR_SYNC_STATUS, 'true');
      localStorage.setItem(CALENDAR_LAST_SYNCED, now.toISOString());
      
      setIsCalendarSynced(true);
      setLastSyncedAt(now);
      
      toast.success('Google Calendar synchronized successfully');
      return true;
    } catch (error) {
      console.error('Calendar sync error:', error);
      toast.error('Failed to synchronize Google Calendar');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authProvider');
    localStorage.removeItem(CURRENT_USER_KEY);
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
        lastSyncedAt
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
