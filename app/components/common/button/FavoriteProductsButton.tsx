import CartProductCard from "~/components/cards/product/CartProductCard";
import { Badge } from "~/components/ui-custom/MyBadge";
import { Button } from "~/components/ui-custom/MyButton";
import { ScrollArea } from "~/components/ui-custom/MyScrollArea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui-custom/MySheet";
import { useViewportWidth } from "~/utils/use-viewport-width";
import { Heart } from "lucide-react";

const FavoriteProductButton = () => {
  // const productOptions = dummy.productOptions;
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {isMobile ? (
          <Button variant={"mobileMenu"} size={"mobileMenu"}>
            <div className='relative flex h-6 w-12 items-center justify-center rounded-full group-hover:bg-accent'>
              <Heart className='h-4 w-4' />
              <div className='absolute -top-1.5 right-0'>
                <Badge variant={"counter"}>2</Badge>
              </div>
            </div>
            Kedvencek
          </Button>
        ) : (
          <Button className='relative' variant={"ghost"} size={"icon"}>
            <div className='sr-only'>Kedvencek</div>
            <Heart className='h-4 w-4' />
            <div className='absolute top-0 right-0'>
              <Badge variant={"counter"}>2</Badge>
            </div>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className='overflow-hidden' side={"right"}>
        <ScrollArea className='h-full w-full'>
          <SheetHeader className='sticky top-0 z-10 bg-white px-4 py-4'>
            <SheetTitle className='flex items-center gap-2'>
              Kedvencek
              <Badge className='rounded-full'>4 db</Badge>
            </SheetTitle>
          </SheetHeader>
          <div className='flex flex-col gap-12 px-4 py-8'>
            {/* {productOptions.map((option, index) => (
              <CartProductCard
                key={index}
                id={option.id}
                title={option.title}
                link={option.link}
                number={option.number}
                priceNormal={option.priceNormal}
                priceNet={option.priceNet}
                priceCrossed={option.priceCrossed}
                imageSrc={option.imageSrc}
                rating={option.rating}
                reviews={option.reviews}
                manufacturer={option.manufacturer}
              />
            ))} */}
          </div>
          <footer className='p-4 sticky bottom-0 bg-white'>
            <a href='/collection/product/favorite'>
              <Button className='w-full'>Összes kedvenc termék</Button>
            </a>
          </footer>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FavoriteProductButton;
