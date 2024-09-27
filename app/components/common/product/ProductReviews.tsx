import { fakerHU as faker } from '@faker-js/faker';
import { ChevronDown } from 'lucide-react';
import { FC } from 'react';
import ReviewCard from '~/components/cards/review/ReviewCard';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';

const ProductReviews: FC<{
  reviews: any[];
}> = ({ reviews }) => {
  return (
    <Collapsible className="group/collapse">
      <CollapsibleTrigger className="flex h-14 w-full items-center justify-between gap-4 text-2xl font-bold">
        Értékelések
        <ChevronDown className="h-6 w-6"></ChevronDown>
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">
        {...Array(5).map((_, index) => (
          // <ReviewTitle key={index} title={faker.internet.domainName()} />
          <ReviewCard
            key={index}
            id={index.toString()}
            date={faker.date.past().toString()}
            rating={faker.number.int({ min: 1, max: 5 })}
            customer={[
              {
                imageSrc: faker.image.url(),
                link: faker.internet.url(),
                title: faker.person.fullName(),
              },
            ]}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProductReviews;
