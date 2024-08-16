

import { useSnapCarousel } from "react-snap-carousel";
import { Button } from "../ui-custom/MyButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "~/components/ui-custom/MyScrollArea";

interface CarouselProps {
  className?: string;
  children?: React.ReactNode;
  showPages?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  className,
  children,
  showPages,
}) => {
  const { scrollRef, snapPointIndexes, next, prev, pages, goTo } =
    useSnapCarousel();
  return (
    <div>
      <div
        className='flex snap-x snap-mandatory items-stretch overflow-x-auto'
        ref={scrollRef}
      >
        {children}
      </div>
      <div className='space-x mt-2 flex justify-center' aria-hidden>
        <Button variant={"ghost"} size={"icon"} onClick={() => prev()}>
          <div className='flex h-6 w-12 items-center justify-center rounded-full group-hover:bg-accent'>
            <ChevronLeft className='h-4 w-4' />
          </div>
          <span className='sr-only'>Előző</span>
        </Button>
        {showPages && (
          <>
            {pages.map((_, i) => (
              <Button
                key={i}
                variant={"ghost"}
                size={"icon"}
                onClick={() => goTo(i)}
              >
                <span>{i + 1}</span>
              </Button>
            ))}
          </>
        )}
        <Button variant={"ghost"} size={"icon"} onClick={() => next()}>
          <span className='sr-only'>Következő</span>
          <div className='flex h-6 w-12 items-center justify-center rounded-full group-hover:bg-accent'>
            <ChevronRight className='h-4 w-4' />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
