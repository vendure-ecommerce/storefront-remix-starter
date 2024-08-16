

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const ProductDescription = () => {
  return (
    <Collapsible className='group/collapse'>
      <CollapsibleTrigger className='flex h-14 w-full items-center justify-between gap-4 text-2xl font-bold'>
        Leírás
        <ChevronDown className='h-6 w-6'></ChevronDown>
      </CollapsibleTrigger>
      <CollapsibleContent className='py-4'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad illum
        reiciendis molestiae dignissimos tempore quas, ullam nesciunt veritatis
        doloribus. Enim quasi, laudantium facilis vel quos quo cum illum libero
        totam.
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProductDescription;
