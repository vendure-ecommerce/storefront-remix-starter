import { useEffect, useState } from 'react';

/**
 * useScrollingUp
 * Adapted from https://devmuscle.com/blog/react-sticky-header. Thanks, Defne Eroğlu
 * @returns {boolean}
 */
export const useScrollingUp = () => {
  let prevScroll: number;
  //if it is SSR then check you are now on the client and window object is available
  if (typeof window !== 'undefined') {
    prevScroll = window.pageYOffset;
  }
  const [scrollingUp, setScrollingUp] = useState(false);
  const handleScroll = () => {
    const currScroll = window.pageYOffset;
    const isScrolled = prevScroll > currScroll;
    setScrollingUp(isScrolled);
    prevScroll = currScroll;
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return scrollingUp;
};
