'use client';

import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { DailyMetric } from '@/lib/supabase';

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--card-2)', border: '1px solid var(--border-2)', borderRadius: '8px', padding: '10px 14px' }}>
      <p className="label mb-1">{label}</p>
      <p className="num font-medium text-sm" style={{ color: 'var(--accent)' }}>
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function RevenueChart({ data }: { data: DailyMetric[] }) {
  const formatted = data.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: d.revenue,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={formatted} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: 'var(--text-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
          tickLine={false} axisLine={false}
          interval={Math.floor(formatted.length / 6)}
        />
        <YAxis
          tick={{ fill: 'var(--text-3)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
          tickLine={false} axisLine={false}
          tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-2)', strokeWidth: 1 }} />
        <Area
          type="monotone" dataKey="revenue"
          stroke="#6366f1" strokeWidth={2}
          fill="url(#revenueGrad)"
          dot={false} activeDot={{ r: 4, fill: '#6366f1', stroke: 'var(--card)', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
