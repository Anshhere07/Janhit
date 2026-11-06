import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Skeleton } from './Loader';
import { ImageOff } from 'lucide-react';
import { getResponsiveSrcSet, getDefaultSizes } from '../../utils/imageUtils';

export interface ImageContainerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: '16/9' | '4/3' | '4/3.5' | '3/4' | '1/1' | '3/2' | '21/9' | 'auto';
  zoomOnHover?: boolean;
  containerClassName?: string;
  fallbackSrc?: string;
  priority?: boolean;
  layoutPreset?: 'full' | 'half' | 'third' | 'quarter' | 'avatar';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
  src,
  alt = 'Hospital photo',
  aspectRatio = '16/9',
  zoomOnHover = false,
  containerClassName,
  className,
  fallbackSrc,
  priority = false,
  layoutPreset = 'third',
  fetchPriority,
  loading,
  sizes,
  srcSet,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  const aspectStyles = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '4/3.5': 'aspect-[4/3.5]',
    '3/4': 'aspect-[3/4]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
    '21/9': 'aspect-[21/9]',
    'auto': '',
  };

  // Determine priority settings
  const resolvedLoading: 'eager' | 'lazy' = priority ? 'eager' : (loading || 'lazy');
  const resolvedFetchPriority: 'high' | 'low' | 'auto' = priority ? 'high' : (fetchPriority || 'auto');
  const resolvedSrcSet = srcSet || getResponsiveSrcSet(currentSrc);
  const resolvedSizes = sizes || getDefaultSizes(layoutPreset);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-100 dark:bg-dark-card rounded-xl w-full',
        aspectStyles[aspectRatio],
        containerClassName
      )}
    >
      {/* Loading Shimmer Skeleton to eliminate CLS */}
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}

      {/* Fallback state with healthcare branding */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-dark-card text-slate-400 dark:text-slate-500">
          <div className="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-dark-border flex items-center justify-center mb-2">
            <ImageOff className="w-5 h-5 text-slate-400" />
          </div>
          <span className="text-xs font-medium text-center line-clamp-1">{alt || 'Hospital media unavailable'}</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={resolvedLoading}
          decoding="async"
          fetchPriority={resolvedFetchPriority}
          srcSet={resolvedSrcSet}
          sizes={resolvedSizes}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-all duration-500',
            !isLoaded && 'opacity-0 scale-95',
            isLoaded && 'opacity-100 scale-100',
            zoomOnHover && 'group-hover:scale-105 duration-700 ease-out',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageContainer;
