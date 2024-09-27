"use client";

import dummy from "../../../_dummy/dummy_sanitech.json";
import AddressCard from "~/components/cards/AddressCard";
import MenuCard from "~/components/cards/MenuCard";
import OrdertCard from "~/components/cards/order/OrderCard";
import ProductCard from "~/components/cards/product/ProductCard";
import ProductReviewCard from "~/components/cards/review/ProductReviewCard";
import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import PageTitle from "~/components/pages/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Mail, Newspaper, UserRoundX } from "lucide-react";

export default function Dashboard() {
  const productOptions = dummy.productOptions;
  const orderOptions = dummy.orderOptions;
  const productReviewOptions = dummy.productReviewOptions;
  const addressOptions = dummy.addressOptions;
  const customer = dummy.customerOptions[0];

  return (
    <>
      <PageTitle title={"Vezérlőpult"} srOnly />
      <Section>
        <SectionHeader className='flex flex-col items-center gap-4 rounded-lg border bg-white p-12'>
          <Avatar className='h-16 w-16 ring-[1px] ring-border'>
            <AvatarImage
              src={customer.imageSrc}
              alt={customer.title}
              width={64}
              height={64}
            />
            <AvatarFallback>{customer.title.charAt(0)}</AvatarFallback>
          </Avatar>
          <SectionTitle title={`Üdv ${customer.title}!`} level='h2' />
        </SectionHeader>
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle
            className='text-5xl'
            level='h2'
            title='Rendelési előzmények'
          />
        </SectionHeader>
        <SectionContent
          layoutType='carousel'
          carouselItemClassName='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5'
        >
          {orderOptions.slice(0, 8).map((option, index) => (
            <OrdertCard
              key={index}
              id={option.id}
              title={option.title}
              link={option.link}
              date={option.date}
              imageSrc={option.imageSrc}
              connectedProducts={option.connectedProducts}
            />
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className='text-5xl'
            level='h2'
            title='Kedvenc termékek'
          />
        </SectionHeader>
        <SectionContent
          layoutType='carousel'
          carouselItemClassName='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5'
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
              isFavorite
              showCardFooter={false}
            />
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle className='text-5xl' level='h2' title='Értékelések' />
        </SectionHeader>
        <SectionContent
          layoutType='carousel'
          carouselItemClassName='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5'
        >
          {productReviewOptions.slice(0, 8).map((option, index) => (
            <ProductReviewCard
              key={index}
              id={option.id}
              title={option.title}
              imageSrc={option.imageSrc}
              rating={option.rating}
              textRating={option.textRating}
            />
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className='text-5xl'
            level='h2'
            title='Szállítási címek'
          />
        </SectionHeader>
        <SectionContent
          className='grid grid-cols-1 gap-item sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
          layoutType='grid'
        >
          {addressOptions.map((option, index) => (
            <AddressCard key={index} title={option.title} type='shipping' />
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className='text-5xl'
            level='h2'
            title='Számlázási adatok'
          />
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

      <Section>
        <SectionHeader>
          <SectionTitle
            className='text-5xl'
            level='h2'
            title='Feliratkozások'
          />
        </SectionHeader>
        <SectionContent
          className='grid grid-cols-1 gap-item md:grid-cols-3'
          layoutType='grid'
        >
          <MenuCard title='Email értesítések' icon={<Mail />} />
          <MenuCard title='Hírlevél' icon={<Newspaper />} />
          <MenuCard title='Fiók törlése' icon={<UserRoundX />} />
        </SectionContent>
      </Section>

      {/* <Section>
        <SectionHeader>
          <SectionTitle className='text-5xl' level='h2' title='Tevékenységek' />
        </SectionHeader>
        <SectionContent className='grid grid-cols-3 gap-12' layoutType='grid'>
          <MenuCard title='Visszajelzés küldése' icon={<Megaphone />} />
        </SectionContent>
      </Section> */}
    </>
  );
}
