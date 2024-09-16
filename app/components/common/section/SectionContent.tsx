

import GridLayout from "~/components/common/GridLayout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui-custom/MyCarousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import React from "react";

interface SectionContentProps {
  className?: string;
  children?: React.ReactNode;
  layoutType?: "default" | "grid" | "carousel";
  carouselItemClassName?: string;
}

const SectionContent: React.FC<SectionContentProps> = ({
  className,
  children,
  layoutType = "default",
  carouselItemClassName = "flex basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6",
}) => {
  return (
    <>
      {layoutType === "default" ? (
        <div className={className}>{children}</div>
      ) : layoutType === "grid" ? (
        <GridLayout className={className}>{children}</GridLayout>
      ) : (
        <Carousel
          className='relative flex flex-col gap-8'
          opts={{
            active: true,
            align: "start",
            dragFree: true,
            skipSnaps: true,
            loop: false,
            watchDrag: true,
          }}
          plugins={[WheelGesturesPlugin()]}
        >
          <div className='flex gap-4 lg:absolute lg:-top-16 lg:right-0'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <CarouselContent>
            {React.Children.map(children, (child, index) => (
              <CarouselItem key={index} className={carouselItemClassName}>
                {child}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  );
};

export default SectionContent;
