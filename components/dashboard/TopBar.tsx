'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function TopBar({ title }: { title: string }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? '');
    });
  }, []);

  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)', padding: '0 24px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <h1 className="font-semibold text-sm tracking-tight" style={{ color: 'var(--text)' }}>{title}</h1>
      <div className="flex items-center gap-3">
        <div className="w-px h-4" style={{ background: 'var(--border-2)' }} />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>
            {email.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs hidden sm:block" style={{ color: 'var(--text-3)' }}>{email}</span>
        </div>
      </div>
    </header>
  );
}
