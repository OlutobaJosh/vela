'use client';
import { useEffect, useState, useMemo } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import { createClient } from '@/lib/supabase-client';
import { Customer } from '@/lib/types';

const PER_PAGE = 15;

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'total_spent' | 'orders_count' | 'created_at'>('total_spent');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('customers').select('*').order('total_spent', { ascending: false })
      .then(({ data }) => { setCustomers(data ?? []); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return [...customers]
      .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (b[sort] as number) - (a[sort] as number));
  }, [customers, search, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalLTV   = customers.reduce((s, c) => s + c.total_spent, 0);
  const avgLTV     = customers.length ? totalLTV / customers.length : 0;
  const topCountry = customers.reduce((acc: Record<string,number>, c) => { acc[c.country] = (acc[c.country]||0)+1; return acc; }, {});
  const topC       = Object.entries(topCountry).sort((a,b) => b[1]-a[1])[0]?.[0] ?? '—';

  return (
    <>
      <TopBar title="Customers" />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Total Customers', val: customers.length.toLocaleString() },
            { label: 'Total LTV',       val: `$${totalLTV.toLocaleString('en', { maximumFractionDigits: 0 })}` },
            { label: 'Avg LTV',         val: `$${avgLTV.toFixed(0)}` },
            { label: 'Top Country',     val: topC },
          ].map(s => (
            <div key={s.label} className="surface px-4 py-3">
              <p className="label mb-1">{s.label}</p>
              <p className="num text-sm font-semibold" style={{ color: 'var(--text)' }}>{s.val}</p>
            </div>
          ))}
        </div>

        <div className="surface overflow-hidden">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 p-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <input type="text" placeholder="Search customers, country…" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="field" style={{ maxWidth: '260px' }} />
            <div className="flex items-center gap-2">
              <span className="label">Sort by:</span>
              {[
                { key: 'total_spent',  label: 'Spend' },
                { key: 'orders_count', label: 'Orders' },
                { key: 'created_at',   label: 'Newest' },
              ].map(s => (
                <button key={s.key} onClick={() => setSort(s.key as typeof sort)}
                  className="btn text-xs"
                  style={{
                    background: sort === s.key ? 'var(--accent)' : 'var(--surface-2)',
                    color: sort === s.key ? 'white' : 'var(--text-3)',
                    border: '1px solid var(--border-2)',
                    padding: '5px 10px',
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Customer','Email','Country','Orders','Total Spent','Joined'].map(h => (
                      <th key={h} className="label text-left" style={{ padding: '10px 16px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-12" style={{ color: 'var(--text-3)' }}>No customers found.</td></tr>
                  ) : paginated.map((c, i) => (
                    <tr key={c.id} style={{ borderBottom: i < paginated.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '10px 16px' }}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(99,102,241,0.2)' }}>
                            {c.name.charAt(0)}
                          </div>
                          <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>{c.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="text-xs" style={{ color: 'var(--text-3)' }}>{c.email}</span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="text-xs" style={{ color: 'var(--text-2)' }}>{c.country}</span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="num text-xs" style={{ color: 'var(--text-2)' }}>{c.orders_count}</span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="num text-xs font-semibold" style={{ color: 'var(--text)' }}>${c.total_spent.toFixed(0)}</span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="num text-xs" style={{ color: 'var(--text-3)' }}>
                          {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
              <span className="num text-xs" style={{ color: 'var(--text-3)' }}>{((page-1)*PER_PAGE)+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}</span>
              <div className="flex gap-1.5">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="btn btn-ghost" style={{ padding:'4px 10px', fontSize:'0.75rem' }}>← Prev</button>
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages} className="btn btn-ghost" style={{ padding:'4px 10px', fontSize:'0.75rem' }}>Next →</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
