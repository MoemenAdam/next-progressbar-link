'use client';
import NextLink, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ReactNode, forwardRef } from 'react';
import { ProgressBar } from './ProgressBar';

export type ProgressDirection =
  | 'top-to-right'
  | 'top-to-left'
  | 'bottom-to-right'
  | 'bottom-to-left'
  | 'left-to-bottom'
  | 'left-to-top'
  | 'right-to-bottom'
  | 'right-to-top';

// Custom event name
const NAVIGATION_START_EVENT = 'navigation-start';
const NAVIGATION_END_EVENT = 'navigation-end';

interface NavigationProgressProps {
  direction?: ProgressDirection;
  containerClassName?: string;
  progressClassName?: string;
  color?: string;
}

export const NavigationProgress = ({
  direction = 'top-to-right',
  containerClassName = '',
  progressClassName = '',
  color = '#00b207',
}: NavigationProgressProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleNavigationStart = () => {
      setIsNavigating(true);
    };

    const handleNavigationEnd = () => {
      setIsNavigating(false);
    };

    window.addEventListener(NAVIGATION_START_EVENT, handleNavigationStart);
    window.addEventListener(NAVIGATION_END_EVENT, handleNavigationEnd);

    return () => {
      window.removeEventListener(NAVIGATION_START_EVENT, handleNavigationStart);
      window.removeEventListener(NAVIGATION_END_EVENT, handleNavigationEnd);
    };
  }, []);

  useEffect(() => {
    if (isNavigating) {
      // Dispatch end event when pathname changes
      window.dispatchEvent(new Event(NAVIGATION_END_EVENT));
    }
  }, [pathname, isNavigating]);

  return (
    <ProgressBar
      isLoading={isNavigating}
      direction={direction}
      containerClassName={containerClassName}
      progressClassName={progressClassName}
      color={color}
    />
  );
};

export interface ProgressLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  target?: string;
  style?: React.CSSProperties;
}

const Link = forwardRef<HTMLAnchorElement, ProgressLinkProps>(
  ({ href, children, className, target, ...props }, ref) => {
    const pathname = usePathname();

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      const targetPath = typeof href === 'string' ? href : href.pathname || '';

      // Don't show progress for external links
      if (target === '_blank') return;

      // Don't show progress for same page
      if (targetPath === pathname) return;

      // Don't show progress for hash links
      if (typeof href === 'string' && href.startsWith('#')) return;

      // Dispatch custom event to start progress
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(NAVIGATION_START_EVENT));
      }
    };

    return (
      <NextLink
        href={href}
        onClick={handleClick}
        ref={ref}
        className={className}
        target={target}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
