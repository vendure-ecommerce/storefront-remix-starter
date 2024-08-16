import HeroCard from '~/components/cards/HeroCard';
import GridLayout from '~/components/common/GridLayout';
import { getCollections } from '~/providers/collections/collections';

interface HeroGridProps {
  collections: Awaited<ReturnType<typeof getCollections>>;
}

const HeroGrid: React.FC<HeroGridProps> = ({ collections }) => {
  // const heroGridOptions = dummy.heroGridOptions;

  return (
    <GridLayout className="grid w-full gap-item xl:grid-flow-col xl:grid-rows-3 max-h-[600px]">
      {collections.map((option, index) => (
        <HeroCard
          key={index}
          imageSrc={option.featuredAsset?.preview}
          title={option.name}
          description={option.description}
          link={`/collections/${option.slug}`}
          className="row-span-1 xl:first:col-span-2 xl:first:row-span-3"
          style={index > 0 ? { gridColumn: 'span 1', gridRow: 'span 1' } : {}}
        />
      ))}
    </GridLayout>
  );
};

export default HeroGrid;
