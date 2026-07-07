import { useRef, type ChangeEvent } from 'react';
import {
  Bell,
  Clock3,
  Download,
  Import,
  Moon,
  Sparkles,
  Sun,
  Trash2,
  Trophy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHeader } from '../../components/ui/PageHeader';
import { useAppStore } from '../../store';
import { exportData } from '../../utils/data';
import { requestNotificationPermission } from '../../services/notificationService';
import { backupSchema } from '../../utils/validation';
import { FREQUENCIES, HABIT_COLORS } from '../../utils/constants';
import type { Frequency, Settings, Theme } from '../../types';
import './SettingsPage.css';

const notificationRows = [
  {
    icon: Bell,
    title: 'Daily reminders',
    description: 'Get reminded about your habits.',
    field: 'dailyReminders',
  },
  {
    icon: Clock3,
    title: 'Streak alerts',
    description: 'Know when your streak is at risk.',
    field: 'streakAlerts',
  },
  {
    icon: Trophy,
    title: 'Achievements',
    description: 'Celebrate important milestones.',
    field: 'achievements',
  },
] as const;

function Toggle({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      className={`settings-toggle ${active ? 'active' : ''}`}
      role="switch"
      aria-checked={active}
      onClick={onClick}
    >
      <i />
    </button>
  );
}

export function SettingsPage() {
  const habits = useAppStore((state) => state.habits);
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const importData = useAppStore((state) => state.importData);
  const reset = useAppStore((state) => state.reset);
  const fileInput = useRef<HTMLInputElement>(null);
  const toggle = (field: keyof Settings) =>
    updateSettings({ [field]: !settings[field] });
  const toggleDailyReminders = async () => {
    if (settings.dailyReminders) {
      updateSettings({ dailyReminders: false });
      return;
    }
    if (await requestNotificationPermission()) {
      updateSettings({ dailyReminders: true });
      toast.success('Daily reminders enabled.');
    }
  };

  const importFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = backupSchema.parse(JSON.parse(String(reader.result)));
        importData(data.habits, data.settings);
        toast.success('Data imported.');
      } catch {
        toast.error('Invalid Habit Tracker backup.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="settings-page page">
      <PageHeader
        title="Settings"
        subtitle="Manage your preferences and app settings."
      />
      <section className="settings-page__grid">
        <article className="card settings-card settings-card--profile">
          <h3>Profile</h3>
          <p>This optional name is used only in your dashboard greeting.</p>
          <label className="settings-profile">
            <span>Display name</span>
            <input
              value={settings.profileName}
              onChange={(event) =>
                updateSettings({ profileName: event.target.value })
              }
              placeholder="Your name"
              maxLength={40}
            />
          </label>
        </article>
        <article className="card settings-card settings-card--appearance">
          <h3>Appearance</h3>
          <p>Choose your preferred theme.</p>
          <div className="settings-themes">
            {(
              [
                ['light', Sun],
                ['dark', Moon],
                ['system', Sparkles],
              ] as [Theme, typeof Sun][]
            ).map(([theme, Icon]) => (
              <button
                className={settings.theme === theme ? 'active' : ''}
                onClick={() => updateSettings({ theme })}
                key={theme}
              >
                <Icon />
                <b>{theme}</b>
              </button>
            ))}
          </div>
          <h4>Accent color</h4>
          <div className="settings-colors">
            {HABIT_COLORS.map((color) => (
              <button
                aria-label={`Use ${color}`}
                className={settings.accent === color ? 'active' : ''}
                style={{ background: color }}
                onClick={() => updateSettings({ accent: color })}
                key={color}
              />
            ))}
          </div>
        </article>
        <article className="card settings-card">
          <h3>Notifications</h3>
          <p>Choose how you want to be notified.</p>
          {notificationRows.map(({ icon: Icon, title, description, field }) => (
            <div className="settings-row" key={field}>
              <Icon />
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <Toggle
                active={settings[field]}
                onClick={
                  field === 'dailyReminders'
                    ? toggleDailyReminders
                    : () => toggle(field)
                }
              />
            </div>
          ))}
        </article>
        <article className="card settings-card">
          <h3>Habit defaults</h3>
          <p>Used when creating a new habit.</p>
          <label className="settings-select">
            <span>Default frequency</span>
            <select
              value={settings.defaultFrequency}
              onChange={(event) =>
                updateSettings({
                  defaultFrequency: event.target.value as Frequency,
                })
              }
            >
              {FREQUENCIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="settings-select">
            <span>Reminder time</span>
            <input
              type="time"
              value={settings.defaultReminder}
              onChange={(event) =>
                updateSettings({ defaultReminder: event.target.value })
              }
            />
          </label>
          <div className="settings-row">
            <Clock3 />
            <span>
              <strong>Week starts Monday</strong>
              <small>Changes the calendar layout.</small>
            </span>
            <Toggle
              active={settings.weekStartsMonday}
              onClick={() => toggle('weekStartsMonday')}
            />
          </div>
          <div className="settings-row">
            <Sparkles />
            <span>
              <strong>Motivational quotes</strong>
              <small>Show quotes on dashboard.</small>
            </span>
            <Toggle
              active={settings.motivationalQuotes}
              onClick={() => toggle('motivationalQuotes')}
            />
          </div>
        </article>
        <article className="card settings-card">
          <h3>Import / Export</h3>
          <p>Your information stays in this browser.</p>
          <div className="settings-action">
            <Download />
            <span>
              <strong>Export data</strong>
              <small>Download a JSON backup.</small>
            </span>
            <button onClick={() => exportData(habits, settings)}>Export</button>
          </div>
          <div className="settings-action">
            <Import />
            <span>
              <strong>Import data</strong>
              <small>Restore from a JSON backup.</small>
            </span>
            <button onClick={() => fileInput.current?.click()}>Import</button>
            <input
              ref={fileInput}
              type="file"
              accept=".json"
              hidden
              onChange={importFile}
            />
          </div>
        </article>
        <article className="card settings-card">
          <h3>Danger zone</h3>
          <p>Reset removes all habits and settings.</p>
          <div className="settings-action">
            <Trash2 />
            <span>
              <strong>Reset all data</strong>
              <small>Return to a clean empty app.</small>
            </span>
            <button
              className="danger"
              onClick={() => {
                if (window.confirm('Reset all Habit Tracker data?')) {
                  reset();
                  toast.success('All data was reset.');
                }
              }}
            >
              Reset
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
