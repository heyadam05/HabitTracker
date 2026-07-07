import './ProgressBar.css';

export function ProgressBar({
  value,
  color,
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="progress-bar">
      <span
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: color,
        }}
      />
    </div>
  );
}
