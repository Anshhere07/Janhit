import { useState, useEffect } from 'react';

/**
 * Hook to track scroll position and determine if page is scrolled past a threshold.
 */
export function useScrollPosition(threshold: number = 20): {
  scrollY: number;
  isScrolled: boolean;
} {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
}

