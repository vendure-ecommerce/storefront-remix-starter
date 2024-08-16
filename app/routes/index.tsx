import { useLoaderData } from '@remix-run/react';
import { LoaderArgs } from '@remix-run/server-runtime';
import { useTranslation } from 'react-i18next';
import { getCollections } from '~/providers/collections/collections';
import { useViewportWidth } from '~/utils/use-viewport-width';
import LinkCard from '../components/cards/LinkCard';
import ListGroup from '../components/common/list/ListGroup';
import ListGroupItem from '../components/common/list/ListGroupItem';
import HistoryProduct from '../components/common/section/HistoryProduct';
import Section from '../components/common/section/Section';
import SectionContent from '../components/common/section/SectionContent';
import SectionDescription from '../components/common/section/SectionDescription';
import SectionFooter from '../components/common/section/SectionFooter';
import SectionHeader from '../components/common/section/SectionHeader';
import SectionTitle from '../components/common/section/SectionTitle';
import Usp from '../components/common/section/Usp';
import HeroGrid from '../components/pages/home/HeroGrid';

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request, { take: 20 });

  return {
    collections,
  };
}

export default function Index() {
  const { collections } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const width = useViewportWidth();
  const isMobile = width < 1024;

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-20 px-6 py-12">
      <div className="flex">
        {isMobile ? null : (
          <div className="hidden w-full max-w-[24.5rem] -translate-x-6 lg:block max-h-[600px] overflow-y-auto">
            <ListGroup>
              {collections.map((option, index) => (
                <ListGroupItem
                  key={index}
                  className="px-3"
                  title={option.name}
                  showTitle={true}
                  link={`/collections/${option.slug}`}
                  imageSrc={option.featuredAsset?.preview}
                  imageClassName="h-10 w-10 rounded-full border"
                  showImage={true}
                  showTrailingIcon={true}
                />
              ))}
            </ListGroup>
          </div>
        )}
        <HeroGrid
          collections={collections
            // .sort(() => 0.5 - Math.random())
            .slice(0, 4)}
        />
      </div>

      <Usp />

      <Section>
        <SectionHeader>
          <SectionTitle
            className="text-5xl"
            level="h2"
            title="Arcadia evőeszköz család"
          />
          <SectionDescription>Arcadia evőeszköz tsalád</SectionDescription>
        </SectionHeader>
        <SectionContent
          carouselItemClassName="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
          layoutType="carousel"
        >
          {/* {products.slice(0, 8).map((option, index) => (
            <ProductCard
              key={index}
              id={option.id}
              title={option.title}
              link={option.link}
              number={option.number}
              priceNormal={option.priceNormal}
              priceNet={option.priceNet}
              priceCrossed={option.priceCrossed}
              imageSrc={option.imageSrc}
              hoverImageSrc={option.hoverImageSrc}
              rating={option.rating}
              reviews={option.reviews}
              manufacturer={option.manufacturer}
            />
          ))} */}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className="text-5xl" level="h2" title="Kategóriák" />
          <SectionDescription>Kategóriák</SectionDescription>
        </SectionHeader>
        <SectionContent
          carouselItemClassName="flex grow basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-[14.285%]"
          layoutType="carousel"
        >
          {/* {categoryOptions.map((option, index) => (
            <CategoryCard
              key={index}
              id={option.id}
              title={option.title}
              link={option.link}
              imageSrc={option.imageSrc}
              productCount={option.productCount}
              sampleProducts={option.sampleProducts}
            />
          ))} */}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className="text-5xl" level="h2" title="Márkák" />
          <SectionDescription>Leírás</SectionDescription>
        </SectionHeader>
        <SectionContent
          carouselItemClassName="flex grow basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-[14.285%]"
          layoutType="carousel"
        >
          {/* {manufacturerOptions.map((option, index) => (
            <ManufacturerCard
              key={index}
              id={option.id}
              title={option.title}
              link={option.link}
              imageSrc={option.imageSrc}
              productCount={option.productCount}
              sampleProducts={option.sampleProducts}
              showAvatarGroup={false}
              showProductCount={false}
            />
          ))} */}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className="text-5xl"
            level="h2"
            title="Cikkek és tippek a vásárlás segítéséhez"
          />
          <SectionDescription>Leírás</SectionDescription>
        </SectionHeader>
        <SectionContent
          className="grid grid-cols-2 gap-item sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          layoutType="grid"
        >
          {/* {articleOptions.map((option, index) => (
            <ArticleCard
              key={index}
              id={option.id}
              title={option.title}
              link={option.link}
              imageSrc={option.imageSrc}
              description={option.description}
              author={option.author}
              category={option.category}
            />
          ))} */}
          <LinkCard title="További bejegyzések" link="/collection/article" />
        </SectionContent>
        <SectionFooter>
          {/* <a href='/collection/article'>
            <Button>További bejegyzések</Button>
          </a> */}
        </SectionFooter>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className="text-5xl"
            level="h2"
            title="Rólunk mondták"
          />
          <SectionDescription>Leírás</SectionDescription>
        </SectionHeader>
        <SectionContent
          carouselItemClassName="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          layoutType="carousel"
        >
          {/* {reviewOptions.map((option, index) => (
            <ReviewCard
              key={index}
              id={option.id}
              title={option.title}
              imageSrc={option.imageSrc}
              date={option.date}
              customer={option.customer}
              rating={option.rating}
            />
          ))} */}
        </SectionContent>
      </Section>

      <HistoryProduct />
    </div>
  );
}
