
import { toast } from 'sonner';
import { User } from '@/contexts/AuthContext';
import {
  getStoredUsers,
  setStoredUsers,
  setAuthStatus,
  setCurrentUser,
  setAuthProvider,
  setCalendarSyncStatus,
  setCalendarLastSynced,
  clearAuthData,
  StoredUser
} from '@/utils/authStorage';

// Login with email and password
export const loginWithEmailPassword = async (
  email: string,
  password: string
): Promise<{ success: boolean; user: User | null }> => {
  try {
    // Simulate network delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getStoredUsers();
    const user = Object.values(users).find(u => u.email === email);
    
    if (!user || user.password !== password) {
      toast.error('Invalid email or password');
      return { success: false, user: null };
    }
    
    // Remove password from user object before storing in state
    const { password: _, ...userWithoutPassword } = user;
    
    setAuthStatus(true);
    setCurrentUser(userWithoutPassword);
    setAuthProvider('password');
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Login error:', error);
    toast.error('An error occurred during login');
    return { success: false, user: null };
  }
};

// Sign up with email and password
export const signupWithEmailPassword = async (
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; user: User | null }> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getStoredUsers();
    
    // Check if user already exists
    if (Object.values(users).some(u => u.email === email)) {
      toast.error('User with this email already exists');
      return { success: false, user: null };
    }
    
    // Create new user
    const newUser: StoredUser = {
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
    
    setAuthStatus(true);
    setCurrentUser(userWithoutPassword);
    setAuthProvider('password');
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Signup error:', error);
    toast.error('An error occurred during signup');
    return { success: false, user: null };
  }
};

// Login with Google
export const loginWithGoogle = async (): Promise<{ success: boolean; user: User | null }> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would be a Google OAuth flow
    const googleUser: User = {
      id: `google_user_${Date.now()}`,
      email: `user${Date.now()}@gmail.com`,
      name: 'Google User',
      photoUrl: 'https://lh3.googleusercontent.com/a/default-user',
    };
    
    setAuthStatus(true);
    setCurrentUser(googleUser);
    setAuthProvider('google');
    
    return { success: true, user: googleUser };
  } catch (error) {
    console.error('Google authentication error:', error);
    toast.error('Google authentication failed');
    return { success: false, user: null };
  }
};

// Sync Google Calendar
export const syncGoogleCalendar = async (calendarId?: string): Promise<boolean> => {
  console.log(`Attempting to sync Google Calendar. Calendar ID: ${calendarId || 'primary'}`);
  
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In a real implementation, this would:
    // 1. Request permission to access Google Calendar
    // 2. Fetch events from the specified calendar or primary calendar if not specified
    // 3. Store events in the app's state
    
    // Simulate getting calendar events
    const mockEvents = [
      { id: '1', title: 'Team Meeting', start: '2025-03-27T10:00:00', end: '2025-03-27T11:00:00' },
      { id: '2', title: 'Lunch with Client', start: '2025-03-27T12:30:00', end: '2025-03-27T13:30:00' },
      { id: '3', title: 'Project Review', start: '2025-03-27T15:00:00', end: '2025-03-27T16:00:00' },
    ];
    
    console.log('Successfully retrieved calendar events:', mockEvents);
    
    // Store the mock events in localStorage for demonstration purposes
    localStorage.setItem('calendarEvents', JSON.stringify(mockEvents));
    
    const now = new Date();
    
    setCalendarSyncStatus(true);
    setCalendarLastSynced(now);
    
    console.log('Calendar sync completed successfully at', now.toISOString());
    toast.success('Google Calendar synchronized successfully');
    return true;
  } catch (error) {
    console.error('Calendar sync error:', error);
    toast.error('Failed to synchronize Google Calendar');
    return false;
  }
};

// Verify Google Calendar connection
export const verifyGoogleCalendarConnection = async (): Promise<boolean> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would check if the OAuth token is still valid
    // and if we still have access to the user's calendar
    
    const isCalendarSynced = localStorage.getItem('flowTasks_calendarSynced') === 'true';
    const lastSynced = localStorage.getItem('flowTasks_calendarLastSynced');
    
    if (!isCalendarSynced || !lastSynced) {
      return false;
    }
    
    // Check if last sync was within the last 24 hours
    const lastSyncDate = new Date(lastSynced);
    const now = new Date();
    const hoursSinceLastSync = (now.getTime() - lastSyncDate.getTime()) / (1000 * 60 * 60);
    
    return hoursSinceLastSync < 24;
  } catch (error) {
    console.error('Calendar verification error:', error);
    return false;
  }
};

// Logout user
export const logout = () => {
  clearAuthData();
};
