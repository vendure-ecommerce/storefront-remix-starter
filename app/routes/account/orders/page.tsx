"use client";

import OrderSummaryCard from "~/components/cards/order/OrderSummaryCard";
import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import HorizontalFilterBar from "~/components/filter/horizontal/HorizontalFilterBar";
import ListingFooter from "~/components/listing/ListingFooter";
import PageTitle from "~/components/pages/PageTitle";

export default function Orders() {
  return (
    <>
      <PageTitle title={"Rendelési előzmények"} />

      <HorizontalFilterBar />

      <Section>
        <SectionHeader className='hidden'>
          <SectionTitle
            className='text-5xl'
            level='h2'
            title='Rendelési értesítések'
            srOnly
          />
        </SectionHeader>
        <SectionContent className='grid grid-cols-1 gap-32'>
          {[...Array(3)].map((_, index) => (
            <OrderSummaryCard key={index} />
          ))}
        </SectionContent>
        <ListingFooter />
      </Section>
    </>
  );
}
