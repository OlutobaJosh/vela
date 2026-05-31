'use client';
import { useEffect, useState, useMemo } from 'react';
import TopBar from '@/components/dashboard/TopBar';
import { createClient } from '@/lib/supabase-client';
import { Order } from '@/lib/types';

const PER_PAGE = 15;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('orders').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setOrders(data ?? []); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = !search || o.customer_name.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase()) || o.customer_email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === 'all' || o.status === status;
      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalRevenue = filtered.filter(o => o.status === 'completed').reduce((s, o) => s + o.amount, 0);

  return (
    <>
      <TopBar title="Orders" />
      <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Showing', val: filtered.length.toString() + ' orders' },
            { label: 'Revenue', val: `$${totalRevenue.toLocaleString('en', { maximumFractionDigits: 0 })}` },
            { label: 'Completed', val: filtered.filter(o => o.status === 'completed').length.toString() },
            { label: 'Pending',  val: filtered.filter(o => o.status === 'pending').length.toString() },
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
            <input
              type="text" placeholder="Search orders, customers…" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="field" style={{ maxWidth: '280px' }}
            />
            <div className="flex gap-2 flex-wrap">
              {['all','completed','pending','refunded','cancelled'].map(s => (
                <button key={s} onClick={() => { setStatus(s); setPage(1); }}
                  className="btn text-xs capitalize"
                  style={{
                    background: status === s ? 'var(--accent)' : 'var(--surface-2)',
                    color: status === s ? 'white' : 'var(--text-3)',
                    border: '1px solid var(--border-2)',
                    padding: '5px 12px',
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Order ID','Customer','Product','Category','Date','Amount','Status'].map(h => (
                      <th key={h} className="label text-left" style={{ padding: '10px 16px', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-12" style={{ color: 'var(--text-3)' }}>No orders found.</td></tr>
                  ) : paginated.map((o, i) => (
                    <tr key={o.id} style={{ borderBottom: i < paginated.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="num text-xs" style={{ color: 'var(--text-3)' }}>{o.id.slice(0,8)}…</span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>{o.customer_name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-3)' }}>{o.customer_email}</p>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="text-xs" style={{ color: 'var(--text-2)' }}>{o.product}</span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="text-xs" style={{ color: 'var(--text-3)' }}>{o.category}</span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="num text-xs" style={{ color: 'var(--text-3)' }}>
                          {new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className="num text-xs font-semibold" style={{ color: 'var(--text)' }}>${o.amount.toFixed(2)}</span>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span className={`badge badge-${o.status}`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
              <span className="num text-xs" style={{ color: 'var(--text-3)' }}>
                {((page-1)*PER_PAGE)+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}
              </span>
              <div className="flex gap-1.5">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                  className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>← Prev</button>
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}
                  className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Next →</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
