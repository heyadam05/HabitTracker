import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';

const DashboardPage = lazy(() =>
  import('../pages/Dashboard/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  }))
);
const HabitsPage = lazy(() =>
  import('../pages/Habits/HabitsPage').then((module) => ({
    default: module.HabitsPage,
  }))
);
const CalendarPage = lazy(() =>
  import('../pages/Calendar/CalendarPage').then((module) => ({
    default: module.CalendarPage,
  }))
);
const StatisticsPage = lazy(() =>
  import('../pages/Statistics/StatisticsPage').then((module) => ({
    default: module.StatisticsPage,
  }))
);
const SettingsPage = lazy(() =>
  import('../pages/Settings/SettingsPage').then((module) => ({
    default: module.SettingsPage,
  }))
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFound/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  }))
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'habits',
        element: <HabitsPage />,
      },
      {
        path: 'calendar',
        element: <CalendarPage />,
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
