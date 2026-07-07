import { Bell, Menu } from 'lucide-react';
import { sendTestNotification } from '../../services/notificationService';
import './Header.css';

export function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="header">
      <button
        className="header__menu"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu />
      </button>
      <b className="header__mobile-title">Habit Tracker</b>
      <button
        className="header__notification"
        onClick={sendTestNotification}
        aria-label="Test notifications"
      >
        <Bell size={20} />
      </button>
    </header>
  );
}
