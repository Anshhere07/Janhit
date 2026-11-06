import React, { useState, useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CounterNumberProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export const CounterNumber: React.FC<CounterNumberProps> = ({
  value,
  duration = 1600,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  const rawString = String(value).trim();

  // Extract numeric part, decimal, prefix, suffix, and commas
  const match = rawString.match(/^([^0-9.]*)([0-9,.]+)(.*)$/);
  const isNumeric = match !== null;

  const prefix = isNumeric ? match[1] : '';
  const numString = isNumeric ? match[2].replace(/,/g, '') : '';
  const suffix = isNumeric ? match[3] : '';
  const targetNumber = parseFloat(numString);
  const hasCommas = rawString.includes(',');
  const decimalPlaces = numString.includes('.') ? numString.split('.')[1].length : 0;

  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    // If not numeric or user prefers reduced motion, do not animate
    if (!isNumeric || isNaN(targetNumber) || shouldReduceMotion) {
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const current = easedProgress * targetNumber;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetNumber, duration, isNumeric, shouldReduceMotion]);

  // Non-numeric fallback (e.g., "24/7")
  if (!isNumeric || isNaN(targetNumber) || shouldReduceMotion) {
    return (
      <span ref={ref} className={className} aria-label={rawString}>
        {rawString}
      </span>
    );
  }

  // Format the animated number
  const formattedNumber = displayValue.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: hasCommas,
  });

  return (
    <span ref={ref} className={className} aria-label={rawString}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};

