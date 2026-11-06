import React, { useState } from 'react';
import {
  Search,
  Phone,
  Mail,
  FileEdit,
  X,
} from 'lucide-react';
import { adminService, AdminEnquiry } from '../services/adminService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>(adminService.getEnquiries());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal State for Status / Notes
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiry | null>(null);
  const [editStatus, setEditStatus] = useState<AdminEnquiry['status']>('CONTACTED');
  const [staffNotes, setStaffNotes] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reloadData = () => {
    setEnquiries(adminService.getEnquiries());
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus = statusFilter === 'ALL' || enq.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      enq.fullName.toLowerCase().includes(q) ||
      enq.mobileNumber.includes(q) ||
      enq.referenceNumber.toLowerCase().includes(q) ||
      enq.subject.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleOpenEdit = (enq: AdminEnquiry) => {
    setSelectedEnquiry(enq);
    setEditStatus(enq.status);
    setStaffNotes(enq.staffNotes || '');
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    adminService.updateEnquiryStatus(selectedEnquiry.id, editStatus, staffNotes);
    reloadData();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Patient Inquiries & Triage Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track inquiries received via the contact portal, manage staff call-backs, and record patient notes.
          </p>
        </div>
      </div>

      {/* 2. Filters & Search */}
      <Card className="p-4 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by patient name, phone, or subject..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'NEW', 'IN_PROGRESS', 'CONTACTED', 'RESOLVED'].map((st) => (
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

      {/* 3. Inquiries Records List */}
      <div className="space-y-4">
        {filteredEnquiries.map((enq) => (
          <Card
            key={enq.id}
            className="p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4"
          >
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-xs text-slate-500 dark:text-slate-400">
                  {enq.referenceNumber}
                </span>
                <Badge
                  variant={
                    enq.status === 'NEW'
                      ? 'warning'
                      : enq.status === 'RESOLVED'
                      ? 'success'
                      : 'medical'
                  }
                  className="text-[10px] px-2 py-0 uppercase font-semibold"
                >
                  {enq.status}
                </Badge>
                <span className="text-[11px] text-slate-400">
                  {new Date(enq.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-navy-950 dark:text-white">
                  {enq.fullName} • <span className="font-semibold text-slate-500 dark:text-slate-400">{enq.subject}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  "{enq.message}"
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs pt-1">
                <a
                  href={`tel:${enq.mobileNumber}`}
                  className="font-mono font-bold text-slate-800 dark:text-slate-200 hover:text-medical-600 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-medical-500" />
                  <span>{enq.mobileNumber}</span>
                </a>

                {enq.email && (
                  <a
                    href={`mailto:${enq.email}`}
                    className="text-slate-500 dark:text-slate-400 hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{enq.email}</span>
                  </a>
                )}
              </div>

              {enq.staffNotes && (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200/60 dark:border-white/[0.04] text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-teal-600 dark:text-teal-400 block mb-0.5">
                    Staff Follow-up Notes:
                  </span>
                  {enq.staffNotes}
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenEdit(enq)}
              leftIcon={<FileEdit className="w-3.5 h-3.5" />}
              className="text-xs shrink-0 self-end sm:self-center"
            >
              Update Status
            </Button>
          </Card>
        ))}
      </div>

      {/* 4. Update Status Modal */}
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <Card className="w-full max-w-lg p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-2xl rounded-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
              Update Inquiry • {selectedEnquiry.referenceNumber}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Patient: <strong>{selectedEnquiry.fullName}</strong> ({selectedEnquiry.mobileNumber})
            </p>

            <form onSubmit={handleSaveModal} className="mt-5 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Triage Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as AdminEnquiry['status'])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                >
                  <option value="NEW">NEW (Unassigned / Uncontacted)</option>
                  <option value="IN_PROGRESS">IN_PROGRESS (Staff Assigned)</option>
                  <option value="CONTACTED">CONTACTED (Patient Called / Messaged)</option>
                  <option value="RESOLVED">RESOLVED (Inquiry Satisfied)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Staff Notes & Actions Taken
                </label>
                <textarea
                  rows={4}
                  value={staffNotes}
                  onChange={(e) => setStaffNotes(e.target.value)}
                  placeholder="Record summary of telephonic conversation, counselor advice, or dispatched details..."
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
export default AdminEnquiriesPage;
