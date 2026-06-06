'use client';
import { useEffect, useState } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import { createClient } from '@/lib/supabase-client';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Order, DailyMetric } from '@/lib/types';

function fmt(n: number) {
  if (n >= 1000000) return `$${(n/1000000).toFixed(1)}M`;
  if (n >= 1000)    return `$${(n/1000).toFixed(1)}k`;
  return `$${n.toFixed(0)}`;
}

function StatCard({ label, value, change, up, sub }: any) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: 'clamp(14px,3vw,20px)' }}>
      <p className="label mb-2" style={{ fontSize: '0.65rem' }}>{label}</p>
      <p className="num font-semibold" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'var(--text)', lineHeight: 1 }}>{value}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
        <span className={`num text-xs ${up ? 'trend-up' : 'trend-down'}`} style={{ fontSize: '0.7rem' }}>
          {up ? '↑' : '↓'} {change}
        </span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-3)' }}>{sub}</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-2)', borderRadius: '8px', padding: '10px 14px' }}>
      <p className="label mb-1" style={{ fontSize: '0.65rem' }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="num" style={{ fontSize: '0.8rem', color: p.color }}>
          {p.name}: {p.name?.toLowerCase().includes('rev') ? fmt(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  const totalRevenue  = orders.reduce((s, o) => s + (o.status === 'completed' ? o.amount : 0), 0);
  const totalOrders   = orders.length;
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
  const convRate      = metrics.length ? metrics[metrics.length - 1]?.conversion_rate ?? 0 : 0;

  const statusData = ['completed','pending','refunded','cancelled'].map(s => ({
    name: s, value: orders.filter(o => o.status === s).length,
  })).filter(d => d.value > 0);

  const PIE_COLORS = ['#6366f1','#eab308','#22c55e','#ef4444'];

  const chartData = metrics.map(m => ({
    date: m.date.slice(5),
    Revenue: m.revenue,
    Orders: m.orders,
  }));

  const RECENT = orders.slice(0, 6);

  const kpis = [
    { label: 'Total Revenue',   value: fmt(totalRevenue),              change: '12.4%', up: true,  sub: 'vs last 30 days' },
    { label: 'Total Orders',    value: totalOrders.toLocaleString(),   change: '8.1%',  up: true,  sub: 'vs last 30 days' },
    { label: 'Avg Order Value', value: `$${avgOrderValue.toFixed(0)}`, change: '3.2%',  up: true,  sub: 'per transaction'  },
    { label: 'Conversion Rate', value: `${convRate.toFixed(2)}%`,      change: '0.3%',  up: false, sub: 'store visitors'   },
  ];

  return (
    <>
      <TopBar title="Overview" />
      <main style={{ flex: 1, overflowY: 'auto', padding: 'clamp(14px,3vw,24px)' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <div style={{ width: '24px', height: '24px', border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,2.5vw,20px)' }}>

            {/* KPI Cards — 2 cols on mobile, 4 on desktop */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(10px,2vw,16px)' }}
              className="lg:grid-cols-4">
              {kpis.map(k => <StatCard key={k.label} {...k} />)}
            </div>
            <style>{`.lg\\:grid-cols-4 { grid-template-columns: repeat(2,1fr); } @media(min-width:1024px){ .lg\\:grid-cols-4 { grid-template-columns: repeat(4,1fr); } }`}</style>

            {/* Revenue chart */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: 'clamp(14px,3vw,20px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <p className="label" style={{ fontSize: '0.65rem', marginBottom: '4px' }}>Revenue</p>
                  <p className="num font-semibold" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', color: 'var(--text)' }}>{fmt(totalRevenue)}</p>
                </div>
                <span className="num trend-up" style={{ fontSize: '0.75rem' }}>↑ 12.4% vs prev</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 0" />
                  <XAxis dataKey="date" tick={{ fill: '#52525b', fontSize: 9, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} interval={6} />
                  <YAxis tick={{ fill: '#52525b', fontSize: 9, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} width={36} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="Revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Donut + Bar — stack on mobile */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(10px,2vw,16px)' }}>
              {/* Donut */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: 'clamp(14px,3vw,20px)' }}>
                <p className="label mb-3" style={{ fontSize: '0.65rem' }}>Orders by Status</p>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                      {statusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {statusData.map((s, i) => (
                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: PIE_COLORS[i], flexShrink: 0 }} />
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-2)', textTransform: 'capitalize' }}>{s.name}</span>
                      <span className="num" style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>({s.value})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: 'clamp(14px,3vw,20px)' }}>
                <p className="label mb-3" style={{ fontSize: '0.65rem' }}>Daily Orders (14d)</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData.slice(-14)}>
                    <CartesianGrid strokeDasharray="3 0" />
                    <XAxis dataKey="date" tick={{ fill: '#52525b', fontSize: 9, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: '#52525b', fontSize: 9, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} width={28} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Orders" fill="#6366f1" radius={[3,3,0,0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent orders */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: 'clamp(14px,3vw,20px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <p className="label" style={{ fontSize: '0.65rem' }}>Recent Orders</p>
                <a href="/dashboard/orders" style={{ fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none' }}>View all →</a>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Customer','Product','Amount','Status'].map(h => (
                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT.map((o, i) => (
                      <tr key={o.id} style={{ borderBottom: i < RECENT.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-2)', flexShrink: 0 }}>
                              {o.customer_name.charAt(0)}
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap' }}>{o.customer_name.split(' ')[0]}</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', fontSize: '0.78rem', color: 'var(--text-2)', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.product}</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span className="num" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>${o.amount.toFixed(0)}</span>
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', textTransform: 'capitalize',
                            background: o.status === 'completed' ? 'rgba(34,197,94,0.1)' : o.status === 'pending' ? 'rgba(234,179,8,0.1)' : o.status === 'refunded' ? 'rgba(99,102,241,0.1)' : 'rgba(239,68,68,0.1)',
                            color: o.status === 'completed' ? '#4ade80' : o.status === 'pending' ? '#facc15' : o.status === 'refunded' ? '#818cf8' : '#f87171',
                          }}>{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </main>
    </>
  );
}