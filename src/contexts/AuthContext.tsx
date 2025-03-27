
import React, { createContext, ReactNode, useContext } from 'react';

// Define the User interface
export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
}

// Define the AuthContext interface
export interface AuthContextType {
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
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export { type AuthProviderProps };
