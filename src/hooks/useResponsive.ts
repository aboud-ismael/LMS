import { useState, useEffect, useMemo } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away
    handleResize();

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breakpointInfo = useMemo(() => {
    const width = windowSize.width;
    return {
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg,
      isPortrait: windowSize.height > width,
      isLandscape: width > windowSize.height,
      // Breakpoint checks
      isAboveSm: width >= breakpoints.sm,
      isAboveMd: width >= breakpoints.md,
      isAboveLg: width >= breakpoints.lg,
      isAboveXl: width >= breakpoints.xl,
      is2Xl: width >= breakpoints["2xl"],
    };
  }, [windowSize]);

  const isAboveBreakpoint = (breakpoint: Breakpoint): boolean => {
    return windowSize.width >= breakpoints[breakpoint];
  };

  return {
    ...breakpointInfo,
    width: windowSize.width,
    height: windowSize.height,
    isAboveBreakpoint,
    breakpoints,
  };
}
