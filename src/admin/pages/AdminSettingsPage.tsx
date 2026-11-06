import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(adminService.getSettings());
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminService.saveSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Hospital System & Global Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure hospital emergency helplines, address metadata, consultation hours, and public portal status.
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Website settings have been successfully updated and recorded in the audit log.</span>
        </div>
      )}

      {/* 2. Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hospital Branding & Names */}
        <Card className="p-5 sm:p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Hospital Branding (Bilingual)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Hospital Official Name (English)
              </label>
              <input
                type="text"
                value={settings.hospitalNameEn || ''}
                onChange={(e) => setSettings({ ...settings, hospitalNameEn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Hospital Official Name (Hindi / हिन्दी)
              </label>
              <input
                type="text"
                value={settings.hospitalNameHi || ''}
                onChange={(e) => setSettings({ ...settings, hospitalNameHi: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </Card>

        {/* Emergency & Helplines */}
        <Card className="p-5 sm:p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Contact Numbers & Emergency Dispatch
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 text-emergency-600 dark:text-emergency-400">
                24/7 Emergency Hotline (Toll-Free)
              </label>
              <input
                type="text"
                value={settings.emergencyPhone || ''}
                onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-emergency-300 dark:border-emergency-800 text-slate-900 dark:text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                General Hospital Reception Phone
              </label>
              <input
                type="text"
                value={settings.generalPhone || ''}
                onChange={(e) => setSettings({ ...settings, generalPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Patient Support Email
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                WhatsApp Desk Number
              </label>
              <input
                type="text"
                value={settings.socialLinks?.whatsapp || '+919876543210'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, whatsapp: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>
        </Card>

        {/* Operating Hours & Physical Address */}
        <Card className="p-5 sm:p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Timings & Campus Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                OPD Consultation Hours (English)
              </label>
              <input
                type="text"
                value={settings.opdHoursEn || ''}
                onChange={(e) => setSettings({ ...settings, opdHoursEn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                OPD Consultation Hours (Hindi / हिन्दी)
              </label>
              <input
                type="text"
                value={settings.opdHoursHi || ''}
                onChange={(e) => setSettings({ ...settings, opdHoursHi: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Official Campus Address
              </label>
              <input
                type="text"
                value={settings.addressEn || ''}
                onChange={(e) => setSettings({ ...settings, addressEn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
            className="px-8"
          >
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AdminSettingsPage;
