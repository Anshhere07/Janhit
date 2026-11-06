import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth, AdminRole } from '../context/AdminAuthContext';

interface AdminProtectedRouteProps {
  allowedRoles?: AdminRole[];
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-medical-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Verifying Admin Authorization...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-950 p-4">
        <div className="max-w-md w-full bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08] rounded-2xl p-6 text-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 mx-auto flex items-center justify-center font-bold text-xl mb-3">
            !
          </div>
          <h2 className="text-lg font-bold text-navy-950 dark:text-white">Access Restricted</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Your staff account ({user.role}) does not have permission to access this module.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

