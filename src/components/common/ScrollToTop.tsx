import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures every route change immediately resets the window scroll position to top (0, 0)
 * without jarring layout jumps, preserving accessible focus.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll if not an anchor hash link
    if (!window.location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant', // Instant prevents fighting with AnimatePresence
      });
    }
  }, [pathname]);

  return null;
};

