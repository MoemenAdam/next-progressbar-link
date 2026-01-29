'use client';
import { ProgressDirection } from './Link';
import { useState, useEffect, CSSProperties } from 'react';
import { createPortal } from 'react-dom';

const getPositionStyles = (direction: ProgressDirection): CSSProperties => {
  const baseStyles: CSSProperties = {
    position: 'fixed',
    zIndex: 50,
  };

  switch (direction) {
    case 'top-to-right':
    case 'top-to-left':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
      };
    case 'bottom-to-right':
    case 'bottom-to-left':
      return {
        ...baseStyles,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '4px',
      };
    case 'left-to-bottom':
    case 'left-to-top':
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        height: '100%',
        width: '4px',
      };
    case 'right-to-bottom':
    case 'right-to-top':
      return {
        ...baseStyles,
        top: 0,
        right: 0,
        height: '100%',
        width: '4px',
      };
    default:
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
      };
  }
};

const getProgressStyle = (
  progress: number,
  direction: ProgressDirection
): CSSProperties => {
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
  containerStyle?: CSSProperties;
  progressStyle?: CSSProperties;
  color?: string;
  height?: string;
  width?: string;
}

export const ProgressBar = ({
  isLoading,
  direction = 'top-to-right',
  containerStyle = {},
  progressStyle = {},
  color = '#00b207',
  height,
  width,
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

  const positionStyles = getPositionStyles(direction);

  if (height) {
    if (direction.includes('top') || direction.includes('bottom')) {
      positionStyles.height = height;
    }
  }
  if (width) {
    if (direction.includes('left') || direction.includes('right')) {
      positionStyles.width = width;
    }
  }

  const progressBar = (
    <div
      style={{
        ...positionStyles,
        ...containerStyle,
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          transition: 'transform 300ms ease-out',
          backgroundColor: color,
          boxShadow: `0 2px 10px ${color}`,
          ...getProgressStyle(progress, direction),
          ...progressStyle,
        }}
      />
    </div>
  );

  return createPortal(progressBar, document.body);
};
