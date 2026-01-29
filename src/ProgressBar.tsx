'use client';
import { ProgressDirection } from './Link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getPositionClasses = (direction: ProgressDirection) => {
  switch (direction) {
    case 'top-to-right':
    case 'top-to-left':
      return 'top-0 left-0 w-full h-1';
    case 'bottom-to-right':
    case 'bottom-to-left':
      return 'bottom-0 left-0 w-full h-1';
    case 'left-to-bottom':
    case 'left-to-top':
      return 'top-0 left-0 h-full w-1';
    case 'right-to-bottom':
    case 'right-to-top':
      return 'top-0 right-0 h-full w-1';
    default:
      return 'top-0 left-0 w-full h-1';
  }
};

const getProgressStyle = (progress: number, direction: ProgressDirection) => {
  const scale = progress / 100;

  switch (direction) {
    case 'top-to-right':
    case 'bottom-to-right':
      return {
        transform: `scaleX(${scale})`,
        transformOrigin: 'left',
      };

    case 'top-to-left':
    case 'bottom-to-left':
      return {
        transform: `scaleX(${scale})`,
        transformOrigin: 'right',
      };

    case 'left-to-bottom':
    case 'right-to-bottom':
      return {
        transform: `scaleY(${scale})`,
        transformOrigin: 'top',
      };

    case 'left-to-top':
    case 'right-to-top':
      return {
        transform: `scaleY(${scale})`,
        transformOrigin: 'bottom',
      };

    default:
      return {};
  }
};

interface ProgressBarProps {
  isLoading: boolean;
  direction?: ProgressDirection;
  containerClassName?: string;
  progressClassName?: string;
  color?: string;
}

export const ProgressBar = ({
  isLoading,
  direction = 'top-to-right',
  containerClassName = '',
  progressClassName = '',
  color = '#00b207',
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldShow(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          const increment = Math.random() * 5;
          return Math.min(prev + increment, 90);
        });
      }, 50);

      return () => clearInterval(interval);
    } else if (shouldShow) {
      setProgress(100);
      const timeout = setTimeout(() => {
        setShouldShow(false);
        setProgress(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, shouldShow]);

  if (!shouldShow) return null;

  const progressBar = (
    <div
      className={cn(
        'fixed z-50',
        getPositionClasses(direction),
        containerClassName
      )}
    >
      <div
        className={cn(
          'transition-transform duration-300 ease-out h-full w-full',
          progressClassName
        )}
        style={{
          ...getProgressStyle(progress, direction),
          backgroundColor: color,
          boxShadow: `0 2px 10px ${color}`,
        }}
      />
    </div>
  );

  return createPortal(progressBar, document.body);
};
