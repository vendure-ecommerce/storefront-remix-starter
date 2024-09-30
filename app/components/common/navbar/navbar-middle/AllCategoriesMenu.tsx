import { Button } from '~/components/ui-custom/MyButton';
import { ScrollArea } from '~/components/ui-custom/MyScrollArea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui-custom/MySheet';
import ListGroup from '../../list/ListGroup';
import ListGroupItem from '../../list/ListGroupItem';
import { useCollections } from '../Navbar';

export const AllCategoriesMenu = () => {
  const { collectionsItems } = useCollections();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full" variant={'outline'}>
          Összes kategória
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <ScrollArea className="h-full w-full">
          <SheetHeader className="sticky top-0 z-10 bg-white px-4 py-4">
            <SheetTitle className="flex items-center gap-2">
              Kategóriák
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-8 py-8">
            <ListGroup>
              {collectionsItems.map((option, index) => (
                <ListGroupItem
                  key={index}
                  className="px-3"
                  title={option.name}
                  showTitle={true}
                  link={option.slug}
                  imageSrc={option.featuredAsset?.preview}
                  imageClassName="h-10 w-10 rounded-full border"
                  showImage={true}
                  showTrailingIcon={true}
                />
              ))}
            </ListGroup>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
