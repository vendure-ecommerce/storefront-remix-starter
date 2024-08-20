import { Button } from '~/components/ui-custom/MyButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import MenuButton from '../../button/MenuButton';
import PrimaryMenu from './PrimaryMenu';
import SecondaryMenu from './SecondaryMenu';
import { useLocation } from '@remix-run/react';

const NavbarBottom: React.FC = () => {
  const location = useLocation();
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false); // Start with false
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const checkForScrollPosition = (): void => {
    if (menuContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = menuContainerRef.current;
      const isOverflowing = scrollWidth > clientWidth;
      setShowLeftArrow(isOverflowing && scrollLeft > 0);
      setShowRightArrow(
        isOverflowing && scrollLeft < scrollWidth - clientWidth,
      );
    }
  };

  const scrollMenu = (direction: 'left' | 'right'): void => {
    if (menuContainerRef.current) {
      const container = menuContainerRef.current;
      const scrollAmount =
        direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkForScrollPosition(); // Initial check on mount
    const menuContainer = menuContainerRef.current;
    if (menuContainer) {
      menuContainer.addEventListener('scroll', checkForScrollPosition);
      return () => {
        menuContainer.removeEventListener('scroll', checkForScrollPosition);
      };
    }
  }, []);

  useEffect(() => {
    const container = menuContainerRef.current;

    const saveScrollPosition = () => {
      if (container) {
        window.localStorage.setItem(
          'scrollPosition-NavbarBottom',
          JSON.stringify({
            left: container.scrollLeft,
            top: container.scrollTop,
          }),
        );
      }
    };

    const restoreScrollPosition = () => {
      if (container) {
        const savedPosition = JSON.parse(
          window.localStorage.getItem('scrollPosition-NavbarBottom') || '{}',
        );
        if (savedPosition.left !== undefined && savedPosition.top !== undefined) {
          container.scrollTo(
            savedPosition.left,
            savedPosition.top,
          );
        }
      }
    };

    window.addEventListener("beforeunload", saveScrollPosition);
    restoreScrollPosition();

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [location.pathname]);

  return (
    <div className="flex h-[3.75rem] items-center justify-between gap-12">
      <MenuButton />
      <div className="relative flex overflow-hidden">
        {showLeftArrow && (
          <Button
            onClick={() => scrollMenu('left')}
            className="absolute left-0 z-10 h-10 w-10 rounded-none bg-gradient-to-r from-white from-70% p-0 hover:bg-white"
            variant={'ghost'}
          >
            <ChevronLeft />
          </Button>
        )}
        <div
          ref={menuContainerRef}
          className="flex overflow-auto scrollbar-hide"
          onScroll={checkForScrollPosition}
        >
          <PrimaryMenu />
        </div>
        {showRightArrow && (
          <Button
            onClick={() => scrollMenu('right')}
            className="absolute right-0 z-10 h-10 w-10 rounded-none bg-gradient-to-l from-white from-70% p-0 hover:bg-white"
            variant={'ghost'}
          >
            <ChevronRight />
          </Button>
        )}
      </div>
      <SecondaryMenu />
    </div>
  );
};

export default NavbarBottom;
