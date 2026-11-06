import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  UserCheck,
  Building2,
  FileText,
  Image,
  Inbox,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
  ChevronRight,
  HeartPulse,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Badge } from '../../components/ui/Badge';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const { user, logout } = useAdminAuth();

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Appointments', path: '/admin/appointments', icon: CalendarCheck, badge: 'Active' },
    { name: 'Doctors Management', path: '/admin/doctors', icon: UserCheck },
    { name: 'Departments', path: '/admin/departments', icon: Building2 },
    { name: 'Health Blog CMS', path: '/admin/blogs', icon: FileText },
    { name: 'Gallery Media', path: '/admin/gallery', icon: Image },
    { name: 'Patient Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 h-full bg-navy-950 text-slate-300 flex flex-col border-r border-white/[0.08] shrink-0 select-none">
      {/* 1. Hospital Branding */}
      <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3 group" onClick={onCloseMobile}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-medical-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-medical-900/30 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight block">
              Janhit Portal
            </span>
            <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">
              Admin & Triage
            </span>
          </div>
        </Link>
      </div>

      {/* 2. User Info Card */}
      {user && (
        <div className="px-5 py-4 bg-navy-900/50 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-medical-500/20 text-medical-400 font-bold flex items-center justify-center text-sm border border-medical-500/30">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-white block truncate">
                {user.name}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant="accent" className="text-[9px] px-1.5 py-0 uppercase font-semibold">
                  {user.role}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-medical-600 text-white shadow-sm shadow-medical-900/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 4. Bottom Controls */}
      <div className="p-3 border-t border-white/[0.08] space-y-1.5">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
