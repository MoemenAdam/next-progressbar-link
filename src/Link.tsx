'use client';
import NextLink, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ReactNode, forwardRef } from 'react';
import { useNavigationContext } from './NavigationContext';
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
  const { isNavigating, setIsNavigating } = useNavigationContext();
  const pathname = usePathname();

  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
    }
  }, [pathname]);

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

export const Link = forwardRef<HTMLAnchorElement, ProgressLinkProps>(
  ({ href, children, className, target, ...props }, ref) => {
    const { setIsNavigating } = useNavigationContext();
    const pathname = usePathname();

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      const targetPath = typeof href === 'string' ? href : href.pathname || '';

      // Skip for external, same-page, or hash links
      if (target === '_blank') return;
      if (targetPath === pathname) return;
      if (typeof href === 'string' && href.startsWith('#')) return;

      // Start progress
      setIsNavigating(true);
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
