import toast from 'react-hot-toast';
import type { Habit, Settings } from '../types';
import { toDateKey } from './date';

export function exportData(habits: Habit[], settings: Settings) {
  const content = JSON.stringify(
    { habits, settings, exportedAt: new Date().toISOString() },
    null,
    2
  );
  const url = URL.createObjectURL(
    new Blob([content], { type: 'application/json' })
  );
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `habit-tracker-${toDateKey()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  toast.success('Your data has been exported.');
}
