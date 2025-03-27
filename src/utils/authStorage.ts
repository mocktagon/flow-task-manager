
// Storage keys
export const USERS_STORAGE_KEY = 'flowTasks_users';
export const CURRENT_USER_KEY = 'flowTasks_currentUser';
export const CALENDAR_SYNC_STATUS = 'flowTasks_calendarSynced';
export const CALENDAR_LAST_SYNCED = 'flowTasks_calendarLastSynced';

// User type with password field
export interface StoredUser {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  password: string;
}

// Get stored users from localStorage
export const getStoredUsers = (): Record<string, StoredUser> => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : {};
};

// Save users to localStorage
export const setStoredUsers = (users: Record<string, StoredUser>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Set authentication status
export const setAuthStatus = (status: boolean) => {
  localStorage.setItem('isAuthenticated', status ? 'true' : 'false');
};

// Set current user in localStorage
export const setCurrentUser = (user: Omit<StoredUser, 'password'>) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// Set auth provider type
export const setAuthProvider = (provider: string) => {
  localStorage.setItem('authProvider', provider);
};

// Calendar sync functions
export const setCalendarSyncStatus = (status: boolean) => {
  localStorage.setItem(CALENDAR_SYNC_STATUS, status ? 'true' : 'false');
};

export const setCalendarLastSynced = (date: Date) => {
  localStorage.setItem(CALENDAR_LAST_SYNCED, date.toISOString());
};

// Clear auth data on logout
export const clearAuthData = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('authProvider');
  localStorage.removeItem(CURRENT_USER_KEY);
};
