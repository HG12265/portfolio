import React, { useState, useEffect } from 'react';
import { FaHistory, FaSearch } from 'react-icons/fa';
import api from '../services/api';

export const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/admin/dashboard/summary');
        if (res.data && res.data.data) {
          setLogs(res.data.data.recentActivity || []);
        }
      } catch (err) {
        console.error('Failed to fetch activity logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-textLight">System Activity & Audit Trail</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Audit history tracking administrator logins, content additions, updates, and uploads.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textMuted" />
          <input
            type="text"
            placeholder="Search audit logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
          />
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/60 text-[11px] font-mono uppercase text-textMuted">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Admin User</th>
                <th className="py-3 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-body">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-textMuted shrink-0 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primaryBlue/20 text-accentSky uppercase">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-textLight">{log.module}</td>
                  <td className="py-3.5 px-4 text-textMuted">{log.details}</td>
                  <td className="py-3.5 px-4 font-mono text-accentSky">{log.admin_name || 'gowtham_admin'}</td>
                  <td className="py-3.5 px-4 font-mono text-textMuted">{log.ip_address}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-xs font-mono text-textMuted">No audit logs found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
