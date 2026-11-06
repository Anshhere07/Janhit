import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]';

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4.5 py-2.5 gap-2 h-10',
      lg: 'text-base px-6 py-3.5 gap-2.5 h-12',
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-navy-800 to-navy-900 hover:from-navy-900 hover:to-navy-950 text-white shadow-md shadow-navy-950/15 dark:from-medical-600 dark:to-medical-700 dark:hover:from-medical-700 dark:hover:to-medical-800 dark:shadow-medical-600/30 focus-visible:ring-navy-800 dark:focus-visible:ring-medical-500 hover:shadow-lg hover:-translate-y-0.5',
      secondary:
        'bg-gradient-to-r from-medical-600 to-medical-700 hover:from-medical-700 hover:to-medical-800 text-white shadow-md shadow-medical-600/25 focus-visible:ring-medical-600 hover:shadow-lg hover:shadow-medical-600/35 hover:-translate-y-0.5',
      accent:
        'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-md shadow-teal-600/25 focus-visible:ring-teal-600 hover:shadow-lg hover:shadow-teal-600/35 hover:-translate-y-0.5',
      outline:
        'border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-dark-card/60 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 shadow-sm focus-visible:ring-medical-500 hover:-translate-y-0.5',
      ghost:
        'bg-transparent hover:bg-slate-100/80 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 focus-visible:ring-slate-400',
      emergency:
        'bg-gradient-to-r from-emergency-600 via-emergency-500 to-emergency-600 hover:from-emergency-700 hover:to-emergency-700 text-white shadow-lg shadow-emergency-600/30 focus-visible:ring-emergency-600 animate-pulse-subtle hover:shadow-xl hover:-translate-y-0.5',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
