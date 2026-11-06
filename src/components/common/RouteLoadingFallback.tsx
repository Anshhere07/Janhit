import React from 'react';
import { Activity } from 'lucide-react';

export const RouteLoadingFallback: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-transparent"
    >
      <div className="relative flex items-center justify-center">
        {/* Animated pulse rings */}
        <div className="absolute w-16 h-16 rounded-full bg-medical-500/20 dark:bg-medical-400/10 animate-ping pointer-events-none" />
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-dark-surface shadow-elevated border border-slate-200/80 dark:border-dark-border flex items-center justify-center text-medical-600 dark:text-medical-400 z-10">
          <Activity className="w-7 h-7 animate-pulse" />
        </div>
      </div>

      {/* Progress Shimmer Bar */}
      <div className="w-40 h-1 bg-slate-200 dark:bg-dark-border rounded-full overflow-hidden mt-6">
        <div className="w-full h-full bg-gradient-to-r from-medical-500 via-teal-400 to-medical-600 animate-shimmer" />
      </div>

      <span className="sr-only">Loading page content...</span>
    </div>
  );
};

export default RouteLoadingFallback;

