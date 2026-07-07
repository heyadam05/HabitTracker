import type { Difficulty, Frequency } from '../types';

export const FREQUENCIES: Frequency[] = [
  'Daily',
  'Weekdays',
  'Weekend',
  'Custom',
];
export const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];
export const CATEGORIES = [
  'Health',
  'Mind',
  'Productivity',
  'Learning',
  'Lifestyle',
] as const;
export const HABIT_COLORS = [
  '#6366f1',
  '#3b82f6',
  '#22c55e',
  '#14b8a6',
  '#f59e0b',
  '#f97316',
  '#ec4899',
  '#8b5cf6',
];
export const WEEKDAYS = [
  { short: 'Sun', value: 0 },
  { short: 'Mon', value: 1 },
  { short: 'Tue', value: 2 },
  { short: 'Wed', value: 3 },
  { short: 'Thu', value: 4 },
  { short: 'Fri', value: 5 },
  { short: 'Sat', value: 6 },
];
