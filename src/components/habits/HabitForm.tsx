import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/Button';
import { habitIcons } from './habitIcons';
import { useAppStore } from '../../store';
import type { Difficulty, Frequency, Habit } from '../../types';
import {
  CATEGORIES,
  DIFFICULTIES,
  FREQUENCIES,
  HABIT_COLORS,
  WEEKDAYS,
} from '../../utils/constants';
import './HabitForm.css';

export function HabitForm({
  habit,
  onClose,
}: {
  habit?: Habit;
  onClose: () => void;
}) {
  const addHabit = useAppStore((state) => state.addHabit);
  const updateHabit = useAppStore((state) => state.updateHabit);
  const settings = useAppStore((state) => state.settings);
  const [form, setForm] = useState({
    title: habit?.title ?? '',
    description: habit?.description ?? '',
    icon: habit?.icon ?? 'target',
    color: habit?.color ?? settings.accent,
    category: habit?.category ?? 'Lifestyle',
    difficulty: habit?.difficulty ?? ('Easy' as Difficulty),
    frequency: habit?.frequency ?? settings.defaultFrequency,
    customDays: habit?.customDays ?? [1, 2, 3, 4, 5],
    reminder: habit?.reminder ?? settings.defaultReminder,
    goal: habit?.goal ?? 1,
  });
  const set = <K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K]
  ) => setForm((current) => ({ ...current, [field]: value }));
  const toggleCustomDay = (day: number) =>
    set(
      'customDays',
      form.customDays.includes(day)
        ? form.customDays.filter((item) => item !== day)
        : [...form.customDays, day]
    );
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (form.title.trim().length < 2)
      return toast.error('Please enter a habit title.');
    if (form.frequency === 'Custom' && form.customDays.length === 0)
      return toast.error('Choose at least one repeat day.');
    if (habit) updateHabit(habit.id, form);
    else addHabit(form);
    toast.success(habit ? 'Habit updated.' : 'Habit created.');
    onClose();
  };

  return (
    <form className="habit-form" onSubmit={submit}>
      <label>
        <span>Title</span>
        <input
          autoFocus
          value={form.title}
          onChange={(event) => set('title', event.target.value)}
          placeholder="e.g. Read for 30 minutes"
        />
      </label>
      <label>
        <span>Description</span>
        <textarea
          value={form.description}
          onChange={(event) => set('description', event.target.value)}
          placeholder="Why does this habit matter?"
        />
      </label>
      <div className="habit-form__row">
        <label>
          <span>Frequency</span>
          <select
            value={form.frequency}
            onChange={(event) =>
              set('frequency', event.target.value as Frequency)
            }
          >
            {FREQUENCIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Difficulty</span>
          <select
            value={form.difficulty}
            onChange={(event) =>
              set('difficulty', event.target.value as Difficulty)
            }
          >
            {DIFFICULTIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      {form.frequency === 'Custom' && (
        <fieldset>
          <legend>Repeat on</legend>
          <div className="habit-form__weekdays">
            {WEEKDAYS.map((day) => (
              <button
                type="button"
                className={
                  form.customDays.includes(day.value) ? 'selected' : ''
                }
                onClick={() => toggleCustomDay(day.value)}
                key={day.value}
              >
                {day.short.slice(0, 1)}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <div className="habit-form__row">
        <label>
          <span>Category</span>
          <select
            value={form.category}
            onChange={(event) => set('category', event.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Reminder</span>
          <input
            type="time"
            value={form.reminder}
            onChange={(event) => set('reminder', event.target.value)}
          />
        </label>
      </div>
      <label>
        <span>Daily goal</span>
        <input
          type="number"
          min="1"
          max="999"
          value={form.goal}
          onChange={(event) =>
            set('goal', Math.max(1, Number(event.target.value)))
          }
        />
      </label>
      <fieldset>
        <legend>Icon</legend>
        <div className="habit-form__icons">
          {Object.entries(habitIcons).map(([key, Icon]) => (
            <button
              type="button"
              className={form.icon === key ? 'selected' : ''}
              onClick={() => set('icon', key)}
              key={key}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Color</legend>
        <div className="habit-form__colors">
          {HABIT_COLORS.map((color) => (
            <button
              type="button"
              aria-label={`Choose ${color}`}
              className={form.color === color ? 'selected' : ''}
              style={{ background: color }}
              onClick={() => set('color', color)}
              key={color}
            />
          ))}
        </div>
      </fieldset>
      <footer className="habit-form__actions">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button>{habit ? 'Save changes' : 'Create habit'}</Button>
      </footer>
    </form>
  );
}
