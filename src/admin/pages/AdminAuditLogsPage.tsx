import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { adminService, AdminAuditEntry } from '../services/adminService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs] = useState<AdminAuditEntry[]>(adminService.getAuditLogs());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter((log) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      log.action.toLowerCase().includes(q) ||
      log.entity.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      log.userEmail.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Security & Audit Activity Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Immutable system logs recording administrative modifications, appointment state changes, and staff access.
          </p>
        </div>
      </div>

      {/* 2. Search */}
      <Card className="p-4 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit trail by action, entity, user email, or event details..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500"
          />
        </div>
      </Card>

      {/* 3. Log Records Table */}
      <Card className="overflow-hidden bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-navy-950/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/[0.06] uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Admin Staff</th>
                <th className="px-4 py-3">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-navy-800/40 transition-colors">
                  <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400 text-xs">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="neutral" className="text-[10px] px-2 py-0">
                      {log.entity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {log.userEmail}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400 max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default AdminAuditLogsPage;
