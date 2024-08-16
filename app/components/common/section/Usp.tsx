import UspCard from "~/components/cards/UspCard";
import SectionContent from "~/components/common/section/SectionContent";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import SectionTitle from "./SectionTitle";

const Usp: React.FC = () => {
  // const uspCardOptions = dummy.uspCardOptions;

  return (
    <Section>
      <SectionHeader className='hidden'>
        <SectionTitle level='h2' title='Miért vásároljon nálunk?' srOnly />
      </SectionHeader>
      <SectionContent
        className='grid grid-cols-1 gap-item sm:grid-cols-2 lg:grid-cols-4'
        layoutType='grid'
      >
        {/* {uspCardOptions.map((option, index) => (
          <UspCard
            key={index}
            id={option.id}
            imageSrc={option.imageSrc}
            title={option.title}
            description={option.description}
          />
        ))} */}
      </SectionContent>
    </Section>
  );
};

export default Usp;
