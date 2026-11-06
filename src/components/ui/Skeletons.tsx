import React from 'react';
import { Skeleton } from './Loader';
import { cn } from '../../utils/cn';

/**
 * DoctorCardSkeleton
 * Mimics the exact layout of DoctorCard while doctor profiles are loading
 */
export const DoctorCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden bg-white dark:bg-dark-surface border border-slate-200/70 dark:border-dark-border shadow-soft p-0 flex flex-col justify-between',
        className
      )}
    >
      <div>
        {/* Aspect Ratio Portrait Placeholder */}
        <Skeleton className="w-full aspect-[4/3.5] rounded-none" />

        <div className="p-5 space-y-3">
          {/* Department Tag Skeleton */}
          <Skeleton className="w-24 h-5 rounded-full" />

          {/* Doctor Name & Specialization */}
          <div className="space-y-1.5">
            <Skeleton className="w-3/4 h-5 rounded-md" />
            <Skeleton className="w-1/2 h-3.5 rounded-md" />
          </div>

          {/* Qualifications 2-line */}
          <div className="space-y-1 pt-1">
            <Skeleton className="w-full h-3 rounded" />
            <Skeleton className="w-4/5 h-3 rounded" />
          </div>

          {/* OPD Timing */}
          <div className="pt-2 border-t border-slate-100 dark:border-dark-border">
            <Skeleton className="w-2/3 h-3.5 rounded" />
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-5 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="w-full h-8 rounded-xl" />
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

/**
 * DepartmentCardSkeleton
 * Mimics Department directory cards
 */
export const DepartmentCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden bg-white dark:bg-dark-surface border border-slate-200/70 dark:border-dark-border shadow-soft p-0 flex flex-col justify-between',
        className
      )}
    >
      <div>
        <Skeleton className="w-full h-44 rounded-none" />
        <div className="p-6 space-y-3">
          <Skeleton className="w-32 h-5 rounded-full" />
          <Skeleton className="w-2/3 h-6 rounded-md" />
          <div className="space-y-1.5 pt-1">
            <Skeleton className="w-full h-3.5 rounded" />
            <Skeleton className="w-5/6 h-3.5 rounded" />
            <Skeleton className="w-4/6 h-3.5 rounded" />
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-dark-border mt-4">
        <Skeleton className="w-24 h-4 rounded" />
        <Skeleton className="w-20 h-4 rounded" />
      </div>
    </div>
  );
};

/**
 * BlogCardSkeleton
 * Mimics Health Blog article cards
 */
export const BlogCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden bg-white dark:bg-dark-surface border border-slate-200/70 dark:border-dark-border shadow-soft p-0 flex flex-col justify-between',
        className
      )}
    >
      <div>
        <Skeleton className="w-full aspect-[16/10] rounded-none" />
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="w-24 h-5 rounded-full" />
            <Skeleton className="w-16 h-3.5 rounded" />
          </div>
          <Skeleton className="w-full h-5 rounded-md" />
          <Skeleton className="w-3/4 h-5 rounded-md" />
          <div className="space-y-1 pt-1">
            <Skeleton className="w-full h-3 rounded" />
            <Skeleton className="w-4/5 h-3 rounded" />
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 border-t border-slate-100 dark:border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-24 h-3.5 rounded" />
        </div>
        <Skeleton className="w-16 h-4 rounded" />
      </div>
    </div>
  );
};

/**
 * GalleryImageSkeleton
 * Mimics photo and video gallery grid items
 */
export const GalleryImageSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-dark-card border border-slate-200/70 dark:border-dark-border',
        className
      )}
    >
      <Skeleton className="w-full h-full rounded-none" />
      <div className="absolute bottom-3 left-3 right-3 space-y-1">
        <Skeleton className="w-20 h-4 rounded-full" />
        <Skeleton className="w-3/4 h-4 rounded" />
      </div>
    </div>
  );
};

/**
 * AppointmentSlotSkeleton
 * Mimics available consultation time slot chips
 */
export const AppointmentSlotSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-20 h-9 rounded-xl shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="w-full h-11 rounded-xl" />
        ))}
      </div>
    </div>
  );
};

