

import { Button } from "~/components/ui-custom/MyButton";
import { ScrollArea } from "~/components/ui-custom/MyScrollArea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui-custom/MySheet";
import { SortAsc } from "lucide-react";
import CheckboxGroup from "../checkbox/CheckboxGroup";
import CheckboxGroupItem from "../checkbox/CheckboxGroupItem";

const OrderButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"mobileMenu"} size={"mobileMenu"}>
          <div className='flex h-6 w-12 items-center justify-center rounded-full group-hover:bg-accent'>
            <SortAsc className='h-4 w-4' />
          </div>
          Sorrend
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <ScrollArea className='h-full w-full'>
          <SheetHeader className='sticky top-0 z-10 bg-white px-4 py-4'>
            <SheetTitle className='flex items-center gap-2'>
              Terméklista sorrendje
            </SheetTitle>
          </SheetHeader>
          <div className='flex flex-col gap-8 py-8'>
            <CheckboxGroup>
              {[...Array(9)].map((_, index) => (
                <CheckboxGroupItem
                  key={index}
                  className='pl-6 pr-7'
                  label={"Sorrend értékek"}
                  showLabel={true}
                  id={"option.id"}
                  imageSrc='/path/to/image.jpg'
                  showImage={false}
                />
              ))}
            </CheckboxGroup>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default OrderButton;
