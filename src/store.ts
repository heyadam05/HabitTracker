import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Habit, Settings } from './types';
import { calculateHabitStats, toDateKey } from './utils/date';

const day = () => {
  return toDateKey();
};

export const defaultSettings: Settings = {
  profileName: '',
  theme: 'light',
  accent: '#6366f1',
  dailyReminders: false,
  streakAlerts: true,
  achievements: true,
  defaultFrequency: 'Daily',
  defaultReminder: '08:00',
  weekStartsMonday: true,
  motivationalQuotes: true,
};

interface AppState {
  habits: Habit[];
  settings: Settings;
  addHabit: (
    habit: Omit<
      Habit,
      | 'id'
      | 'createdAt'
      | 'streak'
      | 'longestStreak'
      | 'completionRate'
      | 'completedDates'
      | 'status'
    >
  ) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date?: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  importData: (habits: Habit[], settings: Settings) => void;
  refreshStats: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      habits: [],
      settings: defaultSettings,
      addHabit: (habit) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              ...habit,
              id: crypto.randomUUID(),
              createdAt: day(),
              streak: 0,
              longestStreak: 0,
              completionRate: 0,
              completedDates: [],
              status: 'active',
            },
          ],
        })),
      updateHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit;
            const updated = { ...habit, ...updates };
            return { ...updated, ...calculateHabitStats(updated) };
          }),
        })),
      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((item) => item.id !== id),
        })),
      toggleHabit: (id, date = day()) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) return habit;
            const completed = habit.completedDates.includes(date);
            const completedDates = completed
              ? habit.completedDates.filter((item) => item !== date)
              : [...habit.completedDates, date];
            const updated = { ...habit, completedDates };
            return { ...updated, ...calculateHabitStats(updated) };
          }),
        })),
      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),
      importData: (habits, settings) =>
        set({
          habits: habits.map((habit) => ({
            ...habit,
            ...calculateHabitStats(habit),
          })),
          settings: { ...defaultSettings, ...settings },
        }),
      refreshStats: () =>
        set((state) => ({
          habits: state.habits.map((habit) => ({
            ...habit,
            ...calculateHabitStats(habit),
          })),
        })),
      reset: () => set({ habits: [], settings: defaultSettings }),
    }),
    {
      name: 'habit-tracker-data',
      version: 4,
      migrate: (persistedState, version) => {
        const state = persistedState as Pick<AppState, 'habits' | 'settings'>;
        if (
          version < 2 &&
          state.habits?.some((habit) =>
            ['read', 'water', 'workout', 'react'].includes(habit.id)
          )
        ) {
          return {
            ...state,
            habits: [],
            settings: {
              ...defaultSettings,
              ...state.settings,
              profileName: '',
            },
          };
        }
        return {
          ...state,
          habits: (state.habits ?? []).map((habit) => ({
            ...habit,
            customDays: habit.customDays ?? [1, 2, 3, 4, 5],
          })),
          settings: { ...defaultSettings, ...state.settings },
        };
      },
    }
  )
);
