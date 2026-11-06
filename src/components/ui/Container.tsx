import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'xl', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-[1440px]',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10', sizeClasses[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = 'Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'surface' | 'muted' | 'navy' | 'mesh' | 'glass';
  spacing?: 'none' | 'compact' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', spacing = 'lg', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-transparent',
      surface: 'bg-white dark:bg-dark-surface border-y border-slate-200/60 dark:border-dark-border/60',
      muted: 'bg-slate-50/70 dark:bg-dark-card/50 border-y border-slate-100 dark:border-dark-border/40',
      navy: 'bg-navy-950 text-white',
      mesh: 'bg-ambient-mesh',
      glass: 'glass-card border-y border-slate-200/60 dark:border-dark-border/60',
    };

    const spacingStyles = {
      none: '',
      compact: 'py-8 sm:py-10 md:py-12',
      sm: 'py-10 sm:py-12 md:py-16',
      md: 'py-12 sm:py-16 md:py-20',
      lg: 'py-16 sm:py-20 md:py-24',
      xl: 'py-20 sm:py-24 md:py-32',
      fluid: 'py-[clamp(3.5rem,6vw,6.5rem)]',
    };

    return (
      <section
        ref={ref}
        className={cn(variantStyles[variant], spacingStyles[spacing], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = 'Section';
