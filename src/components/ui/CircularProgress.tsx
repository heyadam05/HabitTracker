import './CircularProgress.css';

export function CircularProgress({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  return (
    <div
      className="circular-progress"
      style={{ '--value': `${value * 3.6}deg` } as React.CSSProperties}
    >
      <div>
        <strong>{value}%</strong>
        {label && <span>{label}</span>}
      </div>
    </div>
  );
}
