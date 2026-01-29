'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useState,
  useEffect,
  ReactNode,
  forwardRef,
  createContext,
  useContext,
} from 'react';
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

interface NavigationContextType {
  isNavigating: boolean;
  setIsNavigating: (value: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

interface NavigationProgressProps {
  direction?: ProgressDirection;
  containerClassName?: string;
  progressClassName?: string;
  color?: string;
  children?: ReactNode;
}

export const NavigationProgress = ({
  direction = 'top-to-right',
  containerClassName = '',
  progressClassName = '',
  color = '#00b207',
  children,
}: NavigationProgressProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
    }
  }, [pathname, isNavigating]);

  return (
    <NavigationContext.Provider value={{ isNavigating, setIsNavigating }}>
      <ProgressBar
        isLoading={isNavigating}
        direction={direction}
        containerClassName={containerClassName}
        progressClassName={progressClassName}
        color={color}
      />
      {children}
    </NavigationContext.Provider>
  );
};

export interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  target?: string;
  style?: React.CSSProperties;
}

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, children, className, target, ...props }, ref) => {
    const pathname = usePathname();
    const context = useContext(NavigationContext);

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      const targetPath = typeof href === 'string' ? href : href.pathname || '';

      // Check if it's an external link or same page
      if (target === '_blank' || targetPath === pathname) return;

      // Check if it's a hash link on the same page
      if (targetPath.startsWith('#')) return;

      if (context) {
        context.setIsNavigating(true);
      }
    };

    return (
      <Link
        href={href}
        onClick={handleClick}
        ref={ref}
        className={className}
        target={target}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

CustomLink.displayName = 'CustomLink';

export default CustomLink;
