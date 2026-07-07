import type { Habit } from '../types';

export function toDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromDateKey(key: string) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function isHabitScheduled(
  habit: Pick<Habit, 'frequency' | 'customDays'>,
  date: Date
) {
  const weekday = date.getDay();
  if (habit.frequency === 'Daily') return true;
  if (habit.frequency === 'Weekdays') return weekday >= 1 && weekday <= 5;
  if (habit.frequency === 'Weekend') return weekday === 0 || weekday === 6;
  return habit.customDays.includes(weekday);
}

function eachDate(start: Date, end: Date) {
  const dates: Date[] = [];
  const current = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export function scheduledDateKeys(habit: Habit, end = new Date()) {
  const created = fromDateKey(habit.createdAt);
  return eachDate(created, end)
    .filter((date) => isHabitScheduled(habit, date))
    .map(toDateKey);
}

export function calculateHabitStats(habit: Habit, end = new Date()) {
  const scheduled = scheduledDateKeys(habit, end);
  const completed = new Set(habit.completedDates);
  const completedScheduled = scheduled.filter((key) => completed.has(key));
  const completionRate = scheduled.length
    ? Math.round((completedScheduled.length / scheduled.length) * 100)
    : 0;

  let longestStreak = 0;
  let running = 0;
  scheduled.forEach((key) => {
    running = completed.has(key) ? running + 1 : 0;
    longestStreak = Math.max(longestStreak, running);
  });

  const todayKey = toDateKey(end);
  let currentIndex = scheduled.length - 1;
  if (scheduled[currentIndex] === todayKey && !completed.has(todayKey))
    currentIndex -= 1;
  let streak = 0;
  while (currentIndex >= 0 && completed.has(scheduled[currentIndex])) {
    streak += 1;
    currentIndex -= 1;
  }

  return { completionRate, streak, longestStreak };
}
