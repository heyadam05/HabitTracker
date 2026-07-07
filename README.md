# Habit Tracker

A modern, responsive habit-tracking application built with React and TypeScript. It helps users create routines, record daily progress, maintain streaks, review calendar history, and understand long-term completion trends.

## Live Demo

[Open Habit Tracker](https://heyhabittracker.netlify.app/)

## Features

- Create, edit, pause, archive, reactivate, and delete habits
- Daily, weekday, weekend, and custom-day schedules
- Configurable goals, difficulty, category, color, icon, and reminder time
- Accurate current and longest streak calculations
- Completion rates based only on scheduled days
- Interactive monthly calendar and daily completion history
- Dynamic dashboard and weekly progress chart
- Statistics based on persisted habit data
- Light, dark, and system themes
- Configurable accent colors and week start
- Optional motivational messages and achievement notifications
- Browser reminders and streak-risk alerts
- JSON import and export with Zod validation
- Local-first persistence using browser storage
- Responsive layouts for desktop, tablet, and mobile
- Lazy-loaded application pages

## Habit Statuses

- **Active** habits appear in the daily dashboard and calendar when scheduled.
- **Paused** habits retain their history but are temporarily excluded from daily tracking.
- **Archived** habits retain their history and remain available for future restoration.
- **On Track** means an active habit currently has a completion rate of at least 70%.
- **Inactive** is the combined number of paused and archived habits.

## Technology

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- date-fns
- Recharts
- Framer Motion
- Lucide React
- React Hot Toast
- Zod
- Vitest
- ESLint
- Prettier

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
git clone <your-repository-url>
cd habittracker
npm install
```

### Development

```bash
npm run dev
```

The development server will print the local URL in the terminal.

### Production Build

```bash
npm run build
npm run preview
```

## Available Scripts

| Command                | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server                    |
| `npm run build`        | Runs TypeScript checks and creates a production build |
| `npm run preview`      | Serves the production build locally                   |
| `npm run lint`         | Runs ESLint                                           |
| `npm run test`         | Runs the Vitest test suite                            |
| `npm run format`       | Formats the project with Prettier                     |
| `npm run format:check` | Checks formatting without changing files              |

## Project Structure

```text
src/
├── components/
│   ├── habits/
│   ├── layout/
│   └── ui/
├── pages/
│   ├── Calendar/
│   ├── Dashboard/
│   ├── Habits/
│   ├── NotFound/
│   ├── Settings/
│   └── Statistics/
├── routes/
├── services/
├── styles/
├── utils/
├── App.tsx
├── main.tsx
├── store.ts
└── types.ts
```

Product notes and visual references are stored separately in `docs/`.

## Data and Privacy

Habit data and settings are stored locally in the browser. The application does not send personal data to an external server.

Users can export their data as JSON and restore it through the import feature. Imported files are validated before being saved.

## Notifications

Browser notifications require explicit permission from the user. Scheduled reminders work while the application is open.

Notifications while the browser is fully closed would require a service worker, push subscription, and PWA support.

## Testing and Quality

The project includes automated tests for:

- Local calendar date handling
- Weekday and weekend schedules
- Custom-day schedules
- Completion-rate calculations
- Current and longest streak calculations

Before submitting changes, run:

```bash
npm run format:check
npm run test
npm run lint
npm run build
```
