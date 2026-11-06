import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'bordered' | 'flat' | 'glass';
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', interactive = false, children, ...props }, ref) => {
    const variantStyles = {
      elevated:
        'bg-white dark:bg-dark-surface border border-slate-200/70 dark:border-dark-border shadow-soft hover:shadow-card-hover hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300',
      glass:
        'glass-card shadow-glass hover:shadow-glass-hover hover:border-medical-400/40 dark:hover:border-medical-500/40 transition-all duration-300',
      bordered:
        'bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border shadow-none hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200',
      flat:
        'bg-slate-50/80 dark:bg-dark-card/70 border border-slate-100/50 dark:border-dark-border/40 shadow-none',
    };

    const interactiveStyles = interactive
      ? 'hover:-translate-y-1.5 hover:shadow-card-hover hover:border-medical-400/50 dark:hover:border-medical-500/50 cursor-pointer transition-all duration-300 ease-out active:scale-[0.99]'
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl overflow-hidden',
          variantStyles[variant],
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-3', className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed', className)}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-3', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-dark-border/60 mt-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';
