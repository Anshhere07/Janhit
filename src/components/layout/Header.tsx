import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, CalendarCheck, PhoneCall, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { MAIN_NAV_ITEMS, HOSPITAL_INFO, NavItem } from '../../utils/constants';
import { useLanguage } from '../../hooks/useLanguage';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { cn } from '../../utils/cn';

interface HeaderProps {
  onOpenAppointmentModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAppointmentModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownKey, setActiveDropdownKey] = useState<string | null>(null);
  const [mobileExpandedKeys, setMobileExpandedKeys] = useState<Record<string, boolean>>({});
  const { isScrolled } = useScrollPosition(15);
  const { t, language } = useLanguage();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown and drawer when route changes
  useEffect(() => {
    setActiveDropdownKey(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside to dismiss dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdownKey(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keyboard navigation: Escape key closes dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdownKey(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMobileSubmenu = (key: string) => {
    setMobileExpandedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getLocalizedPath = (path: string): string => {
    if (location.pathname.startsWith('/hi/') || location.pathname === '/hi') {
      return path === '/' ? '/hi' : `/hi${path}`;
    }
    if (location.pathname.startsWith('/en/') || location.pathname === '/en') {
      return path === '/' ? '/en' : `/en${path}`;
    }
    return path;
  };

  const isItemActive = (item: NavItem): boolean => {
    const targetPath = getLocalizedPath(item.path);
    if (location.pathname === targetPath || location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some((child) => {
        const childPath = getLocalizedPath(child.path);
        return location.pathname === childPath || location.pathname === child.path;
      });
    }
    return false;
  };

  return (
    <header
      ref={dropdownRef}
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300 glass-header',
        isScrolled
          ? 'border-b border-slate-200/40 dark:border-slate-800/50 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] py-2'
          : 'border-b border-slate-200/20 dark:border-slate-800/30 py-3'
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <BrandLogo />

        {/* ========================================================================= */}
        {/* DESKTOP NAVIGATION BAR (BORDER-FREE & LUXURIOUS HOVER PILLS)              */}
        {/* ========================================================================= */}
        <nav
          className="hidden xl:flex items-center space-x-1"
          aria-label="Primary Navigation"
        >
          {MAIN_NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            const isDropdownOpen = activeDropdownKey === item.key;

            if (item.hasDropdown && item.children) {
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdownKey(item.key)}
                  onMouseLeave={() => setActiveDropdownKey(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdownKey(isDropdownOpen ? null : item.key)
                    }
                    className={cn(
                      'px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium rounded-full transition-all duration-200 inline-flex items-center gap-1.5 focus:outline-none select-none',
                      active
                        ? 'bg-medical-50 text-medical-700 dark:bg-medical-950/60 dark:text-medical-300 font-semibold'
                        : isDropdownOpen
                        ? 'bg-slate-100 dark:bg-white/[0.08] text-navy-950 dark:text-white'
                        : 'text-slate-700 dark:text-slate-200 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.06]'
                    )}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span>{language === 'hi' ? item.hindiLabel : item.label}</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200 text-slate-400',
                        isDropdownOpen && 'rotate-180 text-medical-600 dark:text-medical-400'
                      )}
                    />
                  </button>

                  {/* Desktop Frosted Glass Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className="absolute left-0 top-full pt-2 w-80 2xl:w-96 z-50 pointer-events-auto"
                      >
                        <div className="nav-dropdown-glass rounded-2xl p-2 space-y-0.5 border border-slate-100/80 dark:border-white/[0.08]">
                          {item.children.map((subItem) => (
                            <NavLink
                              key={subItem.key}
                              to={getLocalizedPath(subItem.path)}
                              onClick={() => setActiveDropdownKey(null)}
                              className={({ isActive }) =>
                                cn(
                                  'group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150',
                                  isActive
                                    ? 'bg-medical-50 dark:bg-medical-950/60 text-medical-700 dark:text-medical-300 font-medium'
                                    : 'hover:bg-slate-100/70 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200'
                                )
                              }
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs 2xl:text-sm font-semibold truncate group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
                                    {language === 'hi'
                                      ? subItem.hindiLabel
                                      : subItem.label}
                                  </span>
                                  {subItem.badge && (
                                    <Badge
                                      variant={
                                        subItem.badge === 'Urgent'
                                          ? 'emergency'
                                          : 'medical'
                                      }
                                      size="sm"
                                    >
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </div>
                                {(subItem.description || subItem.hindiDescription) && (
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                    {language === 'hi'
                                      ? subItem.hindiDescription
                                      : subItem.description}
                                  </p>
                                )}
                              </div>
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <NavLink
                key={item.key}
                to={getLocalizedPath(item.path)}
                onClick={() => setActiveDropdownKey(null)}
                className={({ isActive }) =>
                  cn(
                    'relative px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap focus:outline-none',
                    isActive
                      ? 'bg-medical-50 text-medical-700 dark:bg-medical-950/60 dark:text-medical-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.06]'
                  )
                }
              >
                <span>{language === 'hi' ? item.hindiLabel : item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* ========================================================================= */}
        {/* RIGHT ACTION BUTTONS                                                      */}
        {/* ========================================================================= */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          
          {/* Language Switcher in sticky header (compact for elegance) */}
          <div className="flex items-center">
            <LanguageSwitcher variant="compact" />
          </div>

          {/* Theme Switcher in sticky header */}
          <div className="hidden sm:flex items-center">
            <ThemeSwitcher className="p-2 rounded-full border border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-white/[0.04]" />
          </div>

          {/* Quick 24/7 Hotline Badge */}
          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
            className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-semibold text-emergency-600 dark:text-emergency-400 bg-emergency-50/80 dark:bg-emergency-950/40 px-3 py-1.5 rounded-full hover:bg-emergency-100/80 transition-colors border border-emergency-200/60 dark:border-emergency-900/50"
            title="Immediate Emergency Hotline"
          >
            <PhoneCall className="w-3.5 h-3.5 shrink-0 animate-pulse text-emergency-500" />
            <span>{HOSPITAL_INFO.emergencyPhone}</span>
          </a>

          {/* Book Appointment CTA */}
          <Button
            variant="secondary"
            size="md"
            className="hidden sm:inline-flex shadow-sm shadow-medical-600/20 rounded-full px-4 font-semibold text-xs 2xl:text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
            leftIcon={<CalendarCheck className="w-4 h-4" />}
            onClick={onOpenAppointmentModal}
          >
            {t('common.bookAppointment')}
          </Button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/[0.08] xl:hidden focus:outline-none transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t('common.closeMenu') : t('common.menu')}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE NAVIGATION DRAWER (BORDER-FREE ACCORDION & CLEAN LIST HIERARCHY)   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="xl:hidden bg-white/95 dark:bg-dark-surface/95 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800/60 overflow-hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {/* Mobile Drawer Quick Utilities (Language, Theme) */}
              <div className="flex items-center justify-between gap-2 px-2 py-2 mb-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {language === 'hi' ? 'भाषा' : 'Language'}:
                  </span>
                  <LanguageSwitcher variant="pill" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {language === 'hi' ? 'थीम' : 'Theme'}:
                  </span>
                  <ThemeSwitcher className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-white/[0.04]" />
                </div>
              </div>
              
              {MAIN_NAV_ITEMS.map((item) => {
                const active = isItemActive(item);
                const isSubmenuOpen = !!mobileExpandedKeys[item.key];

                if (item.hasDropdown && item.children) {
                  return (
                    <div key={item.key} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(item.key)}
                        className={cn(
                          'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                          active
                            ? 'bg-medical-50 text-medical-700 dark:bg-medical-950/60 dark:text-medical-300'
                            : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/[0.05]'
                        )}
                        aria-expanded={isSubmenuOpen}
                      >
                        <div className="flex items-center gap-2">
                          <span>{language === 'hi' ? item.hindiLabel : item.label}</span>
                          <span className="text-[11px] font-normal text-slate-400">
                            ({item.children.length})
                          </span>
                        </div>
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 text-slate-400 transition-transform duration-200',
                            isSubmenuOpen && 'rotate-180 text-medical-600 dark:text-medical-400'
                          )}
                        />
                      </button>

                      {/* Clean Indented Submenu without boxy borders */}
                      <AnimatePresence>
                        {isSubmenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="border-l-2 border-slate-200/70 dark:border-slate-800 ml-4 pl-3.5 space-y-1 py-1"
                          >
                            {item.children.map((subItem) => (
                              <NavLink
                                key={subItem.key}
                                to={getLocalizedPath(subItem.path)}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                  cn(
                                    'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                                    isActive
                                      ? 'bg-medical-50/90 dark:bg-medical-950/70 text-medical-700 dark:text-medical-300 font-semibold'
                                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-white/[0.05]'
                                  )
                                }
                              >
                                <span>
                                  {language === 'hi' ? subItem.hindiLabel : subItem.label}
                                </span>
                                {subItem.badge && (
                                  <Badge
                                    variant={
                                      subItem.badge === 'Urgent'
                                        ? 'emergency'
                                        : 'medical'
                                    }
                                    size="sm"
                                  >
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.key}
                    to={getLocalizedPath(item.path)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-medical-50 text-medical-700 dark:bg-medical-950/60 dark:text-medical-300 font-semibold'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/[0.05]'
                      )
                    }
                  >
                    {language === 'hi' ? item.hindiLabel : item.label}
                  </NavLink>
                );
              })}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
                <Button
                  variant="secondary"
                  fullWidth
                  className="rounded-xl"
                  leftIcon={<CalendarCheck className="w-4 h-4" />}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAppointmentModal?.();
                  }}
                >
                  {t('common.bookAppointment')}
                </Button>

                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-emergency-600 rounded-xl shadow-sm hover:bg-emergency-700 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t('common.emergency247')} ({HOSPITAL_INFO.emergencyPhone})</span>
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
