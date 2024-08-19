

import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionDescription from "~/components/common/section/SectionDescription";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui-custom/MyTabs";

interface TabItem {
  label: string; // A tab megjelenítendő címkéje
  value: string; // Az érték, amely azonosítja a tabot
}

interface ListingTabsProps {
  children: React.ReactNode;
  tabs: TabItem[];
  onChange: (value: string) => void;
}

const ListingTabs: React.FC<ListingTabsProps> = ({ children, tabs, onChange }) => {
  return (
    <Tabs defaultValue={tabs[0].value} className='flex flex-col gap-16'>
      <TabsList className='hidden flex-nowrap justify-stretch overflow-auto scrollbar-hide lg:flex'>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className='w-full'
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <Section className='!px-0'>
            <SectionHeader className='hidden'>
              <SectionTitle
                className='text-5xl'
                level='h2'
                title='További fűnyíró traktorok'
                srOnly
              />
              <SectionDescription>Leírás</SectionDescription>
            </SectionHeader>
            <SectionContent
              className='grid grid-cols-2 gap-item sm:grid-cols-[repeat(auto-fill,_minmax(13rem,_1fr))]'
              layoutType='grid'
            >
              {children}
            </SectionContent>
          </Section>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ListingTabs;
