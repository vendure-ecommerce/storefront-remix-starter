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
import { ShoppingCart } from "lucide-react";

import Summary from "../summary/Summary";
import SummaryDiscount from "../summary/SummaryDiscount";
import SummaryTotal from "../summary/SummaryProductTotal";
import SummaryShippingCost from "../summary/SummaryShippingCost";
import SummarySubTotal from "../summary/SummarySubTotal";
import SummaryTaxRate from "../summary/SummaryTaxRate";

const CartButton = () => {
  // const productOptions = dummy.productOptions;
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {isMobile ? (
          <Button variant={"mobileMenu"} size={"mobileMenu"}>
            <div className='relative flex h-6 w-12 items-center justify-center rounded-full group-hover:bg-accent'>
              <ShoppingCart className='h-4 w-4' />
              <div className='absolute -top-1.5 right-0'>
                <Badge variant={"counter"}>2</Badge>
              </div>
            </div>
            Kosár
          </Button>
        ) : (
          <Button className='relative' variant={"ghost"} size={"icon"}>
            <div className='sr-only'>Kosár</div>
            <ShoppingCart className='h-4 w-4' />
            <div className='absolute right-0 top-0'>
              <Badge variant={"counter"}>2</Badge>
            </div>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className='overflow-hidden' side={"right"}>
        <ScrollArea className='h-full w-full'>
          <SheetHeader className='sticky top-0 z-10 bg-white px-4 py-4'>
            <SheetTitle className='flex items-center gap-2'>
              Kosár
              <Badge className='rounded-full'>4 db</Badge>
            </SheetTitle>
          </SheetHeader>
          <div className='flex flex-col gap-12 px-4 pb-4 pt-8'>
            <div className='flex flex-col gap-12'>
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
            <Summary>
              <div className='flex flex-col gap-2'>
                <SummarySubTotal />
                <SummaryTaxRate />
                <SummaryShippingCost />
                <SummaryDiscount />
              </div>
              <SummaryTotal className='text-xl font-bold' />
            </Summary>
          </div>
          <footer className='sticky bottom-0 bg-white p-4'>
            <a href={"/cart"}>
              <Button className='w-full'>Tovább a megrendeléshez</Button>
            </a>
          </footer>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
