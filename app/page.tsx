import Link from 'next/link';

const FEATURES = [
  { icon: '◈', title: 'Revenue Intelligence', desc: 'Track MRR, ARR, and daily revenue with precision. Spot trends before they become problems.' },
  { icon: '◉', title: 'Order Pipeline', desc: 'Monitor every order from placement to fulfilment. Filter by status, date, or customer instantly.' },
  { icon: '◎', title: 'Customer Analytics', desc: 'Understand LTV, purchase frequency, and geographic distribution of your customer base.' },
  { icon: '◐', title: 'Conversion Tracking', desc: 'See exactly where your funnel drops off. Data-driven decisions, not gut feelings.' },
  { icon: '◑', title: 'Real-time Updates', desc: 'Supabase-powered live data. Your dashboard reflects reality the moment it changes.' },
  { icon: '◒', title: 'Export Ready', desc: 'Pull any dataset into CSV for your team, accountant, or board report in one click.' },
];

const PRICING = [
  {
    name: 'Starter',
    price: '$29',
    period: '/mo',
    desc: 'For indie sellers and small stores',
    features: ['Up to 1,000 orders/mo', '3 months history', '1 team member', 'Email support'],
    accent: false,
    cta: 'Get started',
  },
  {
    name: 'Growth',
    price: '$79',
    period: '/mo',
    desc: 'For scaling e-commerce brands',
    features: ['Up to 10,000 orders/mo', '12 months history', '5 team members', 'Priority support', 'CSV exports'],
    accent: true,
    cta: 'Start free trial',
  },
  {
    name: 'Scale',
    price: '$199',
    period: '/mo',
    desc: 'For high-volume operations',
    features: ['Unlimited orders', 'Full history', 'Unlimited seats', 'Dedicated support', 'API access', 'Custom reports'],
    accent: false,
    cta: 'Contact sales',
  },
];

// ── Static data for the dashboard mockup ──────────────────────────────────────

const KPI_CARDS = [
  { label: 'Revenue',    val: '$48,291', trend: '+12.4%', up: true,  sub: 'vs $43k last mo.',  spark: [55,60,52,70,68,75,72,80,78,88,85,90] },
  { label: 'Orders',     val: '1,847',   trend: '+8.1%',  up: true,  sub: '1,708 last month',  spark: [50,55,48,62,65,70,68,72,75,80,82,85] },
  { label: 'Customers',  val: '924',     trend: '+5.3%',  up: true,  sub: '877 last month',    spark: [60,62,58,65,63,68,70,72,68,75,78,80] },
  { label: 'Conv. Rate', val: '3.24%',   trend: '−0.2%',  up: false, sub: '3.44% last month',  spark: [70,68,72,66,65,62,63,60,64,58,56,55] },
];

const BAR_DATA = [40,55,35,70,60,80,50,75,65,90,72,85,60,95,78,88,70,92,68,85,72,90,80,95,75,88,92,98,85,90];

// Sidebar icon paths (16×16 viewBox)
const SIDEBAR_ICONS = [
  'M3 3h4v4H3zm6 0h4v4H9zM3 9h4v4H3zm6 0h4v4H9z',            // grid / home
  'M2 12V8h2v4zm4-6v10H8V6zm4 2v8h2V8z',                       // bar chart
  'M7 2a2.5 2.5 0 0 1 2.5 2.5h-5A2.5 2.5 0 0 1 7 2zm4 2.5H3L2 13h10z', // bag
  'M7 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-4 6a4 4 0 0 1 8 0H3z',  // person
];

// Pure helper – computes polyline `points` string from sparkline data
function sparkPoints(data: number[]): string {
  const W = 52, H = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - min) / range) * (H - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{ borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)', background: 'rgba(9,9,11,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded" style={{ background: 'var(--accent)' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-full h-full p-1"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
            </div>
            <span className="font-semibold tracking-tight" style={{ color: 'var(--text)' }}>Vela</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Features', 'Pricing'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-3)' }}>{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-ghost text-xs">Sign in</Link>
            <Link href="/register" className="btn btn-accent text-xs">Get started →</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.12), transparent)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: 'var(--accent)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
            Real-time e-commerce analytics
          </div>

          <h1 className="font-semibold mb-6 tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: 'var(--text)' }}>
            Every metric your store
            <br />
            <span style={{ color: 'var(--accent)' }}>needs to grow.</span>
          </h1>

          <p className="text-base mb-10 mx-auto" style={{ color: 'var(--text-2)', maxWidth: '480px', lineHeight: 1.7 }}>
            Vela connects to your store and surfaces the numbers that matter — revenue, orders, customers — in a dashboard that loads in milliseconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Link href="/register" className="btn btn-accent" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
              Start free trial →
            </Link>
            <Link href="/login" className="btn btn-ghost" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
              View demo dashboard
            </Link>
          </div>

          {/* ── DASHBOARD PREVIEW MOCKUP ── */}
          <div
            className="mx-auto text-left w-full relative overflow-hidden"
            style={{
              maxWidth: '860px',
              borderRadius: '12px',
              border: '1px solid rgba(99,102,241,0.3)',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.06), 0 28px 80px -16px rgba(0,0,0,0.85)',
              background: 'var(--surface)',
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center gap-3 px-4 py-2.5"
              style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}
            >
              {/* Traffic lights */}
              <div className="flex gap-1.5 shrink-0">
                {['#ef4444','#eab308','#22c55e'].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.85 }} />
                ))}
              </div>
              {/* URL bar */}
              <div className="flex flex-1 justify-center">
                <div
                  className="flex items-center gap-1.5 px-2.5 rounded-md"
                  style={{
                    height: '22px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                    maxWidth: '210px',
                    width: '100%',
                  }}
                >
                  <svg viewBox="0 0 14 14" width="9" height="9" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
                    <path d="M4.5 7a5.5 5.5 0 0 0 5 0M7 1.5v11M1.5 7h11" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9"/>
                  </svg>
                  <span style={{ fontSize: '0.55rem', color: 'var(--text-3)', letterSpacing: '0.01em' }}>
                    app.vela.io/dashboard
                  </span>
                </div>
              </div>
              <div className="w-12 shrink-0" />
            </div>

            {/* Body: sidebar + main */}
            <div className="flex">

              {/* Icon sidebar — sm+ only */}
              <div
                className="hidden sm:flex flex-col items-center gap-1.5 py-3 px-1.5 shrink-0"
                style={{ width: '44px', borderRight: '1px solid var(--border)', background: 'rgba(0,0,0,0.18)' }}
              >
                {SIDEBAR_ICONS.map((d, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: i === 0 ? 'rgba(99,102,241,0.15)' : 'transparent',
                      border: i === 0 ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                    }}
                  >
                    <svg viewBox="0 0 16 16" width="13" height="13">
                      <path d={d} fill={i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.22)'} />
                    </svg>
                  </div>
                ))}
              </div>

              {/* Main content area */}
              <div className="flex-1 p-3 flex flex-col gap-2.5 min-w-0">

                {/* Dashboard header row */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                      Overview
                    </p>
                    <p style={{ fontSize: '0.5rem', color: 'var(--text-3)', marginTop: '1px' }}>
                      Last 30 days · updated just now
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div
                      className="flex items-center px-2 rounded"
                      style={{ height: '20px', background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: '0.48rem', color: 'var(--text-3)' }}
                    >
                      Jun 1 – Jun 30
                    </div>
                    <div
                      className="flex items-center px-2 rounded"
                      style={{ height: '20px', background: 'var(--accent)', fontSize: '0.48rem', color: 'white', fontWeight: 700 }}
                    >
                      Export
                    </div>
                  </div>
                </div>

                {/* KPI Cards — 2 cols mobile, 4 cols sm+ */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {KPI_CARDS.map(s => {
                    const pts    = sparkPoints(s.spark);
                    const fillPts = `0,26 ${pts} 52,26`;
                    const gradId  = `sg${s.label.replace(/[^a-zA-Z]/g, '')}`;
                    const color   = s.up ? '#22c55e' : '#ef4444';
                    const badgeBg = s.up ? 'rgba(34,197,94,0.1)'  : 'rgba(239,68,68,0.1)';
                    const badgeBd = s.up ? 'rgba(34,197,94,0.22)' : 'rgba(239,68,68,0.22)';
                    return (
                      <div
                        key={s.label}
                        className="rounded-lg relative overflow-hidden"
                        style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '10px 10px 8px' }}
                      >
                        {/* Label + trend badge */}
                        <div className="flex items-start justify-between gap-1 mb-2">
                          <p style={{ fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-3)', lineHeight: 1 }}>
                            {s.label}
                          </p>
                          <span style={{
                            fontSize: '0.47rem', padding: '1.5px 4px', borderRadius: '4px',
                            fontWeight: 700, whiteSpace: 'nowrap',
                            background: badgeBg, color, border: `1px solid ${badgeBd}`,
                          }}>
                            {s.trend}
                          </span>
                        </div>
                        {/* Value */}
                        <p style={{
                          fontSize: 'clamp(0.8rem, 2vw, 1.05rem)',
                          fontWeight: 800, color: 'var(--text)',
                          letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '4px',
                        }}>
                          {s.val}
                        </p>
                        {/* Sub-label */}
                        <p style={{ fontSize: '0.45rem', color: 'var(--text-3)' }}>{s.sub}</p>

                        {/* Sparkline — bottom-right corner */}
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '52px', height: '26px', opacity: 0.45 }}>
                          <svg viewBox="0 0 52 26" preserveAspectRatio="none" width="52" height="26">
                            <defs>
                              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%"   stopColor={color} stopOpacity="0.28"/>
                                <stop offset="100%" stopColor={color} stopOpacity="0"/>
                              </linearGradient>
                            </defs>
                            <polygon points={fillPts} fill={`url(#${gradId})`} />
                            <polyline
                              points={pts}
                              fill="none"
                              stroke={color}
                              strokeWidth="1.5"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Revenue chart */}
                <div className="rounded-lg overflow-hidden" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>

                  {/* Chart header */}
                  <div
                    className="flex items-center justify-between px-3 py-2"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                      <p style={{ fontSize: '0.58rem', fontWeight: 600, color: 'var(--text)' }}>Revenue over time</p>
                    </div>
                    <div className="flex gap-0.5">
                      {['7D','30D','90D'].map((t, i) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.47rem', padding: '1.5px 5px', borderRadius: '3px',
                            background: i === 1 ? 'var(--accent)' : 'transparent',
                            color: i === 1 ? 'white' : 'var(--text-3)',
                            fontWeight: i === 1 ? 700 : 400,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Chart body */}
                  <div className="px-3 pt-2 pb-2.5">
                    <div className="flex gap-1.5" style={{ height: '68px' }}>
                      {/* Y-axis labels */}
                      <div className="flex flex-col justify-between shrink-0" style={{ width: '22px' }}>
                        {['$80k', '$40k', '$0'].map(l => (
                          <span key={l} style={{ fontSize: '0.37rem', color: 'var(--text-3)', textAlign: 'right', display: 'block' }}>
                            {l}
                          </span>
                        ))}
                      </div>
                      {/* Bars */}
                      <div className="flex items-end gap-px flex-1">
                        {BAR_DATA.map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm"
                            style={{
                              height: `${h}%`,
                              background: i === BAR_DATA.length - 1
                                ? 'var(--accent)'
                                : `rgba(99,102,241,${(0.12 + (h / 100) * 0.38).toFixed(2)})`,
                              minWidth: '2px',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    {/* X-axis labels */}
                    <div className="flex justify-between mt-1" style={{ paddingLeft: '26px' }}>
                      {['Jun 1','Jun 9','Jun 17','Jun 24','Jun 30'].map(l => (
                        <span key={l} style={{ fontSize: '0.37rem', color: 'var(--text-3)' }}>{l}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom fade — implies more content below */}
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '30px',
                background: 'linear-gradient(to top, var(--surface), transparent)',
                pointerEvents: 'none',
              }}
            />
          </div>
          {/* ── END DASHBOARD PREVIEW ── */}

        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="label mb-3">Features</p>
            <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text)' }}>
              Built for serious sellers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(f => (
              <div key={f.title} className="surface p-6 transition-all duration-200 hover:border-zinc-700">
                <p className="text-xl mb-4" style={{ color: 'var(--accent)' }}>{f.icon}</p>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="label mb-3">Pricing</p>
            <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text)' }}>
              Simple, transparent pricing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map(p => (
              <div key={p.name} className="surface p-6 flex flex-col" style={{ borderColor: p.accent ? 'var(--accent)' : undefined, background: p.accent ? 'rgba(99,102,241,0.04)' : undefined, position: 'relative' }}>
                {p.accent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>
                    Most popular
                  </div>
                )}
                <div className="mb-5">
                  <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{p.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="num font-semibold" style={{ fontSize: '2rem', color: 'var(--text)' }}>{p.price}</span>
                    <span className="text-xs" style={{ color: 'var(--text-3)' }}>{p.period}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{p.desc}</p>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
                      <span style={{ color: 'var(--accent)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`btn text-xs justify-center ${p.accent ? 'btn-accent' : 'btn-ghost'}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ background: 'var(--accent)' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-full h-full p-0.5"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Vela</span>
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>— E-commerce Analytics</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>© {new Date().getFullYear()} Vela Analytics. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}