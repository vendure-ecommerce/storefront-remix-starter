import LinkCard from "~/components/cards/LinkCard";
import HistoryProductCard from "~/components/cards/product/HistoryProductCard";
import SectionContent from "~/components/common/section/SectionContent";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import SectionTitle from "./SectionTitle";

interface Product {
  id: string;
  title: string;
  link: string;
  priceNormal: number;
  priceNet: number;
  priceCrossed: number;
  imageSrc: string;
  hoverImageSrc: string;
}

interface HistoryProductProps {
  productHistoryList: Product[];
  error?: string;
}

const HistoryProduct: React.FC<HistoryProductProps> = ({ productHistoryList, error }) => {
  return (
    <Section className='gap-7'>
      <SectionHeader>
        <SectionTitle
          className='text-2xl'
          level='h2'
          title='Korábban megnézett termékek'
        />
      </SectionHeader>
      <SectionContent
        carouselItemClassName='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-[14.285%]'
        layoutType='carousel'
      >
        {error ? (
          <div>Error: {error}</div>
        ) : (
          productHistoryList.map((option, index) => (
            <HistoryProductCard
              key={index}
              id={option.id}
              title={option.title}
              link={option.link}
              priceNormal={option.priceNormal}
              priceNet={option.priceNet}
              priceCrossed={option.priceCrossed}
              imageSrc={option.imageSrc}
              hoverImageSrc={option.hoverImageSrc}
            />
          ))
        )}
        <LinkCard title='Összes előzmény' link='/collection/product/history' />
      </SectionContent>
    </Section>
  );
};

export default HistoryProduct;
