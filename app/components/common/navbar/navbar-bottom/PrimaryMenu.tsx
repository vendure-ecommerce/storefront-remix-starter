import { Button } from '~/components/ui-custom/MyButton';
import { useCollections } from '~/providers/collections';

const PrimaryMenu = () => {
  const { collectionsItems } = useCollections();

  return (
    <>
      {collectionsItems &&
        collectionsItems.map((option, index) => (
          /* option.megaMenu ? (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <Button className='flex items-center gap-2' variant='ghost'>
                {option.title}
                <ChevronDown className='h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent>Megamenü</PopoverContent>
          </Popover>
        ) :  */ <Button
            key={index}
            className="flex items-center gap-2"
            variant="ghost"
            asChild
          >
            <a href={`/collections/${option.slug}`}>{option.name}</a>
          </Button>
        ))}
    </>
  );
};

export default PrimaryMenu;
