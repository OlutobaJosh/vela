'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';

const NAV = [
  { href: '/dashboard',           label: 'Overview',  icon: '▦' },
  { href: '/dashboard/orders',    label: 'Orders',    icon: '◧' },
  { href: '/dashboard/customers', label: 'Customers', icon: '◎' },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <aside style={{
      width: '220px', height: '100vh', background: 'var(--bg-2)',
      borderRight: '1px solid var(--border)', padding: '16px 12px',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Logo row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 4px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--accent)' }}>
            <svg viewBox="0 0 24 24" fill="white" style={{ width: '100%', height: '100%', padding: '4px' }}><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>Vela</span>
          <span style={{ fontSize: '0.6rem', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: 'rgba(99,102,241,0.15)', color: 'var(--accent)', letterSpacing: '0.05em' }}>Beta</span>
        </div>

        {/* Close button — mobile only */}
        {onClose && (
          <button onClick={onClose} style={{ background: 'var(--bg-3)', border: 'none', cursor: 'pointer', width: '26px', height: '26px', borderRadius: '6px', color: 'var(--text-3)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
        )}
      </div>

      {/* Nav */}
      <div style={{ marginBottom: '8px' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '0 8px', marginBottom: '6px' }}>Main</p>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href} href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '8px',
                  fontSize: '0.825rem', fontWeight: 500, textDecoration: 'none',
                  background: active ? 'var(--accent-glow)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text-3)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'var(--bg-3)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; } }}
                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; } }}
              >
                <span style={{ fontSize: '0.85rem', width: '16px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
                {active && <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div style={{ flex: 1 }} />

      {/* Sign out */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
        <button
          onClick={logout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
            padding: '9px 12px', borderRadius: '8px',
            fontSize: '0.825rem', fontWeight: 500,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-3)', fontFamily: 'inherit', textAlign: 'left',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget).style.background = 'var(--bg-3)'; (e.currentTarget).style.color = 'var(--text)'; }}
          onMouseLeave={e => { (e.currentTarget).style.background = 'none'; (e.currentTarget).style.color = 'var(--text-3)'; }}
        >
          <span style={{ fontSize: '0.85rem', width: '16px', textAlign: 'center' }}>→</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}