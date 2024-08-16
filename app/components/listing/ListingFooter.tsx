

import { ChevronDown } from "lucide-react";
import ListingInfo from "./ListingInfo";
import { Progress } from "~/components/ui-custom/MyProgress";
import { Button } from "~/components/ui-custom/MyButton";

const ListingFooter = () => {
  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='flex flex-col items-center gap-4'>
        <ListingInfo />
        <Progress className='h-1 w-80' value={33} />
      </div>
      <Button>
        Továbbiak megjelenítése
        <ChevronDown className='ml-2 h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFooter;
