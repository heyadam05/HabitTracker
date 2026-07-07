import {
  Activity,
  BarChart3,
  CheckCircle2,
  Download,
  Flame,
  Star,
  Target,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAppStore } from '../../store';
import { exportData } from '../../utils/data';
import './StatisticsPage.css';

const statistics = [
  {
    icon: Target,
    label: 'Completion rate',
    value: (average: number) => `${average}%`,
  },
  {
    icon: Flame,
    label: 'Longest streak',
    value: (_average: number, longest: number) => `${longest} days`,
  },
  {
    icon: CheckCircle2,
    label: 'Total completed',
    value: (_average: number, _longest: number, total: number) => total,
  },
  {
    icon: Activity,
    label: 'Average / day',
    value: (_average: number, _longest: number, total: number) =>
      (total / 30).toFixed(1),
  },
  {
    icon: Star,
    label: 'Total habits',
    value: (
      _average: number,
      _longest: number,
      _total: number,
      count: number
    ) => count,
  },
];

export function StatisticsPage() {
  const habits = useAppStore((state) => state.habits);
  const settings = useAppStore((state) => state.settings);
  const average = habits.length
    ? Math.round(
        habits.reduce((sum, habit) => sum + habit.completionRate, 0) /
          habits.length
      )
    : 0;
  const total = habits.reduce(
    (sum, habit) => sum + habit.completedDates.length,
    0
  );
  const longest = Math.max(0, ...habits.map((habit) => habit.longestStreak));
  const best = [...habits].sort(
    (a, b) => b.completionRate - a.completionRate
  )[0];

  return (
    <div className="statistics-page page">
      <PageHeader
        title="Statistics"
        subtitle="Track your progress and improve every day."
        actions={
          habits.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => exportData(habits, settings)}
            >
              <Download size={17} /> Export
            </Button>
          )
        }
      />
      {habits.length === 0 ? (
        <article className="card">
          <EmptyState
            icon={BarChart3}
            title="No statistics yet"
            description="Create a habit and record a few completions. Your trends and streaks will grow here."
          />
        </article>
      ) : (
        <>
          <section className="statistics-page__summary">
            {statistics.map(({ icon: Icon, label, value }) => (
              <article className="card" key={label}>
                <Icon />
                <span>
                  <small>{label}</small>
                  <strong>
                    {value(average, longest, total, habits.length)}
                  </strong>
                </span>
              </article>
            ))}
          </section>
          <section className="statistics-page__grid">
            <article className="card statistics-chart">
              <h3>Habit Completion</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={habits}>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="title"
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis domain={[0, 100]} />
                  <Bar
                    dataKey="completionRate"
                    fill="var(--primary)"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </article>
            <article className="card statistics-best">
              <h3>Best habit</h3>
              {best && (
                <>
                  <Star />
                  <strong>{best.title}</strong>
                  <b>{best.completionRate}%</b>
                  <ProgressBar value={best.completionRate} />
                </>
              )}
            </article>
          </section>
        </>
      )}
    </div>
  );
}
