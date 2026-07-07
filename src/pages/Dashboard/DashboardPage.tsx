import { addDays, startOfWeek } from 'date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { Check, Flame, Plus, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { HabitIcon } from '../../components/habits/HabitIcon';
import { useAppStore } from '../../store';
import { isHabitScheduled, toDateKey } from '../../utils/date';
import './DashboardPage.css';

export function DashboardPage() {
  const allHabits = useAppStore((state) => state.habits);
  const settings = useAppStore((state) => state.settings);
  const activeHabits = allHabits.filter((habit) => habit.status === 'active');
  const habits = activeHabits.filter((habit) =>
    isHabitScheduled(habit, new Date())
  );
  const profileName = settings.profileName;
  const toggleHabit = useAppStore((state) => state.toggleHabit);
  const navigate = useNavigate();
  const completed = habits.filter((habit) =>
    habit.completedDates.includes(toDateKey())
  ).length;
  const progress = habits.length
    ? Math.round((completed / habits.length) * 100)
    : 0;
  const longest = Math.max(0, ...activeHabits.map((habit) => habit.streak));
  const week = (() => {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, index) => {
      const date = addDays(monday, index);
      const scheduled = activeHabits.filter((habit) =>
        isHabitScheduled(habit, date)
      );
      const completedCount = scheduled.filter((habit) =>
        habit.completedDates.includes(toDateKey(date))
      ).length;
      return {
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        value: scheduled.length
          ? Math.round((completedCount / scheduled.length) * 100)
          : 0,
      };
    });
  })();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const title = profileName.trim()
    ? `${greeting}, ${profileName.trim()} 👋`
    : `${greeting} 👋`;

  const toggle = (id: string) => {
    const wasDone = habits
      .find((habit) => habit.id === id)
      ?.completedDates.includes(toDateKey());
    toggleHabit(id);
    const updated = useAppStore
      .getState()
      .habits.find((habit) => habit.id === id);
    if (
      !wasDone &&
      settings.achievements &&
      updated &&
      [7, 30, 100].includes(updated.streak)
    ) {
      toast.success(`Achievement unlocked: ${updated.streak}-day streak!`);
      return;
    }
    toast.success('Progress updated.');
  };

  return (
    <div className="dashboard-page page">
      <PageHeader
        title={title}
        subtitle="Let’s build some great habits today!"
      />
      <section className="dashboard-page__summary">
        <article className="card dashboard-progress">
          <div>
            <h3>Today's Progress</h3>
            <CircularProgress
              value={progress}
              label={habits.length ? 'Keep going!' : 'Ready when you are'}
            />
          </div>
          <div>
            <strong>
              {completed} / {habits.length}
            </strong>
            <span>Habits completed</span>
            <ProgressBar value={progress} />
            <small>
              {habits.length
                ? 'Small steps add up.'
                : 'Create your first habit to begin.'}
            </small>
          </div>
        </article>
        <article className="card dashboard-streak">
          <div>
            <h3>
              <Flame size={18} /> Current Streak
            </h3>
            <strong>
              {longest} <small>days</small>
            </strong>
            <p>Your streak follows scheduled completion days.</p>
          </div>
          <span>
            <Flame />
          </span>
        </article>
      </section>
      <section className="dashboard-page__grid">
        <article className="card dashboard-today">
          <header>
            <h3>Today's Habits</h3>
            {habits.length > 0 && (
              <Button variant="ghost" onClick={() => navigate('/habits')}>
                Manage
              </Button>
            )}
          </header>
          {habits.length === 0 ? (
            <EmptyState
              icon={Target}
              title="No habits yet"
              description="Create your first habit and it will appear here every day."
              action={
                <Button onClick={() => navigate('/habits')}>
                  <Plus size={18} /> Create first habit
                </Button>
              }
            />
          ) : (
            <div className="dashboard-today__list">
              {habits.map((habit) => {
                const done = habit.completedDates.includes(toDateKey());
                return (
                  <button
                    className={done ? 'completed' : ''}
                    onClick={() => toggle(habit.id)}
                    key={habit.id}
                  >
                    <i>{done && <Check size={14} />}</i>
                    <HabitIcon habit={habit} />
                    <span>
                      <strong>{habit.title}</strong>
                      <small>
                        {habit.frequency} • Goal {habit.goal} •{' '}
                        {habit.reminder || 'Any time'}
                      </small>
                    </span>
                    <b>
                      <Flame size={15} />
                      {habit.streak}
                    </b>
                  </button>
                );
              })}
            </div>
          )}
        </article>
        <div className="dashboard-page__side">
          <article className="card dashboard-chart">
            <h3>Weekly Progress</h3>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={week}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} hide />
                <Bar
                  dataKey="value"
                  fill="var(--primary)"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p>Completion rate for scheduled habits.</p>
          </article>
          {settings.motivationalQuotes && (
            <article className="card dashboard-quote">
              “Small habits become remarkable results.”
            </article>
          )}
        </div>
      </section>
    </div>
  );
}
