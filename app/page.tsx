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

          {/* Dashboard preview mockup */}
          <div className="surface mx-auto text-left overflow-hidden" style={{ maxWidth: '860px', background: 'var(--surface)' }}>
            {/* Fake top bar */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
              <div className="flex gap-1.5">
                {['#ef4444','#eab308','#22c55e'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />)}
              </div>
              <div className="flex-1 h-5 rounded mx-4" style={{ background: 'var(--border-2)', maxWidth: '180px' }} />
            </div>
            {/* Fake dashboard grid */}
            <div className="p-4 grid grid-cols-4 gap-3">
              {[
                { label: 'Revenue', val: '$48,291', trend: '+12.4%', up: true },
                { label: 'Orders',  val: '1,847',   trend: '+8.1%',  up: true },
                { label: 'Customers', val: '924',   trend: '+5.3%',  up: true },
                { label: 'Conv. Rate', val: '3.24%', trend: '-0.2%', up: false },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-lg" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <p className="label mb-2">{s.label}</p>
                  <p className="num font-medium" style={{ fontSize: '1.1rem', color: 'var(--text)' }}>{s.val}</p>
                  <p className={`text-xs num mt-1 ${s.up ? 'trend-up' : 'trend-down'}`}>{s.trend}</p>
                </div>
              ))}
            </div>
            {/* Fake chart */}
            <div className="px-4 pb-4">
              <div className="rounded-lg p-3" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', height: '100px' }}>
                <div className="flex items-end gap-1 h-full pb-2">
                  {[40,55,35,70,60,80,50,75,65,90,72,85,60,95,78,88,70,92,68,85,72,90,80,95,75,88,92,98,85,90].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${h}%`, background: i === 29 ? 'var(--accent)' : 'rgba(99,102,241,0.25)' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
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
