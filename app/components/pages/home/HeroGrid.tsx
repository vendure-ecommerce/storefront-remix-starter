import HeroCard from "~/components/cards/HeroCard";
import GridLayout from "~/components/common/GridLayout";

interface HeroGridProps {}

const HeroGrid: React.FC<HeroGridProps> = ({}) => {
  // const heroGridOptions = dummy.heroGridOptions;

  return (
    <GridLayout className='grid w-full gap-item xl:grid-flow-col xl:grid-rows-3'>
      <></>
      {/* {heroGridOptions.map((option, index) => (
        <HeroCard
          key={index}
          imageSrc={option.imageSrc}
          title={option.title}
          description={option.description}
          link={option.link}
          className='row-span-1 xl:first:col-span-2 xl:first:row-span-3'
        />
      ))} */}
    </GridLayout>
  );
};

export default HeroGrid;
