import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  CalendarCheck,
  Clock,
  FileText,
  Activity,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { adminService, DashboardMetrics, AdminAppointment, AdminEnquiry, AdminAuditEntry } from '../services/adminService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>(adminService.getDashboardMetrics());
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditEntry[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    setMetrics(adminService.getDashboardMetrics());
    setAppointments(adminService.getAppointments().slice(0, 5));
    setEnquiries(adminService.getEnquiries().slice(0, 5));
    setAuditLogs(adminService.getAuditLogs().slice(0, 6));
    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickConfirm = (id: string) => {
    adminService.updateAppointmentStatus(id, 'CONFIRMED', 'Quick-confirmed from dashboard');
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Hospital Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time clinical throughput, patient triage, and OPD consultation schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />}
          >
            Refresh Data
          </Button>
          <Link to="/admin/appointments">
            <Button variant="primary" size="sm" leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}>
              Manage Bookings
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Doctors */}
        <Card className="p-4 sm:p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block truncate">
              Specialist Doctors
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              {metrics.totalDoctors}
            </span>
          </div>
        </Card>

        {/* Clinical Departments */}
        <Card className="p-4 sm:p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block truncate">
              Departments
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              {metrics.totalDepartments}
            </span>
          </div>
        </Card>

        {/* Pending Appointments */}
        <Card className="p-4 sm:p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block truncate">
              Pending Triage
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                {metrics.pendingAppointments}
              </span>
              <span className="text-[10px] text-slate-400">of {metrics.totalAppointments} total</span>
            </div>
          </div>
        </Card>

        {/* Bed Occupancy / Enquiries */}
        <Card className="p-4 sm:p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block truncate">
              Bed Occupancy
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
                {metrics.bedOccupancyPercent}%
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Stable</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. Middle Section: Upcoming Appointments Table & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Appointments Feed (2 Cols) */}
        <Card className="lg:col-span-2 p-5 sm:p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.06] mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-navy-950 dark:text-white">
                Recent Appointment Bookings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Patient requests awaiting confirmation or recently scheduled
              </p>
            </div>
            <Link
              to="/admin/appointments"
              className="text-xs font-bold text-medical-600 dark:text-medical-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                      {apt.referenceNumber}
                    </span>
                    <Badge
                      variant={
                        apt.status === 'CONFIRMED'
                          ? 'success'
                          : apt.status === 'PENDING'
                          ? 'warning'
                          : 'accent'
                      }
                      className="text-[10px] px-2 py-0.5 uppercase font-semibold"
                    >
                      {apt.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-navy-950 dark:text-white mt-1">
                    {apt.patientName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {apt.doctorName} • {apt.departmentName}
                  </p>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1 block">
                    🗓️ {apt.appointmentDate} at {apt.preferredTime}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {apt.status === 'PENDING' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleQuickConfirm(apt.id)}
                      className="text-xs px-3 py-1.5"
                    >
                      Confirm Slot
                    </Button>
                  )}
                  <Link to="/admin/appointments">
                    <Button variant="outline" size="sm" className="text-xs px-2.5 py-1.5">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column: Quick Shortcuts & Patient Enquiries (1 Col) */}
        <div className="space-y-6">
          {/* Quick Shortcuts */}
          <Card className="p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Administrative Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/admin/doctors"
                className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 hover:bg-medical-50 dark:hover:bg-medical-950/40 border border-slate-200/80 dark:border-white/[0.04] transition-colors flex flex-col items-center text-center gap-1.5"
              >
                <Users className="w-5 h-5 text-medical-600" />
                <span className="font-semibold text-navy-950 dark:text-white">Doctors</span>
              </Link>

              <Link
                to="/admin/departments"
                className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200/80 dark:border-white/[0.04] transition-colors flex flex-col items-center text-center gap-1.5"
              >
                <Building2 className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-navy-950 dark:text-white">Departments</span>
              </Link>

              <Link
                to="/admin/blogs"
                className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200/80 dark:border-white/[0.04] transition-colors flex flex-col items-center text-center gap-1.5"
              >
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-navy-950 dark:text-white">Articles</span>
              </Link>

              <Link
                to="/admin/settings"
                className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200/80 dark:border-white/[0.04] transition-colors flex flex-col items-center text-center gap-1.5"
              >
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-navy-950 dark:text-white">Settings</span>
              </Link>
            </div>
          </Card>

          {/* Recent Contact Enquiries */}
          <Card className="p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recent Inquiries ({metrics.newEnquiries} New)
              </h3>
              <Link
                to="/admin/enquiries"
                className="text-[11px] font-bold text-medical-600 dark:text-medical-400 hover:underline"
              >
                View
              </Link>
            </div>

            <div className="space-y-2.5">
              {enquiries.slice(0, 3).map((enq) => (
                <div
                  key={enq.id}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200/60 dark:border-white/[0.04] text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-950 dark:text-white truncate">
                      {enq.fullName}
                    </span>
                    <Badge
                      variant={enq.status === 'NEW' ? 'warning' : 'success'}
                      className="text-[9px] px-1.5 py-0"
                    >
                      {enq.status}
                    </Badge>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {enq.subject}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 4. Bottom Section: Audit Log Activity Trail */}
      <Card className="p-5 sm:p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06] mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-navy-950 dark:text-white">
              System Audit Trail & Security Events
            </h2>
          </div>
          <Link
            to="/admin/audit-logs"
            className="text-xs font-bold text-medical-600 dark:text-medical-400 hover:underline"
          >
            Full Audit Log
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between text-xs gap-3">
              <div className="min-w-0">
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400 block truncate">
                  {log.action}
                </span>
                <span className="text-slate-600 dark:text-slate-300 line-clamp-1">
                  {log.details}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 shrink-0">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
export default AdminDashboardPage;
