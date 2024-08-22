import {
  Grid,
  History,
  Info,
  MoveRight,
  MoveUpRight,
  Search,
  Tag,
  X,
} from "lucide-react";
import SuggestedProductCard from "../cards/product/SuggestedProductCard";
import GridLayout from "../common/GridLayout";
import Section from "../common/section/Section";
import SectionHeader from "../common/section/SectionHeader";
import SectionTitle from "../common/section/SectionTitle";
import { Badge } from "../ui-custom/MyBadge";
import { Button } from "../ui-custom/MyButton";
import { Card } from "../ui-custom/MyCard";
import { ScrollArea } from "../ui-custom/MyScrollArea";
import { faker } from "@faker-js/faker";

interface IAutoSuggestionProps {
  totalItems: number;
  items: any[];
}

const AutoSuggestion = ({ items, totalItems }: IAutoSuggestionProps) => {

  return (
    <Card
      className={`w-full overflow-auto rounded-none border-none shadow-none`}
    >
      <div className='flex h-full gap-x-[4.5rem] overflow-auto'>
        <ScrollArea className='w-full lg:max-w-xs'>
          <div className='flex flex-col gap-8'>
            <Section className='flex flex-col gap-2'>
              <SectionHeader>
                <SectionTitle
                  level='h3'
                  title='Keresési előzmények'
                  className='text-lg font-bold'
                />
              </SectionHeader>
              <div>
                <div className='flex h-14 items-center gap-4'>
                  <div className='flex items-center justify-center'>
                    <History className='h-5 w-5' />
                  </div>
                  <div className='text-color-secondary'>Keresési előzmény</div>
                  <Button className='ml-auto' variant={"ghost"} size={"icon"}>
                    <X className='h-5 w-5' />
                  </Button>
                </div>
                <div className='flex h-14 items-center gap-4'>
                  <div className='flex items-center justify-center'>
                    <History className='h-5 w-5' />
                  </div>
                  <div className='text-color-secondary'>Keresési előzmény</div>
                  <Button className='ml-auto' variant={"ghost"} size={"icon"}>
                    <X className='h-5 w-5' />
                  </Button>
                </div>
              </div>
            </Section>
            <Section className='flex flex-col gap-2'>
              <SectionHeader>
                <SectionTitle
                  level='h3'
                  title='Keresések'
                  className='text-lg font-bold'
                />
              </SectionHeader>
              <div className='flex flex-col'>
                <div className='flex h-14 items-center gap-4'>
                  <div className='flex items-center justify-center'>
                    <Search className='h-5 w-5' />
                  </div>
                  <div className='text-color-secondary'>Keresés</div>
                  <Button className='ml-auto' variant={"ghost"} size={"icon"}>
                    <MoveUpRight className='h-5 w-5' />
                  </Button>
                </div>
                <div className='flex h-14 items-center gap-4'>
                  <div className='flex items-center justify-center'>
                    <Search className='h-5 w-5' />
                  </div>
                  <div className='text-color-secondary'>Keresés</div>
                  <Button className='ml-auto' variant={"ghost"} size={"icon"}>
                    <MoveUpRight className='h-5 w-5' />
                  </Button>
                </div>
                <div className='flex h-14 items-center gap-4'>
                  <div className='flex items-center justify-center'>
                    <Grid className='h-5 w-5' />
                  </div>
                  <div>
                    <div className='text-color-secondary'>Kategória </div>
                    <div className='text-xs text-color-tertiary'>Fűnyírás</div>
                  </div>
                  <Button className='ml-auto' variant={"ghost"} size={"icon"}>
                    <MoveRight className='h-5 w-5' />
                  </Button>
                </div>
                <div className='flex h-14 items-center gap-4'>
                  <div className='flex items-center justify-center'>
                    <Tag className='h-5 w-5' />
                  </div>
                  <div>
                    <div className='text-color-secondary'>Márka</div>
                  </div>
                </div>
                <div className='flex h-14 items-center gap-4'>
                  <div className='flex items-center justify-center'>
                    <Info className='h-5 w-5' />
                  </div>
                  <div>
                    <div className='text-color-secondary'>Információ</div>
                    <div className='text-xs text-color-tertiary'>Fűnyírás</div>
                  </div>
                </div>
              </div>
            </Section>
            <div>
              <Section className='flex flex-col gap-6'>
                <SectionHeader>
                  <SectionTitle
                    level='h3'
                    title='Népszerű keresések'
                    className='text-lg font-bold'
                  />
                </SectionHeader>
                <div className='flex gap-4'>
                  <Badge className='rounded-full' variant={"outline"}>
                    Címke
                  </Badge>
                  <Badge className='rounded-full' variant={"outline"}>
                    Címke
                  </Badge>
                </div>
              </Section>
            </div>
          </div>
        </ScrollArea>
        <ScrollArea className='hidden lg:block'>
          <Section className='flex flex-grow flex-col gap-4 min-w-[1000px]'>
            <SectionHeader className='!flex-row items-center justify-between'>
              <SectionTitle
                level='h3'
                title='Termék kategória'
                className='text-lg'
              />
              <Badge className='rounded-full'>{totalItems || 0} db</Badge>
            </SectionHeader>
            {/* Results */}
            <GridLayout>
              {items.map((option, index) => {
                const image = faker.image.url();
                return (
                  <SuggestedProductCard
                    key={index}
                    id={option.id}
                    title={option.productName}
                    link={option.slug}
                    priceNormal={option.price.min}
                    priceNet={option.price.min}
                    priceCrossed={option.price.max}
                    imageSrc={option.productAsset.preview}
                    hoverImageSrc={option.productAsset.preview}
                  />
                );
              }
            )}
            </GridLayout>
            {/* Results */}
            {/* No result */}
            <output id='no-results'></output>
            {/* No result */}
          </Section>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default AutoSuggestion;
