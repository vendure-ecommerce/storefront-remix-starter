"use client";

import dummy from "../../../_dummy/dummy_sanitech.json";
import ProductCard from "~/components/cards/product/ProductCard";
import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import ListingFooter from "~/components/listing/ListingFooter";
import ListingHeader from "~/components/listing/ListingHeader";
import ListingTabs from "~/components/listing/ListingTabs";
import PageTitle from "~/components/pages/PageTitle";

export default function Favorites() {
  const productOptions = dummy.productOptions;

  return (
    <>
      <PageTitle title={"Kedvenc termékek"} />
      <div className='flex w-full flex-col gap-8'>
        <ListingHeader
          showListingInfo={true}
          showProductCompareSwitch={false}
          showListingOrder={true}
        />
        {/* <ListingTabs
            tabs={[
              { label: "Alapértelmezett", value: "default" },
              { label: "Drágák elöl", value: "price-from-expensive" },
              { label: "Olcsók elöl", value: "price-from-cheap" },
              { label: "Név szerint A - Z", value: "name-a-z" },
              { label: "Név szerint Z - A", value: "name-z-a" },
              { label: "Legnagyobb kedvezmény", value: "most-special" },
              { label: "Legjobbra értékelt", value: "best-rating" },
            ]}
          >
            {productOptions.map((option, index) => (
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
                isFavorite={true}
              />
            ))}
          </ListingTabs> */}
        <Section>
          <SectionHeader className='hidden'>
            <SectionTitle
              className='text-5xl'
              level='h2'
              title='Arcadia evőeszköz család'
              srOnly
            />
          </SectionHeader>
          <SectionContent
            className='grid grid-cols-2 gap-item sm:grid-cols-[repeat(auto-fill,_minmax(13rem,_1fr))]'
            layoutType='grid'
          >
            {productOptions.slice(0, 8).map((option, index) => (
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
                isFavorite={true}
              />
            ))}
          </SectionContent>
        </Section>
        <ListingFooter />
      </div>
    </>
  );
}
