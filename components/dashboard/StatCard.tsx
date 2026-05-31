type Props = {
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  sub?: string;
};

export default function StatCard({ label, value, delta, deltaUp, sub }: Props) {
  return (
    <div className="card card-hover p-5">
      <p className="label mb-3">{label}</p>
      <p className="num font-semibold" style={{ fontSize: '1.6rem', color: 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {value}
      </p>
      <div className="flex items-center gap-2 mt-2">
        {delta && (
          <span
            className="num text-xs font-medium px-1.5 py-0.5 rounded"
            style={{
              background: deltaUp ? 'var(--green-d)' : 'var(--red-d)',
              color: deltaUp ? 'var(--green)' : 'var(--red)',
            }}
          >
            {deltaUp ? '↑' : '↓'} {delta}
          </span>
        )}
        {sub && <span className="text-xs" style={{ color: 'var(--text-3)' }}>{sub}</span>}
      </div>
    </div>
  );
}
