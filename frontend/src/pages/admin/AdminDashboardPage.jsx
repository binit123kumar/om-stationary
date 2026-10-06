// Admin dashboard: real KPIs, charts and recent activity
// from /api/admin/dashboard and /api/admin/analytics.
import { Link } from 'react-router-dom';
import { AdminKpiCard } from '../../components/admin/AdminKpiCard.jsx';
import { AdminChartCard } from '../../components/admin/AdminChartCard.jsx';
import { OrderStatusChart } from '../../components/admin/OrderStatusChart.jsx';
import { RecentOrdersTable } from '../../components/admin/RecentOrdersTable.jsx';
import { SalesChart } from '../../components/admin/SalesChart.jsx';
import { TopProductsTable } from '../../components/admin/TopProductsTable.jsx';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { getAnalytics, getDashboard } from '../../services/adminService.js';
import { adminHeaders } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { useEffect, useState } from 'react';

export function AdminDashboardPage({ user, key, onLogout }) {
  const headers = adminHeaders(readSession(), key);
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [dash, analyticsResponse, ordersResponse] = await Promise.all([
          getDashboard(headers),
          getAnalytics(headers),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders`, { headers })
        ]);
        if (!active) return;
        if (ordersResponse.status === 401) throw new Error('Admin sign-in is required.');
        if (ordersResponse.ok) {
          const data = await ordersResponse.json();
          setOrders(Array.isArray(data) ? data : (data.items || []));
        }
        setDashboard(dash);
        setAnalytics(analyticsResponse);
        setLoading(false);
      } catch (e) {
        if (active) { setError(e.message); setLoading(false); }
      }
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, user?.id]);

  return (
    <AdminLayout user={user} onLogout={onLogout}>
      <div className="pagehead">
        <small>ADMIN PANEL</small>
        <h1>OM Stationary control centre</h1>
        <p>Manage orders, catalogue, stock and delivery for the OM Stationary store.</p>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      {dashboard && (
        <div className="adminstats">
          <AdminKpiCard label="Total orders" value={dashboard.totalOrders} />
          <AdminKpiCard label="Today's orders" value={dashboard.todayOrders} />
          <AdminKpiCard label="Needs action" value={dashboard.openOrders ?? dashboard.pendingOrders} tone="active" />
          <AdminKpiCard label="Delivered" value={dashboard.deliveredOrders} tone="ok" />
          <AdminKpiCard label="Revenue" value={dashboard.revenue} money tone="ok" />
          <AdminKpiCard label="COD outstanding" value={dashboard.codOutstanding} money tone="warn" />
          <AdminKpiCard label="Customers" value={dashboard.customers} />
          <AdminKpiCard label="Low stock" value={dashboard.lowStockProducts} tone={dashboard.lowStockProducts > 0 ? 'bad' : 'default'} />
        </div>
      )}

      {loading
        ? <p className="catalog-state">Loading dashboard...</p>
        : (
          <>
            <div className="admin-chart-grid">
              <AdminChartCard title="Sales" subtitle={analytics ? `Last ${analytics.days} days` : ''}>
                <SalesChart daily={analytics?.daily || []} days={analytics?.days || 14} />
              </AdminChartCard>
              <AdminChartCard title="Orders by status">
                <OrderStatusChart statusRows={analytics?.orderStatus || []} />
              </AdminChartCard>
            </div>
            <div className="admin-chart-grid">
              <AdminChartCard title="Recent orders">
                <RecentOrdersTable orders={orders} />
              </AdminChartCard>
              <AdminChartCard title="Top products" subtitle="By quantity sold">
                <TopProductsTable products={analytics?.topProducts || []} />
              </AdminChartCard>
            </div>
            <div className="listing-tools">
              <Link className="outline" to="/admin/orders">Manage orders</Link>
              <Link className="outline" to="/admin/reports">Open reports</Link>
            </div>
          </>
        )}
    </AdminLayout>
  );
}
