import React from 'react';
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from 'recharts';

export default function AdminCharts({ analytics }) {
  const daily = analytics.daily.map(row => ({
    ...row,
    date: new Date(row.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }));

  return <div className="admin-chart-section">
    <div className="rowhead"><small>ANALYTICS</small><h2>Sales Overview</h2></div>
    <div className="admin-chart-grid">
      <div className="admin-chart-card">
        <h3>Daily Orders &amp; Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={daily}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="Orders" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue (₹)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {analytics.orderStatus?.length > 0 && <div className="admin-chart-card">
        <h3>Order Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.orderStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8b5cf6" name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>}
    </div>
  </div>;
}
