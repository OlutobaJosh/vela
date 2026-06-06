'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function TopBar({ title }: { title: string }) {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ''));
  }, []);

  return (
    <header style={{
      borderBottom: '1px solid var(--border)', background: 'var(--bg-2)',
      padding: '0 clamp(16px,3vw,24px)', height: '52px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <h1 style={{ fontWeight: 600, fontSize: 'clamp(0.875rem,2vw,1rem)', color: 'var(--text)', letterSpacing: '-0.01em' }}>{title}</h1>
      {email && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', display: 'none' }} className="sm:inline">{email}</span>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
            {email.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </header>
  );
}