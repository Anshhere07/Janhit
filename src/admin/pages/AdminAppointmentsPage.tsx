import React, { useState } from 'react';
import {
  Search,
  FileEdit,
  X,
} from 'lucide-react';
import { adminService, AdminAppointment } from '../services/adminService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AdminAppointment[]>(adminService.getAppointments());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal State for Action
  const [selectedApt, setSelectedApt] = useState<AdminAppointment | null>(null);
  const [editStatus, setEditStatus] = useState<AdminAppointment['status']>('CONFIRMED');
  const [editNotes, setEditNotes] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reloadData = () => {
    setAppointments(adminService.getAppointments());
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'ALL' || apt.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      apt.patientName.toLowerCase().includes(q) ||
      apt.mobileNumber.includes(q) ||
      apt.referenceNumber.toLowerCase().includes(q) ||
      apt.doctorName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleOpenEdit = (apt: AdminAppointment) => {
    setSelectedApt(apt);
    setEditStatus(apt.status);
    setEditNotes(apt.adminNotes || '');
    setNewDate(apt.appointmentDate);
    setNewTime(apt.preferredTime);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApt) return;

    if (editStatus === 'RESCHEDULED') {
      adminService.rescheduleAppointment(selectedApt.id, newDate, newTime, editNotes);
    } else {
      adminService.updateAppointmentStatus(selectedApt.id, editStatus, editNotes);
    }

    reloadData();
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: AdminAppointment['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge variant="success">Confirmed</Badge>;
      case 'PENDING':
        return <Badge variant="warning">Pending Triage</Badge>;
      case 'RESCHEDULED':
        return <Badge variant="medical">Rescheduled</Badge>;
      case 'COMPLETED':
        return <Badge variant="neutral">Completed</Badge>;
      case 'CANCELLED':
        return <Badge variant="neutral">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Patient Appointment Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review outpatient booking requests, confirm clinical chambers, reschedule, and manage OPD queues.
          </p>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <Card className="p-4 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Patient Name, Phone, Reference Number (APT-XXXX) or Doctor..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'PENDING', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-medical-600 text-white'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* 3. Appointment Records Table / List */}
      <Card className="overflow-hidden bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-navy-950/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/[0.06] uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-4 py-3">Reference / Patient</th>
                <th className="px-4 py-3">Department & Doctor</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No appointments matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 dark:hover:bg-navy-800/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-mono font-bold text-slate-500 dark:text-slate-400 block text-xs">
                        {apt.referenceNumber}
                      </span>
                      <span className="font-bold text-navy-950 dark:text-white block mt-0.5">
                        {apt.patientName}
                      </span>
                      {apt.patientAge && (
                        <span className="text-[11px] text-slate-400 block">
                          Age: {apt.patientAge} • {apt.patientGender || 'Unspecified'}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-navy-900 dark:text-slate-200 block">
                        {apt.doctorName}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">
                        {apt.departmentName}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {apt.appointmentDate}
                      </span>
                      <span className="text-xs text-medical-600 dark:text-medical-400 block font-semibold">
                        {apt.preferredTime}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <a
                        href={`tel:${apt.mobileNumber}`}
                        className="font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-medical-600 block"
                      >
                        {apt.mobileNumber}
                      </a>
                      {apt.email && (
                        <span className="text-[11px] text-slate-400 block truncate max-w-[140px]">
                          {apt.email}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">{getStatusBadge(apt.status)}</td>

                    <td className="px-4 py-3.5 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(apt)}
                        leftIcon={<FileEdit className="w-3.5 h-3.5" />}
                        className="text-xs py-1"
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 4. Update / Reschedule Modal */}
      {isModalOpen && selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="w-full max-w-lg p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-2xl rounded-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
              Update Appointment • {selectedApt.referenceNumber}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Patient: <strong className="text-slate-900 dark:text-white">{selectedApt.patientName}</strong> ({selectedApt.mobileNumber})
            </p>

            <form onSubmit={handleSaveModal} className="mt-5 space-y-4 text-xs sm:text-sm">
              {/* Status Selector */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Appointment Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as AdminAppointment['status'])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                >
                  <option value="PENDING">PENDING (Awaiting Review)</option>
                  <option value="CONFIRMED">CONFIRMED (Slot Approved)</option>
                  <option value="RESCHEDULED">RESCHEDULED (New Date/Time)</option>
                  <option value="COMPLETED">COMPLETED (Consultation Done)</option>
                  <option value="CANCELLED">CANCELLED (Patient / Doctor Unavailable)</option>
                </select>
              </div>

              {/* If Rescheduled, show Date and Time pickers */}
              {editStatus === 'RESCHEDULED' && (
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-medical-50/50 dark:bg-medical-950/30 border border-medical-200 dark:border-medical-800/40">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      New Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      New Time Slot
                    </label>
                    <input
                      type="text"
                      required
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      placeholder="e.g. 11:30 AM"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Internal Admin / Clinical Notes */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Internal Staff Notes / Instructions
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Advised patient to fast 8 hours prior for blood sugar test. Assigned to Chamber OPD-104."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
export default AdminAppointmentsPage;
