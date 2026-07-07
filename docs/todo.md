Toto je veľmi dobrý projekt do portfólia. Nie je príliš jednoduchý (ako klasické Todo), ale ani príliš veľký. Navyše ukáže prácu s Reactom, TypeScriptom, routingom, state managementom, formulármi, komponentmi, grafmi aj kalendárom.

---

# 🎯 Habit Tracker

## Cieľ projektu

Webová aplikácia, ktorá používateľovi pomáha budovať denné návyky.

Používateľ si vytvorí napríklad:

- Read 30 min
- Drink 2L Water
- Workout
- Learn React
- Meditate

Každý deň ich môže označiť ako splnené a aplikácia bude sledovať:

- streak
- úspešnosť
- progress
- históriu
- štatistiky

---

# Design štýl

Chcel by som moderný minimalistický design.

Inšpirácia:

- GitHub
- Linear
- Notion
- Apple

---

# Farebná paleta

### Primary

```
#6366F1
```

(indigo)

---

### Success

```
#22C55E
```

---

### Warning

```
#F59E0B
```

---

### Danger

```
#EF4444
```

---

### Background

```
#F8FAFC
```

---

### Cards

```
#FFFFFF
```

---

### Text

Primary

```
#0F172A
```

Secondary

```
#64748B
```

---

### Border

```
#E2E8F0
```

---

# Font

Odporúčam

**Inter**

weights

```
400
500
600
700
```

---

# Border Radius

Veľmi moderný

```
16px
```

Buttons

```
14px
```

Inputs

```
12px
```

Cards

```
20px
```

---

# Shadow

Veľmi jemný

```
0 10px 30px rgba(0,0,0,.05)
```

---

# Animácie

Použiť Framer Motion.

Animácie:

- fade
- slide
- hover scale
- progress animation
- modal animation

Všetko veľmi jemné.

---

# Layout

Desktop

```
--------------------------
 Sidebar
|
|
|
|
--------------------------
 Main Content
```

Sidebar

cca

```
260px
```

---

# Navigácia

Sidebar obsahuje

🏠 Dashboard

✅ Habits

📅 Calendar

📊 Statistics

⚙ Settings

---

# Stránky

## Dashboard

Prvá stránka.

Obsahuje:

---

### Greeting

```
Good Morning,
Optimal 👋
```

---

### Today's Progress

Veľká karta

```
6 / 10 Habits

60%
```

Progress bar.

---

### Streak

Veľká karta

```
🔥 18 days
```

---

### Today's Habits

Zoznam dnešných habitov.

Každý obsahuje

```
Checkbox

Icon

Name

Current streak

Difficulty

Time
```

Kliknutím

Completed.

Animácia.

---

### Weekly Progress

Malý graf.

---

### Quote

Random motivational quote.

---

# Habits

Tu je kompletný CRUD.

Každý habit obsahuje:

```
Title

Description

Color

Icon

Difficulty

Goal

Frequency

Created date

Current streak

Longest streak

Completion %
```

---

Používateľ môže

Add Habit

Edit

Delete

Archive

---

# Add Habit Modal

Fields

Title

Description

Color Picker

Icon Picker

Frequency

○ Daily

○ Weekdays

○ Weekend

○ Custom

Difficulty

Easy

Medium

Hard

Reminder

(optional)

---

# Calendar

Mesačný kalendár.

Každý deň ukáže

✅ completed

❌ missed

🟡 partial

Kliknutím

Detail dňa.

---

# Statistics

Obsahuje

---

Overall Completion

Progress Circle

---

Longest Streak

Veľká karta.

---

Completion Rate

Bar chart.

---

Monthly Activity

Heatmap.

Podobná GitHub Contributions.

---

Best Habit

```
Reading

96%
```

---

Worst Habit

```
Workout

43%
```

---

Average Habits

```
5.8/day
```

---

# Settings

Theme

Dark

Light

System

Notifications

Language

Reset Data

Export JSON

Import JSON

---

# Komponenty

## Sidebar

Logo

Navigation

Profile

---

## Navbar

Search

Notifications

Avatar

---

## HabitCard

Obsahuje

Checkbox

Title

Description

Streak

Difficulty Badge

Progress

Actions

---

## ProgressBar

Animated.

---

## CircularProgress

SVG.

---

## CalendarGrid

Mesačný kalendár.

---

## StatCard

Používa sa všade.

---

## EmptyState

Ak nie sú habity.

---

## Button

Variants

Primary

Secondary

Ghost

Danger

---

## Input

---

## Modal

Reusable.

---

## Badge

Colors

Green

Blue

Orange

Red

---

## Card

Wrapper komponent.

---

# Ikony

Odporúčam

**Lucide React**

Ikony

Book

Heart

Water

Brain

Flame

Calendar

Check

Target

BarChart

Bell

Moon

Sun

Settings

---

# UX

Pri splnení habitu

✔ Checkbox animácia

✔ Progress sa zvýši

✔ Streak sa zvýši

✔ Confetti (iba pri 100%)

---

Pri vytvorení

Toast

```
Habit created.
```

---

Pri zmazaní

Confirmation Modal

---

# Local Storage

Na začiatok úplne stačí.

Ukladať

Habits

Settings

Theme

Statistics

History

---

# Použité knižnice

- React
- TypeScript
- React Router
- Framer Motion
- Lucide React
- React Hook Form
- Zod
- Zustand (state management)
- React Hot Toast
- React Calendar alebo FullCalendar
- Recharts (grafy)
- date-fns

---

# Štruktúra `src`

```text
src/
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Checkbox/
│   │   ├── Badge/
│   │   ├── ProgressBar/
│   │   ├── CircularProgress/
│   │   ├── EmptyState/
│   │   └── Spinner/
│   │
│   ├── layout/
│   │   ├── Sidebar/
│   │   ├── Navbar/
│   │   ├── PageHeader/
│   │   └── Layout/
│   │
│   ├── habits/
│   │   ├── HabitCard/
│   │   ├── HabitForm/
│   │   ├── HabitList/
│   │   ├── HabitItem/
│   │   ├── HabitFilters/
│   │   └── StreakBadge/
│   │
│   ├── calendar/
│   │   ├── CalendarGrid/
│   │   └── DayModal/
│   │
│   └── statistics/
│       ├── StatCard/
│       ├── WeeklyChart/
│       ├── MonthlyHeatmap/
│       ├── CompletionChart/
│       └── SummaryCards/
│
├── pages/
│   ├── Dashboard/
│   ├── Habits/
│   ├── Calendar/
│   ├── Statistics/
│   ├── Settings/
│   └── NotFound/
│
├── hooks/
│   ├── useHabits.ts
│   ├── useTheme.ts
│   ├── useLocalStorage.ts
│   └── useStatistics.ts
│
├── store/
│   ├── habitStore.ts
│   ├── themeStore.ts
│   └── settingsStore.ts
│
├── services/
│   ├── habitService.ts
│   ├── statisticsService.ts
│   └── storageService.ts
│
├── utils/
│   ├── dates.ts
│   ├── progress.ts
│   ├── streak.ts
│   ├── helpers.ts
│   └── constants.ts
│
├── types/
│   ├── habit.ts
│   ├── statistics.ts
│   ├── settings.ts
│   └── common.ts
│
├── styles/
│   ├── globals.css
│   ├── variables.css
│   ├── reset.css
│   ├── typography.css
│   └── animations.css
│
├── routes/
│   └── router.tsx
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Bonus funkcie (voliteľné)

Ak budeš chcieť projekt posunúť na ešte vyššiu úroveň do portfólia, môžeš neskôr pridať:

- **Dark Mode** s plynulým prepínaním tém.
- **Drag & Drop** na zmenu poradia habitov.
- **Kategórie** (napr. Health, Study, Fitness, Productivity).
- **Gamifikáciu** – XP body, levely a odznaky za dosiahnuté míľniky.
- **Export/Import dát** vo formáte JSON.
- **PWA podporu**, aby aplikácia fungovala aj offline a dala sa nainštalovať na zariadenie.

Takto navrhnutý Habit Tracker pôsobí ako moderná produkčná aplikácia a je veľmi vhodný do portfólia, pretože demonštruje prácu s komplexnejším stavom aplikácie, formulármi, validáciou, routovaním, grafmi, kalendárom, animáciami aj kvalitnou organizáciou React projektu.
