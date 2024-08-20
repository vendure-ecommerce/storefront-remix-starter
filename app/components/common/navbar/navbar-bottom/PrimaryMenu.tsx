import { Button } from "~/components/ui-custom/MyButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useCollections } from "~/providers/collections";

const PrimaryMenu = () => {
  const { collections } = useCollections();

  return (
    <>
      {collections.map((option, index) =>
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
        ) :  */(
          <Button
            key={index}
            className='flex items-center gap-2'
            variant='ghost'
            asChild
          >
            <a href={`/collections/${option.slug}`}>{option.name}</a>
          </Button>
        )
      )}
    </>
  );
};

export default PrimaryMenu;
