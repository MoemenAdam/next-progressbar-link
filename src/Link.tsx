'use client';
import NextLink, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, ReactNode, forwardRef, CSSProperties } from 'react';
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

interface NavigationProgressProps {
  direction?: ProgressDirection;
  containerStyle?: CSSProperties;
  progressStyle?: CSSProperties;
  color?: string;
  height?: string;
  width?: string;
}

export const NavigationProgress = ({
  direction = 'top-to-right',
  containerStyle = {},
  progressStyle = {},
  color = '#00b207',
  height,
  width,
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
      containerStyle={containerStyle}
      progressStyle={progressStyle}
      color={color}
      height={height}
      width={width}
    />
  );
};

export interface ProgressLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  target?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Link = forwardRef<HTMLAnchorElement, ProgressLinkProps>(
  ({ href, children, className, target, onClick, ...props }, ref) => {
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
      onClick?.(e);
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
