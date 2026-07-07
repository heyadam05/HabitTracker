import {
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  Home,
  Settings,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navigation = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/habits', label: 'Habits', icon: CheckCircle2 },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/statistics', label: 'Statistics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <button
          className="sidebar-scrim"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo">
          <span>
            <Check size={20} />
          </span>
          <b>Habit Tracker</b>
        </div>
        <nav className="sidebar__nav" aria-label="Main navigation">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={onClose}>
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
