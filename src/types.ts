export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Frequency = 'Daily' | 'Weekdays' | 'Weekend' | 'Custom';
export type HabitStatus = 'active' | 'paused' | 'archived';
export type Theme = 'light' | 'dark' | 'system';

export interface Habit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  difficulty: Difficulty;
  frequency: Frequency;
  customDays: number[];
  reminder: string;
  goal: number;
  createdAt: string;
  streak: number;
  longestStreak: number;
  completionRate: number;
  status: HabitStatus;
  completedDates: string[];
}

export interface Settings {
  profileName: string;
  theme: Theme;
  accent: string;
  dailyReminders: boolean;
  streakAlerts: boolean;
  achievements: boolean;
  defaultFrequency: Frequency;
  defaultReminder: string;
  weekStartsMonday: boolean;
  motivationalQuotes: boolean;
}
