import React from 'react';
import { Menu, Bell, Shield, Sun, Moon } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useTheme } from '../../hooks/useTheme';

interface AdminHeaderProps {
  onToggleMobile: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleMobile }) => {
  const { user } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-white/[0.08] px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-medical-600 hidden sm:block" />
          <span className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white">
            Hospital Operations Control Center
          </span>
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            System Online
          </span>
        </div>
      </div>

      {/* Right: Theme Toggle, Notifications & Staff Badge */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emergency-500 animate-pulse" />
        </div>

        {/* Staff Profile Pill */}
        {user && (
          <div className="flex items-center gap-2 pl-2 sm:border-l border-slate-200 dark:border-white/[0.08]">
            <div className="w-8 h-8 rounded-full bg-medical-500/20 text-medical-600 dark:text-medical-400 font-bold flex items-center justify-center text-xs border border-medical-500/30">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-navy-950 dark:text-white block leading-tight">
                {user.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                {user.role}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

