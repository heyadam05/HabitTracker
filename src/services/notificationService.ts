import toast from 'react-hot-toast';
import type { Habit } from '../types';
import { isHabitScheduled, toDateKey } from '../utils/date';

export function notificationsSupported() {
  return 'Notification' in window;
}

export function notifyStreakRisks(habits: Habit[]) {
  if (
    !notificationsSupported() ||
    Notification.permission !== 'granted' ||
    new Date().getHours() < 18
  )
    return;
  const today = new Date();
  const todayKey = toDateKey(today);
  habits
    .filter(
      (habit) =>
        habit.status === 'active' &&
        habit.streak > 0 &&
        isHabitScheduled(habit, today) &&
        !habit.completedDates.includes(todayKey)
    )
    .forEach((habit) => {
      const notificationKey = `streak-risk:${habit.id}:${todayKey}`;
      if (localStorage.getItem(notificationKey)) return;
      new Notification(`${habit.streak}-day streak at risk`, {
        body: `Complete “${habit.title}” before the day ends.`,
      });
      localStorage.setItem(notificationKey, 'sent');
    });
}

export async function requestNotificationPermission() {
  if (!notificationsSupported()) {
    toast.error('This browser does not support system notifications.');
    return false;
  }
  if (Notification.permission === 'granted') return true;
  const permission = await Notification.requestPermission();
  if (permission !== 'granted')
    toast.error('Notification permission was not granted.');
  return permission === 'granted';
}

export async function sendTestNotification() {
  if (!(await requestNotificationPermission())) return;
  new Notification('Habit Tracker', {
    body: 'Notifications are working correctly.',
  });
  toast.success('Test notification sent.');
}

export function notifyDueHabits(habits: Habit[]) {
  if (!notificationsSupported() || Notification.permission !== 'granted')
    return;
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const today = toDateKey(now);

  habits
    .filter(
      (habit) =>
        habit.status === 'active' &&
        isHabitScheduled(habit, now) &&
        habit.reminder === currentTime &&
        !habit.completedDates.includes(today)
    )
    .forEach((habit) => {
      const notificationKey = `habit-reminder:${habit.id}:${today}:${currentTime}`;
      if (localStorage.getItem(notificationKey)) return;
      new Notification(habit.title, {
        body: habit.description || 'Time to complete your habit.',
      });
      localStorage.setItem(notificationKey, 'sent');
    });
}
