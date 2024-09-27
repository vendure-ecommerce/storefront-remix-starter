import { useFetcher } from '@remix-run/react';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import CategoryMenuList from '~/components/pages/category/CategoryMenuList';
import { Button } from '~/components/ui-custom/MyButton';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui-custom/MySheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { isArrayValid } from '~/utils';
import { useViewportWidth } from '~/utils/use-viewport-width';
import ListGroup from '../list/ListGroup';
import ListGroupItem from '../list/ListGroupItem';

const MenuButton = () => {
  const fetcher = useFetcher<{
    result: { items: any[] };
  }>();
  useEffect(() => {
    fetcher.submit(null, { action: '/api/collection-menu', method: 'get' });
  }, []);

  const width = useViewportWidth();
  const isMobile = width < 1024;

  const [stOpen, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={stOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {isMobile ? (
          <Button variant={'mobileMenu'} size={'mobileMenu'}>
            <div className="flex h-6 w-12 items-center justify-center rounded-full group-hover:bg-accent">
              <Menu className="h-4 w-4" />
            </div>
            Menü
          </Button>
        ) : (
          <Button className="rounded-full" variant={'outline'}>
            Összes kategória
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side={isMobile ? 'right' : 'left'}>
        {/* <ScrollArea className="h-full w-full"> */}
        <SheetHeader className="sticky top-0 z-10 bg-white px-4 py-4">
          <SheetTitle className="flex items-center gap-2">
            Kategóriák
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 py-8">
          <ListGroup>
            {isArrayValid(fetcher.data?.result?.items) &&
              fetcher.data?.result?.items.map((option, index) => (
                <Popover key={index}>
                  <PopoverTrigger className="group/item">
                    <ListGroupItem
                      className='px-3 group-[[data-state="open"]]/item:bg-primary/5'
                      title={option.name}
                      link={`/collections/${option.slug}`}
                      imageSrc={option.featuredAsset?.preview}
                      imageClassName="h-10 w-10 rounded-full border"
                      showTitle={true}
                      showImage={true}
                      showTrailingIcon={true}
                      isLinkActive={false}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className="h-[calc(100vh)] w-[calc(100vw_-_385px)] border-l border-t-0 border-r-0 shadow-none rounded-none p-6 overflow-y-auto"
                    side={'right'}
                    sideOffset={0}
                  >
                    <CategoryMenuList collection={option} setOpen={setOpen} />
                  </PopoverContent>
                </Popover>
              ))}
          </ListGroup>
        </div>
        {/* </ScrollArea> */}
      </SheetContent>
    </Sheet>
  );
};

export default MenuButton;
