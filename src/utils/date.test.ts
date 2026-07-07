import { describe, expect, it } from 'vitest';
import type { Habit } from '../types';
import { calculateHabitStats, isHabitScheduled, toDateKey } from './date';

function habit(overrides: Partial<Habit> = {}): Habit {
  return {
    id: 'test',
    title: 'Test habit',
    description: '',
    icon: 'target',
    color: '#6366f1',
    category: 'Lifestyle',
    difficulty: 'Easy',
    frequency: 'Daily',
    customDays: [],
    reminder: '',
    goal: 1,
    createdAt: '2026-06-25',
    streak: 0,
    longestStreak: 0,
    completionRate: 0,
    status: 'active',
    completedDates: [],
    ...overrides,
  };
}

describe('date helpers', () => {
  it('creates local date keys', () => {
    expect(toDateKey(new Date(2026, 5, 8, 23, 59))).toBe('2026-06-08');
  });

  it('supports weekday, weekend and custom schedules', () => {
    const friday = new Date(2026, 5, 26);
    const sunday = new Date(2026, 5, 28);

    expect(isHabitScheduled(habit({ frequency: 'Weekdays' }), friday)).toBe(
      true
    );
    expect(isHabitScheduled(habit({ frequency: 'Weekdays' }), sunday)).toBe(
      false
    );
    expect(isHabitScheduled(habit({ frequency: 'Weekend' }), sunday)).toBe(
      true
    );
    expect(
      isHabitScheduled(habit({ frequency: 'Custom', customDays: [0] }), sunday)
    ).toBe(true);
  });

  it('calculates completion and streaks from scheduled dates', () => {
    const result = calculateHabitStats(
      habit({ completedDates: ['2026-06-25', '2026-06-26', '2026-06-27'] }),
      new Date(2026, 5, 28)
    );

    expect(result).toEqual({ completionRate: 75, streak: 3, longestStreak: 3 });
  });

  it('does not penalize weekday habits for weekends', () => {
    const result = calculateHabitStats(
      habit({
        frequency: 'Weekdays',
        createdAt: '2026-06-26',
        completedDates: ['2026-06-26'],
      }),
      new Date(2026, 5, 28)
    );

    expect(result).toEqual({
      completionRate: 100,
      streak: 1,
      longestStreak: 1,
    });
  });
});
