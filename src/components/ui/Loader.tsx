import React from 'react';
import { cn } from '../../utils/cn';

/* -------------------------------------------------------------------------- */
/*                               Spinner Component                            */
/* -------------------------------------------------------------------------- */
export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'medical' | 'navy' | 'teal' | 'white' | 'slate';
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'medical',
  className,
  ...props
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantMap = {
    medical: 'text-medical-600 dark:text-medical-400',
    navy: 'text-navy-800 dark:text-navy-300',
    teal: 'text-teal-600 dark:text-teal-400',
    white: 'text-white',
    slate: 'text-slate-400 dark:text-slate-500',
  };

  return (
    <svg
      className={cn('animate-spin shrink-0', sizeMap[size], variantMap[variant], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
      role="status"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Skeleton Component                            */
/* -------------------------------------------------------------------------- */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  rounded = 'md',
  ...props
}) => {
  const roundedStyles = {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-slate-200/80 dark:bg-dark-card/90',
        roundedStyles[rounded],
        className
      )}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                            PageLoader Component                            */
/* -------------------------------------------------------------------------- */
export interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading healthcare services...' }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-medical-100 dark:border-dark-card border-t-medical-600 animate-spin" />
        <div className="absolute w-8 h-8 rounded-full bg-navy-900/10 dark:bg-medical-500/20 flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
};

