import { z } from 'zod';

const habitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  category: z.string(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  frequency: z.enum(['Daily', 'Weekdays', 'Weekend', 'Custom']),
  customDays: z.array(z.number().int().min(0).max(6)).default([1, 2, 3, 4, 5]),
  reminder: z.string(),
  goal: z.number().positive(),
  createdAt: z.string(),
  streak: z.number().nonnegative(),
  longestStreak: z.number().nonnegative(),
  completionRate: z.number().min(0).max(100),
  status: z.enum(['active', 'paused', 'archived']),
  completedDates: z.array(z.string()),
});

const settingsSchema = z.object({
  profileName: z.string(),
  theme: z.enum(['light', 'dark', 'system']),
  accent: z.string(),
  dailyReminders: z.boolean(),
  streakAlerts: z.boolean(),
  achievements: z.boolean(),
  defaultFrequency: z.enum(['Daily', 'Weekdays', 'Weekend', 'Custom']),
  defaultReminder: z.string(),
  weekStartsMonday: z.boolean(),
  motivationalQuotes: z.boolean(),
});

export const backupSchema = z.object({
  habits: z.array(habitSchema),
  settings: settingsSchema,
  exportedAt: z.string().optional(),
});
