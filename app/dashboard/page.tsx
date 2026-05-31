'use client';
import { useEffect, useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import { createClient } from '@/lib/supabase-client';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Order, DailyMetric } from '@/lib/types';

type KPI = { label: string; value: string; sub: string; up: boolean; change: string };

function fmt(n: number) {
  if (n >= 1000000) return `$${(n/1000000).toFixed(1)}M`;
  if (n >= 1000)    return `$${(n/1000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

function StatCard({ label, value, change, up, sub }: KPI) {
  return (
    <div className="surface p-5">
      <p className="label mb-3">{label}</p>
      <p className="num font-semibold" style={{ fontSize: '1.6rem', color: 'var(--text)', lineHeight: 1 }}>{value}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className={`num text-xs ${up ? 'trend-up' : 'trend-down'}`}>
          {up ? '↑' : '↓'} {change}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>{sub}</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-2)', borderRadius: '8px', padding: '10px 14px' }}>
      <p className="label mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="num text-xs" style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.name.toLowerCase().includes('rev') ? fmt(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [metrics, setMetrics]     = useState<DailyMetric[]>([]);
  const [orders, setOrders]       = useState<Order[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from('daily_metrics').select('*').order('date', { ascending: true }).limit(30),
      supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(100),
    ]).then(([m, o]) => {
      setMetrics(m.data ?? []);
      setOrders(o.data ?? []);
      setLoading(false);
    });
  }, []);

  // KPI calculations
  const totalRevenue   = orders.reduce((s, o) => s + (o.status === 'completed' ? o.amount : 0), 0);
  const totalOrders    = orders.length;
  const avgOrderValue  = totalOrders ? totalRevenue / totalOrders : 0;
  const convRate       = metrics.length ? metrics[metrics.length - 1]?.conversion_rate ?? 0 : 0;

  // Status breakdown for donut
  const statusData = ['completed','pending','refunded','cancelled'].map(s => ({
    name: s, value: orders.filter(o => o.status === s).length,
  })).filter(d => d.value > 0);

  const PIE_COLORS = ['#6366f1','#eab308','#22c55e','#ef4444'];

  // Chart data
  const chartData = metrics.map(m => ({
    date: m.date.slice(5),
    Revenue: m.revenue,
    Orders: m.orders,
  }));

  const RECENT = orders.slice(0, 8);

  const kpis: KPI[] = [
    { label: 'Total Revenue',    value: fmt(totalRevenue),          change: '12.4%', up: true,  sub: 'vs last 30 days' },
    { label: 'Total Orders',     value: totalOrders.toLocaleString(), change: '8.1%', up: true,  sub: 'vs last 30 days' },
    { label: 'Avg Order Value',  value: `$${avgOrderValue.toFixed(0)}`, change: '3.2%', up: true, sub: 'per transaction' },
    { label: 'Conversion Rate',  value: `${convRate.toFixed(2)}%`,  change: '0.3%',  up: false, sub: 'store visitors' },
  ];

  return (
    <>
      <TopBar title="Overview" />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
          </div>
        ) : (
          <div className="space-y-5 anim-up">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map(k => <StatCard key={k.label} {...k} />)}
            </div>

            {/* Revenue chart + Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Area chart — 2/3 width */}
              <div className="surface p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="label mb-1">Revenue</p>
                    <p className="num font-semibold" style={{ fontSize: '1.2rem', color: 'var(--text)' }}>{fmt(totalRevenue)}</p>
                  </div>
                  <span className="num text-xs trend-up">↑ 12.4% vs prev period</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 0" />
                    <XAxis dataKey="date" tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} interval={4} />
                    <YAxis tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="Revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Donut — 1/3 width */}
              <div className="surface p-5">
                <p className="label mb-4">Orders by Status</p>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {statusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <ul className="space-y-2 mt-2">
                  {statusData.map((s, i) => (
                    <li key={s.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                        <span className="text-xs capitalize" style={{ color: 'var(--text-2)' }}>{s.name}</span>
                      </div>
                      <span className="num text-xs" style={{ color: 'var(--text-3)' }}>{s.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Orders bar chart + Recent orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Bar chart */}
              <div className="surface p-5">
                <p className="label mb-4">Daily Orders</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={chartData.slice(-14)}>
                    <CartesianGrid strokeDasharray="3 0" />
                    <XAxis dataKey="date" tick={{ fill: '#52525b', fontSize: 9, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Orders" fill="#6366f1" radius={[3,3,0,0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent orders */}
              <div className="surface p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <p className="label">Recent Orders</p>
                  <a href="/dashboard/orders" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--accent)' }}>View all →</a>
                </div>
                <div className="space-y-2">
                  {RECENT.map(o => (
                    <div key={o.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                          {o.customer_name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{o.customer_name}</p>
                          <p className="text-xs truncate" style={{ color: 'var(--text-3)' }}>{o.product}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`badge badge-${o.status}`}>{o.status}</span>
                        <span className="num text-xs font-medium" style={{ color: 'var(--text)', minWidth: '56px', textAlign: 'right' }}>${o.amount.toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
