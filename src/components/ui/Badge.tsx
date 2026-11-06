import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'medical' | 'accent' | 'emergency' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  pulseDot?: boolean;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  showDot = false,
  pulseDot = false,
  icon,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-3.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-4 py-1.5 gap-2 font-semibold',
  };

  const variantStyles = {
    default:
      'bg-navy-50/90 text-navy-800 border border-navy-200/80 dark:bg-navy-950/80 dark:text-navy-200 dark:border-navy-800/80 shadow-sm',
    medical:
      'bg-medical-50/90 text-medical-700 border border-medical-200/80 dark:bg-medical-950/60 dark:text-medical-300 dark:border-medical-800/80 shadow-sm shadow-medical-500/5',
    accent:
      'bg-teal-50/90 text-teal-800 border border-teal-200/80 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800/80 shadow-sm shadow-teal-500/5',
    emergency:
      'bg-emergency-50/95 text-emergency-700 border border-emergency-200 dark:bg-emergency-950/70 dark:text-emergency-300 dark:border-emergency-900 shadow-sm shadow-emergency-500/10',
    success:
      'bg-success-50/95 text-success-700 border border-success-200 dark:bg-success-950/70 dark:text-success-300 dark:border-success-900 shadow-sm shadow-success-500/10',
    warning:
      'bg-warning-50/95 text-warning-700 border border-warning-200 dark:bg-warning-950/70 dark:text-warning-300 dark:border-warning-900 shadow-sm',
    neutral:
      'bg-slate-100 text-slate-700 border border-slate-200/90 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/80 shadow-sm',
  };

  const dotColors = {
    default: 'bg-navy-600 dark:bg-navy-400',
    medical: 'bg-medical-600 dark:bg-medical-400',
    accent: 'bg-teal-600 dark:bg-teal-400',
    emergency: 'bg-emergency-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-200 whitespace-nowrap',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {showDot && (
        <span className="relative flex h-2 w-2 shrink-0">
          {(pulseDot || variant === 'emergency') && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                dotColors[variant]
              )}
            />
          )}
          <span
            className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])}
            aria-hidden="true"
          />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
