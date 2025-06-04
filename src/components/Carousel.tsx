import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Example if slides are cards
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  slides: React.ReactNode[]; // Array of React nodes to render as slides
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  showArrows?: boolean;
  slideClassName?: string; // Custom class for each slide container
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: true },
  showArrows = true,
  slideClassName
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with slides:", slides.length);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="embla relative overflow-hidden group">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div className={cn("embla__slide flex-[0_0_100%] min-w-0", slideClassName)} key={index}>
              {/*
                If you want each slide to have a consistent card structure, wrap it here.
                Example:
                <Card className="m-2">
                  <CardContent className="flex aspect-video items-center justify-center p-6">
                    {slide}
                  </CardContent>
                </Card>
                Otherwise, the slide content itself should define its structure.
              */}
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="embla__prev absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={scrollPrev}
            disabled={!emblaApi?.canScrollPrev()}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="embla__next absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={scrollNext}
            disabled={!emblaApi?.canScrollNext()}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}
      {/* Add Dots if needed */}
    </div>
  );
};

export default Carousel;