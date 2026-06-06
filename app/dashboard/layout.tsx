'use client';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 49, backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* ── Sidebar — desktop: static, mobile: slide-in ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s cubic-bezier(0.32,0.72,0,1)',
      }}
        className="block md:hidden"
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop sidebar — always visible */}
      <div className="hidden md:block" style={{ flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Mobile top bar */}
        <div className="md:hidden" style={{
          height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)',
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '6px', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text)', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text)', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '12px', height: '1.5px', background: 'var(--text)', borderRadius: '2px' }} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded" style={{ background: 'var(--accent)' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-full h-full p-1"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>Vela</span>
          </div>

          <div style={{ width: '30px' }} />
        </div>

        {children}
      </div>
    </div>
  );
}