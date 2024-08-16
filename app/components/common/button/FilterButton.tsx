

import Filters from "~/components/filter/sidebar/Filters";
import CategoryTreeView from "~/components/pages/category/CategoryTreeView";
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
import { Filter } from "lucide-react";

const FilterButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"mobileMenu"} size={"mobileMenu"}>
          <div className='relative flex h-6 w-12 items-center justify-center rounded-full group-hover:bg-accent'>
            <Filter className='h-4 w-4' />
            <div className='absolute -top-1.5 right-0'>
              <Badge variant={"counter"}>2</Badge>
            </div>
          </div>
          Szűrő
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <ScrollArea className='h-full w-full'>
          <SheetHeader className='sticky top-0 z-10 bg-white px-4 py-4'>
            <SheetTitle className='flex items-center gap-2'>
              Szűrő <Badge className='rounded-full'>4 db</Badge>
            </SheetTitle>
          </SheetHeader>
          <div className='flex flex-col gap-8 py-8'>
            <CategoryTreeView />
            <Filters />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FilterButton;
