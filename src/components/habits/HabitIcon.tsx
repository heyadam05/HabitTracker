import { Target } from 'lucide-react';
import type { Habit } from '../../types';
import { habitIcons } from './habitIcons';
import './HabitIcon.css';

export function HabitIcon({
  habit,
  size = 44,
}: {
  habit: Habit;
  size?: number;
}) {
  const Icon = habitIcons[habit.icon as keyof typeof habitIcons] || Target;
  return (
    <span
      className="habit-icon"
      style={
        {
          '--habit-color': habit.color,
          width: size,
          height: size,
        } as React.CSSProperties
      }
    >
      <Icon size={size * 0.48} />
    </span>
  );
}
