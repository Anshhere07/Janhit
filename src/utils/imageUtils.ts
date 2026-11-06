/**
 * Image optimization utilities for Janhit Hospital
 * Handles responsive srcSet generation, auto WebP/AVIF format negotiation,
 * and aspect ratio calculations to prevent Cumulative Layout Shift (CLS).
 */

/**
 * Generates responsive srcset for CDN images (such as Unsplash)
 * Supports automated format negotiation (WebP / AVIF) and multi-resolution widths.
 */
export function getResponsiveSrcSet(src?: string): string | undefined {
  if (!src) return undefined;

  // Unsplash dynamic responsive resizing
  if (src.includes('images.unsplash.com')) {
    const baseUrl = src.split('?')[0];
    return [
      `${baseUrl}?auto=format&fit=crop&w=480&q=75 480w`,
      `${baseUrl}?auto=format&fit=crop&w=800&q=80 800w`,
      `${baseUrl}?auto=format&fit=crop&w=1200&q=80 1200w`,
      `${baseUrl}?auto=format&fit=crop&w=1600&q=80 1600w`,
    ].join(', ');
  }

  return undefined;
}

/**
 * Returns default responsive sizes attribute based on common grid layouts
 */
export function getDefaultSizes(layout: 'full' | 'half' | 'third' | 'quarter' | 'avatar' = 'third'): string {
  switch (layout) {
    case 'full':
      return '100vw';
    case 'half':
      return '(max-width: 768px) 100vw, 50vw';
    case 'third':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'quarter':
      return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw';
    case 'avatar':
      return '(max-width: 640px) 64px, 96px';
    default:
      return '(max-width: 768px) 100vw, 33vw';
  }
}

