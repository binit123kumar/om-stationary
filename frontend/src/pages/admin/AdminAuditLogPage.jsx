import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { adminHeaders, getAuditLog } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { formatDateTime } from '../../utils/formatDate.js';

export function AdminAuditLogPage({user,onLogout}) { const [rows,setRows]=useState([]); const [error,setError]=useState(''); const [loading,setLoading]=useState(true); useEffect(()=>{getAuditLog(adminHeaders(readSession())).then(setRows).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]); return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Audit log</h1><p>Recent administrative actions recorded by the server.</p></div>{error&&<p role="alert" className="form-error">{error}</p>}<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{key:'time',label:'Time'},{key:'admin',label:'Admin'},{key:'action',label:'Action'},{key:'entity',label:'Entity'},{key:'id',label:'Record'}]} empty="No audit entries are available." renderRow={r=><tr key={r.id||r.Id}><td>{formatDateTime(r.createdAt||r.CreatedAt)}</td><td>{r.adminEmail||r.AdminEmail}</td><td>{r.action||r.Action}</td><td>{r.entityType||r.EntityType}</td><td>{r.entityId||r.EntityId}</td></tr>} /></AdminLayout>; }
