import Section from '~/components/common/section/Section';
import SectionContent from '~/components/common/section/SectionContent';
import SectionHeader from '~/components/common/section/SectionHeader';
import SectionTitle from '~/components/common/section/SectionTitle';
import { Button } from '~/components/ui-custom/MyButton';
import { Separator } from '~/components/ui/separator';
import ResetFilterButton from '../common/ResetFilterButton';
import HorizontalFilterDropdown from './HorizontalFilterDropdown';

const HorizontalFilterBar = () => {
  // const filterChipsOptions = dummy.filterChipsOptions;

  return (
    <Section>
      <SectionHeader className="hidden">
        <SectionTitle level="h2" title="Termékszűrő" srOnly />
      </SectionHeader>
      <SectionContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {[...Array(5)].map((_, index) => (
            <HorizontalFilterDropdown key={index} />
          ))}
          <Button variant={'default'}>Minden szűrő</Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-4">
          {/* {filterChipsOptions.map((option, index) => (
            <RemoveChip
              key={index}
              attribute={option.attribute}
              value={option.value}
              onClose={() => console.log("close")}
            ></RemoveChip>
          ))} */}
          <ResetFilterButton variant={'outline'} size={'xs'} />
        </div>
      </SectionContent>
    </Section>
  );
};

export default HorizontalFilterBar;
