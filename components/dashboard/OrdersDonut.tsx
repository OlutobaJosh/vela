'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS: Record<string, string> = {
  completed: '#22c55e',
  pending:   '#eab308',
  refunded:  '#6366f1',
  cancelled: '#ef4444',
};

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--card-2)', border: '1px solid var(--border-2)', borderRadius: '8px', padding: '8px 12px' }}>
      <p className="text-xs font-medium capitalize" style={{ color: 'var(--text)' }}>{payload[0].name}</p>
      <p className="num text-sm" style={{ color: COLORS[payload[0].name] ?? '#fff' }}>{payload[0].value} orders</p>
    </div>
  );
}

export default function OrdersDonut({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex items-center gap-6">
      <div style={{ width: 120, height: 120, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%"
              innerRadius={36} outerRadius={55} strokeWidth={0}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] ?? '#71717a'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2 flex-1">
        {data.map(d => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: COLORS[d.name] ?? '#71717a' }} />
              <span className="text-xs capitalize" style={{ color: 'var(--text-2)' }}>{d.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="num text-xs" style={{ color: 'var(--text)' }}>{d.value}</span>
              <span className="num text-xs" style={{ color: 'var(--text-3)' }}>
                {total > 0 ? Math.round((d.value / total) * 100) : 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
