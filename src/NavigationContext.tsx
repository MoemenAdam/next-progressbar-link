// NavigationContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface NavContextType {
  isNavigating: boolean;
  setIsNavigating: (val: boolean) => void;
}

const NavigationContext = createContext<NavContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <NavigationContext.Provider value={{ isNavigating, setIsNavigating }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error(
      'useNavigationContext must be used inside NavigationProvider'
    );
  return ctx;
};
