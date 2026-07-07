import { useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { CalendarDays, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { HabitIcon } from '../../components/habits/HabitIcon';
import { useAppStore } from '../../store';
import { isHabitScheduled } from '../../utils/date';
import { WEEKDAYS } from '../../utils/constants';
import './CalendarPage.css';

export function CalendarPage() {
  const habits = useAppStore((state) => state.habits).filter(
    (habit) => habit.status === 'active'
  );
  const toggleHabit = useAppStore((state) => state.toggleHabit);
  const weekStartsMonday = useAppStore(
    (state) => state.settings.weekStartsMonday
  );
  const [month, setMonth] = useState(new Date());
  const [selected, setSelected] = useState(new Date());
  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });
  const blanks = weekStartsMonday
    ? (getDay(startOfMonth(month)) + 6) % 7
    : getDay(startOfMonth(month));
  const selectedKey = format(selected, 'yyyy-MM-dd');
  const selectedHabits = habits.filter((habit) =>
    isHabitScheduled(habit, selected)
  );
  const weekdayLabels = weekStartsMonday
    ? [...WEEKDAYS.slice(1), WEEKDAYS[0]]
    : WEEKDAYS;

  return (
    <div className="calendar-page page">
      <PageHeader
        title="Calendar"
        subtitle="Track your habit history by day."
      />
      {habits.length === 0 ? (
        <article className="card">
          <EmptyState
            icon={CalendarDays}
            title="Your calendar is empty"
            description="Once you create and complete habits, their history will appear here."
          />
        </article>
      ) : (
        <section className="calendar-page__layout">
          <article className="card calendar-month">
            <header>
              <button
                onClick={() => setMonth(subMonths(month, 1))}
                aria-label="Previous month"
              >
                <ChevronLeft />
              </button>
              <h3>{format(month, 'MMMM yyyy')}</h3>
              <button
                onClick={() => setMonth(addMonths(month, 1))}
                aria-label="Next month"
              >
                <ChevronRight />
              </button>
            </header>
            <div className="calendar-month__weekdays">
              {weekdayLabels.map((day) => (
                <b key={day.value}>{day.short}</b>
              ))}
            </div>
            <div className="calendar-month__grid">
              {Array.from({ length: blanks }).map((_, index) => (
                <span key={index} />
              ))}
              {days.map((date) => {
                const scheduled = habits.filter((habit) =>
                  isHabitScheduled(habit, date)
                );
                const completed = scheduled.filter((habit) =>
                  habit.completedDates.includes(format(date, 'yyyy-MM-dd'))
                ).length;
                const state =
                  completed === 0
                    ? 'missed'
                    : completed === scheduled.length
                      ? 'done'
                      : 'partial';
                return (
                  <button
                    className={`${isSameDay(date, selected) ? 'selected' : ''} ${isSameDay(date, new Date()) ? 'today' : ''}`}
                    onClick={() => setSelected(date)}
                    key={date.toISOString()}
                  >
                    <b>{format(date, 'd')}</b>
                    {scheduled.length > 0 && (
                      <span className={`calendar-month__status ${state}`}>
                        <i />
                        {completed}/{scheduled.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </article>
          <article className="card calendar-detail">
            <h3>{format(selected, 'EEEE, MMMM d')}</h3>
            <p>
              {selectedHabits.length
                ? 'Click a habit to update this day.'
                : 'No habits are scheduled for this day.'}
            </p>
            <div>
              {selectedHabits.map((habit) => {
                const done = habit.completedDates.includes(selectedKey);
                return (
                  <button
                    onClick={() => toggleHabit(habit.id, selectedKey)}
                    key={habit.id}
                  >
                    <HabitIcon habit={habit} />
                    <span>
                      <strong>{habit.title}</strong>
                      <small>
                        {habit.frequency} • Goal {habit.goal}
                      </small>
                    </span>
                    <i className={done ? 'done' : ''}>{done && <Check />}</i>
                  </button>
                );
              })}
            </div>
          </article>
        </section>
      )}
    </div>
  );
}
