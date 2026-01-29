'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';
import { ProgressBar } from './ProgressBar';

let globalIsNavigating = false;
let globalSetNavigating: ((value: boolean) => void) | null = null;

export type ProgressDirection =
  | 'top-to-right' // Top, from left to right
  | 'top-to-left' // Top, from right to left
  | 'bottom-to-right' // Bottom, from left to right
  | 'bottom-to-left' // Bottom, from right to left
  | 'left-to-bottom' // Left, from top to bottom
  | 'left-to-top' // Left, from bottom to top
  | 'right-to-bottom' // Right, from top to bottom
  | 'right-to-top'; // Right, from bottom to top

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
    globalSetNavigating = setIsNavigating;
    return () => {
      globalSetNavigating = null;
    };
  }, []);

  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
      globalIsNavigating = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

interface CustomLinkProps extends LinkProps {
  target?: string;
  children: ReactNode;
  className?: string;
}

const CustomLink = ({
  href,
  target,
  children,
  className = '',
  ...props
}: CustomLinkProps) => {
  const pathname = usePathname();

  const handleClick = () => {
    const targetPath = typeof href === 'string' ? href : href.pathname || '';

    if (targetPath === pathname || globalIsNavigating) {
      return;
    }

    globalIsNavigating = true;
    if (globalSetNavigating) {
      globalSetNavigating(true);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
