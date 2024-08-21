import { ChevronDown } from 'lucide-react';
import { FC } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { htmlDecode } from '~/utils/html-decode';

const ProductDescription: FC<{
  description: string;
}> = ({ description }) => {
  const htmlDecoded = htmlDecode(description);

  return (
    <Collapsible className="group/collapse">
      <CollapsibleTrigger className="flex h-14 w-full items-center justify-between gap-4 text-2xl font-bold">
        Leírás
        <ChevronDown className="h-6 w-6"></ChevronDown>
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">{htmlDecoded}</CollapsibleContent>
    </Collapsible>
  );
};

export default ProductDescription;
