'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) setError(err.message);
    else router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(99,102,241,0.07), transparent)' }} />

      <div className="relative w-full max-w-sm anim-up">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-7 h-7 rounded" style={{ background: 'var(--accent)' }}>
            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full p-1.5"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
          </div>
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Vela</span>
        </div>

        <div className="surface p-7">
          <h1 className="font-semibold text-lg mb-1 tracking-tight" style={{ color: 'var(--text)' }}>Welcome back</h1>
          <p className="text-xs mb-6" style={{ color: 'var(--text-3)' }}>Sign in to your Vela dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="label block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@store.com" required className="field" />
            </div>
            <div>
              <label className="label block mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required className="field" />
            </div>

            {error && (
              <div className="text-xs p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.15)' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-accent w-full justify-center" style={{ marginTop: '4px' }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 rounded-full animate-spin" style={{ borderColor: 'white', borderTopColor: 'transparent' }} />
                  Signing in…
                </span>
              ) : 'Sign in →'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: 'var(--text-3)' }}>
          No account?{' '}
          <Link href="/register" className="transition-colors hover:text-white" style={{ color: 'var(--accent)' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
