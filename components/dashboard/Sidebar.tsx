'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';

const NAV = [
  { href: '/dashboard',           label: 'Overview',   icon: '▦' },
  { href: '/dashboard/orders',    label: 'Orders',     icon: '◧' },
  { href: '/dashboard/customers', label: 'Customers',  icon: '◎' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <aside className="flex flex-col" style={{
      width: '220px',
      minHeight: '100vh',
      background: 'var(--bg-2)',
      borderRight: '1px solid var(--border)',
      padding: '16px 12px',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-6 h-6 rounded" style={{ background: 'var(--accent)' }}>
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full p-1"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
        </div>
        <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Vela</span>
        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent)', fontSize: '0.6rem', marginLeft: 'auto' }}>Beta</span>
      </div>

      {/* Nav section */}
      <div className="mb-2">
        <p className="label px-2 mb-2">Main</p>
        <nav className="space-y-0.5">
          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`nav-item ${active ? 'active' : ''}`}>
                <span style={{ fontSize: '0.9rem', width: '16px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
                {active && <span className="ml-auto w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px' }}>
        <button onClick={logout} className="nav-item w-full text-left" style={{ color: 'var(--text-3)' }}>
          <span style={{ fontSize: '0.9rem', width: '16px', textAlign: 'center' }}>→</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
