

import { Card, CardTitle } from "~/components/ui-custom/MyCard";
import { ChevronRight } from "lucide-react";

const ConnectedProductCard = () => {
  return (
    <a href='#alsolike'>
      <Card className='flex items-center gap-4 border shadow-none hover:bg-primary/5 transition pr-2'>
        <div className='flex-none rounded-lg overflow-hidden bg-muted'>
          <img
            className='rounded-lg aspect-square p-2 object-contain object-center'
            src='https://sanitech.hu/image/cache/catalog/termek/pad-6261445_arcadia-rozsdamentes-acel-szervizvilla/arcadia-rozsdamentes-acel-szervizvilla-1-56x383.webp'
            width={60}
            height={60}
            alt='Kategóriakép'
          />
        </div>
        <CardTitle className='text-sm'>2 hasonló termék</CardTitle>
        <div className='ml-auto'>
          <ChevronRight className='h-4 w-4' />
        </div>
      </Card>
    </a>
  );
};

export default ConnectedProductCard;
