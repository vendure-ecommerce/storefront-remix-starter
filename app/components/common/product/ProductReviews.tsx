

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const ProductReviews = () => {
  return (
    <Collapsible className='group/collapse'>
      <CollapsibleTrigger className='flex h-14 w-full items-center justify-between gap-4 text-2xl font-bold'>
        Értékelések
        <ChevronDown className='h-6 w-6'></ChevronDown>
      </CollapsibleTrigger>
      <CollapsibleContent className='py-4'>Értékelések...</CollapsibleContent>
    </Collapsible>
  );
};

export default ProductReviews;
