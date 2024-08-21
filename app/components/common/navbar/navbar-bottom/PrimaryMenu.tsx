import { Link } from '@remix-run/react';
import { Button } from '~/components/ui-custom/MyButton';
import { useCollections } from '~/providers/collections';
import { isArrayValid } from '~/utils';

const PrimaryMenu = () => {
  const { collections } = useCollections();

  return (
    <>
      {isArrayValid(collections) &&
        collections.map((option, index) => (
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
            <Link prefetch="intent" to={`/collections/${option.slug}`}>
              {option.name}
            </Link>
          </Button>
        ))}
    </>
  );
};

export default PrimaryMenu;
