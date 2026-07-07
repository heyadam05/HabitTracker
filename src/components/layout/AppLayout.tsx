import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import {
  notifyDueHabits,
  notifyStreakRisks,
} from '../../services/notificationService';
import './AppLayout.css';

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const settings = useAppStore((state) => state.settings);
  const habits = useAppStore((state) => state.habits);
  const refreshStats = useAppStore((state) => state.refreshStats);

  useEffect(() => {
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const theme =
      settings.theme === 'system'
        ? systemDark
          ? 'dark'
          : 'light'
        : settings.theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty('--primary', settings.accent);
  }, [settings.accent, settings.theme]);

  useEffect(() => {
    refreshStats();
    const timer = window.setInterval(refreshStats, 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [refreshStats]);

  useEffect(() => {
    if (!settings.dailyReminders) return;
    notifyDueHabits(habits);
    const timer = window.setInterval(() => notifyDueHabits(habits), 30_000);
    return () => window.clearInterval(timer);
  }, [habits, settings.dailyReminders]);

  useEffect(() => {
    if (!settings.streakAlerts) return;
    notifyStreakRisks(habits);
    const timer = window.setInterval(() => notifyStreakRisks(habits), 60_000);
    return () => window.clearInterval(timer);
  }, [habits, settings.streakAlerts]);

  return (
    <div className="app-layout">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="app-layout__content">
        <Header onMenu={() => setMenuOpen(true)} />
        <main className="app-layout__main">
          <Suspense
            fallback={<div className="app-layout__loading">Loading…</div>}
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
