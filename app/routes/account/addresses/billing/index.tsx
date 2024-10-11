"use client";

import dummy from "../../../../_dummy/dummy_sanitech.json";
import AddressCard from "~/components/cards/AddressCard";
import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import ListingInfo from "~/components/listing/ListingInfo";
import PageTitle from "~/components/pages/PageTitle";
import { Button } from "~/components/ui-custom/MyButton";
import { Plus } from "lucide-react";

export default function Billing() {
  const addressOptions = dummy.addressOptions;

  return (
    <>
      <PageTitle title={"Számlázási adatok"} />

      <Section className='gap-8'>
        <SectionHeader>
          <SectionTitle
            className='text-5xl'
            level='h2'
            title='Számlázási adatok'
            srOnly
          />
          <div className='flex items-center justify-between gap-4'>
            <ListingInfo />
            <Button variant={"default"}>
              <Plus className='mr-2 h-4 w-4' />
              Új számlázási cím
            </Button>
          </div>
        </SectionHeader>
        <SectionContent
          className='grid grid-cols-1 gap-item sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
          layoutType='grid'
        >
          {addressOptions.map((option, index) => (
            <AddressCard key={index} title={option.title} type='billing' />
          ))}
        </SectionContent>
      </Section>
    </>
  );
}
