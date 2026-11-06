import React from 'react';
import { cn } from '../../utils/cn';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: 'default' | 'medical' | 'accent' | 'emergency';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  titleClassName?: string;
  gradientTitle?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = 'medical',
  title,
  subtitle,
  align = 'left',
  size = 'md',
  className,
  titleClassName,
  gradientTitle = false,
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const titleSizes = {
    sm: 'text-[clamp(1.4rem,2.2vw+0.25rem,2rem)] leading-snug',
    md: 'text-[clamp(1.65rem,2.8vw+0.35rem,2.5rem)] leading-tight',
    lg: 'text-[clamp(1.85rem,3.4vw+0.45rem,2.85rem)] leading-tight',
  };

  return (
    <div className={cn('flex flex-col max-w-3xl mb-8 sm:mb-10 md:mb-12', alignStyles[align], className)}>
      {badge && (
        <Badge
          variant={badgeVariant}
          showDot
          className="mb-3.5 shadow-sm uppercase tracking-wider text-[11px] font-bold"
        >
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          titleSizes[size],
          'font-extrabold tracking-tight [text-wrap:balance]',
          gradientTitle ? 'text-gradient-navy' : 'text-navy-950 dark:text-white',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal [text-wrap:pretty]">
          {subtitle}
        </p>
      )}
      {/* Decorative medical gradient accent bar with glow */}
      <div
        className={cn(
          'h-1.5 w-14 bg-gradient-to-r from-medical-500 via-teal-400 to-teal-500 rounded-full mt-4 shadow-sm shadow-medical-500/20',
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
        )}
        aria-hidden="true"
      />
    </div>
  );
};
