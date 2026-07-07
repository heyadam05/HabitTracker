import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Archive,
  CheckCircle2,
  LayoutList,
  Pencil,
  Plus,
  Star,
  Target,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { HabitIcon } from '../../components/habits/HabitIcon';
import { HabitForm } from '../../components/habits/HabitForm';
import { useAppStore } from '../../store';
import type { Habit } from '../../types';
import './HabitsPage.css';

export function HabitsPage() {
  const habits = useAppStore((state) => state.habits);
  const updateHabit = useAppStore((state) => state.updateHabit);
  const deleteHabit = useAppStore((state) => state.deleteHabit);
  const [filter, setFilter] = useState<'all' | Habit['status']>('all');
  const [editing, setEditing] = useState<'new' | Habit | null>(null);
  const [deleting, setDeleting] = useState<Habit | null>(null);
  const filtered = habits.filter(
    (habit) => filter === 'all' || habit.status === filter
  );

  return (
    <div className="habits-page page">
      <PageHeader
        title="Habits"
        subtitle="Build better habits, one day at a time."
        actions={
          <Button onClick={() => setEditing('new')}>
            <Plus size={18} /> Add Habit
          </Button>
        }
      />
      <section className="card habits-summary">
        <div>
          <LayoutList />
          <strong>{habits.length}</strong>
          <small>Total Habits</small>
        </div>
        <div>
          <CheckCircle2 />
          <strong>
            {habits.filter((habit) => habit.status === 'active').length}
          </strong>
          <small>Active</small>
        </div>
        <div>
          <Star />
          <strong>
            {
              habits.filter(
                (habit) =>
                  habit.status === 'active' && habit.completionRate >= 70
              ).length
            }
          </strong>
          <small>On Track</small>
        </div>
        <div>
          <Archive />
          <strong>
            {habits.filter((habit) => habit.status !== 'active').length}
          </strong>
          <small>Inactive</small>
        </div>
      </section>
      <section className="card habits-list">
        <nav>
          {(['all', 'active', 'paused', 'archived'] as const).map((item) => (
            <button
              className={filter === item ? 'active' : ''}
              onClick={() => setFilter(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </nav>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Target}
            title={
              filter === 'all'
                ? 'Start with your first habit'
                : `No ${filter} habits`
            }
            description={
              filter === 'all'
                ? 'Your habit list is empty. Add something small and achievable.'
                : 'Change the filter or update a habit status.'
            }
            action={
              filter === 'all' && (
                <Button onClick={() => setEditing('new')}>
                  <Plus size={18} /> Add habit
                </Button>
              )
            }
          />
        ) : (
          <div className="habits-list__rows">
            {filtered.map((habit) => (
              <article key={habit.id}>
                <HabitIcon habit={habit} />
                <div>
                  <strong>{habit.title}</strong>
                  <small>
                    {habit.frequency} • {habit.reminder || 'Any time'}
                  </small>
                </div>
                <div className="habits-list__progress">
                  <b>{habit.completionRate}%</b>
                  <ProgressBar value={habit.completionRate} />
                </div>
                <label className="habits-list__status">
                  <span className="sr-only">Status for {habit.title}</span>
                  <select
                    value={habit.status}
                    onChange={(event) => {
                      updateHabit(habit.id, {
                        status: event.target.value as Habit['status'],
                      });
                      toast.success(`Habit is now ${event.target.value}.`);
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>
                <div className="habits-list__actions">
                  <button
                    onClick={() => setEditing(habit)}
                    aria-label={`Edit ${habit.title}`}
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => setDeleting(habit)}
                    aria-label={`Delete ${habit.title}`}
                  >
                    <Trash2 />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <AnimatePresence>
        {editing && (
          <Modal
            title={editing === 'new' ? 'Create a new habit' : 'Edit habit'}
            onClose={() => setEditing(null)}
          >
            <HabitForm
              habit={editing === 'new' ? undefined : editing}
              onClose={() => setEditing(null)}
            />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleting && (
          <Modal title="Delete habit?" small onClose={() => setDeleting(null)}>
            <p className="habits-page__confirm">
              This permanently deletes “{deleting.title}” and its history.
            </p>
            <footer className="habits-page__modal-actions">
              <Button variant="secondary" onClick={() => setDeleting(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  deleteHabit(deleting.id);
                  setDeleting(null);
                  toast.success('Habit deleted.');
                }}
              >
                Delete
              </Button>
            </footer>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
