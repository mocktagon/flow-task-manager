
// Format minutes to hours and minutes
export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
};

// Format seconds to MM:SS
export const formatTimerTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Get hour divisions for day view
export const getHourDivisions = (): string[] => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const amPm = i < 12 ? 'AM' : 'PM';
    hours.push(`${hour} ${amPm}`);
  }
  return hours;
};
