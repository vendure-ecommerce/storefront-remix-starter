"use client";

import dummy from "../../../../_dummy/dummy_sanitech.json";
import AddressCard from "~/components/cards/AddressCard";
import DataCard from "~/components/cards/DataCard";
import HorizontalProductCard from "~/components/cards/product/HorizontalProductCard";
import Section from "~/components/common/section/Section";
import SectionContent from "~/components/common/section/SectionContent";
import SectionHeader from "~/components/common/section/SectionHeader";
import SectionTitle from "~/components/common/section/SectionTitle";
import Summary from "~/components/common/summary/Summary";
import SummaryDiscount from "~/components/common/summary/SummaryDiscount";
import SummaryShippingCost from "~/components/common/summary/SummaryShippingCost";
import SummarySubTotal from "~/components/common/summary/SummarySubTotal";
import SummaryTaxRate from "~/components/common/summary/SummaryTaxRate";
import SummaryTotal from "~/components/common/summary/SummaryTotal";
import PageTitle from "~/components/pages/PageTitle";
import { Avatar } from "~/components/ui/avatar";
import {
  Calendar,
  CreditCard,
  FileText,
  Hash,
  Mail,
  ShoppingCart,
  Truck,
} from "lucide-react";

export default function Order() {
  const product = dummy.productOptions[0];
  const addressOptions = dummy.addressOptions;

  return (
    <>
      <PageTitle title={"Rendelés részletei"} />

      <div className='relative mx-auto grid max-w-screen-sm grid-cols-1 gap-16 lg:max-w-full lg:grid-cols-2 lg:gap-20'>
        <div className='flex flex-col gap-16'>
          <Section className='gap-12'>
            <SectionHeader>
              <div className='flex items-center gap-4'>
                <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                  <Mail className='h-7 w-7 text-color-primary-foreground' />
                </Avatar>
                <SectionTitle
                  level='h3'
                  title='Megrendelés visszigazolást küldtünk a címre'
                  className='text-xl'
                />
              </div>
            </SectionHeader>
            <SectionContent className='flex pl-[4.5rem]'>
              <DataCard title='megadott@email.com' />
            </SectionContent>
          </Section>
          <Section className='gap-12'>
            <SectionHeader>
              <div className='flex items-center gap-4'>
                <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                  <Hash className='h-7 w-7 text-color-primary-foreground' />
                </Avatar>
                <SectionTitle
                  level='h3'
                  title='Az Ön rendelési száma'
                  className='text-xl'
                />
              </div>
            </SectionHeader>
            <SectionContent className='flex pl-[4.5rem]'>
              <DataCard title='218489HT83' />
            </SectionContent>
          </Section>
          <Section className='gap-12'>
            <SectionHeader>
              <div className='flex items-center gap-4'>
                <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                  <FileText className='h-7 w-7 text-color-primary-foreground' />
                </Avatar>
                <SectionTitle
                  level='h3'
                  title='Számlázási adatok'
                  className='text-xl'
                />
              </div>
            </SectionHeader>
            <SectionContent className='flex flex-col gap-12 pl-[4.5rem]'>
              {addressOptions.slice(0, 1).map((option, index) => (
                <AddressCard key={index} title={option.title} type='billing' />
              ))}
            </SectionContent>
          </Section>
          <Section className='gap-12'>
            <SectionHeader>
              <div className='flex items-center gap-4'>
                <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                  <CreditCard className='h-7 w-7 text-color-primary-foreground' />
                </Avatar>
                <SectionTitle
                  level='h3'
                  title='Fizetési mód'
                  className='text-xl'
                />
              </div>
            </SectionHeader>
            <SectionContent className='flex pl-[4.5rem]'>
              <DataCard title='Bankkártyás fizetés' />
            </SectionContent>
          </Section>
          <Section className='gap-12'>
            <SectionHeader>
              <div className='flex items-center gap-4'>
                <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                  <Truck className='h-7 w-7 text-color-primary-foreground' />
                </Avatar>
                <SectionTitle
                  level='h3'
                  title='Szállítás'
                  className='text-xl'
                />
              </div>
            </SectionHeader>
            <SectionContent className='flex flex-col gap-12 pl-[4.5rem]'>
              {addressOptions.slice(0, 1).map((option, index) => (
                <AddressCard key={index} title={option.title} type='shipping' />
              ))}
              <DataCard title='Személyes átvétel - Budapest (1203, Határ út 38.) Csütörtökönként 14:00-tól' />
            </SectionContent>
          </Section>
          <Section className='gap-12'>
            <SectionHeader>
              <div className='flex items-center gap-4'>
                <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                  <Calendar className='h-7 w-7 text-color-primary-foreground' />
                </Avatar>
                <SectionTitle
                  level='h3'
                  title='Várható kézbesítés'
                  className='text-xl'
                />
              </div>
            </SectionHeader>
            <SectionContent className='flex pl-[4.5rem]'>
              <DataCard title='Augusztus 9. - 15.' />
            </SectionContent>
          </Section>
        </div>
        <Section className='gap-12'>
          <SectionHeader>
            <div className='flex items-center gap-4'>
              <Avatar className='h-14 w-14 items-center justify-center bg-primary text-xl font-bold text-color-primary-foreground'>
                <ShoppingCart className='h-7 w-7 text-color-primary-foreground' />
              </Avatar>
              <SectionTitle level='h3' title='Termékek' className='text-xl' />
            </div>
          </SectionHeader>
          <SectionContent className='flex flex-col gap-16'>
            <div className='flex flex-col gap-6'>
              {[...Array(3)].map((_, index) => (
                <HorizontalProductCard
                  key={index}
                  title={product.title}
                  number={product.number}
                  priceNormal={product.priceNormal}
                  priceNet={product.priceNet}
                  priceCrossed={product.priceCrossed}
                  imageSrc={product.imageSrc}
                  showAddToCartHandler={false}
                  variant='sm'
                >
                  {product.connectedProducts &&
                    product.connectedProducts.map((connectedProduct, index) => (
                      <HorizontalProductCard
                        key={index}
                        title={connectedProduct.title}
                        number={connectedProduct.number}
                        priceNormal={connectedProduct.priceNormal}
                        priceNet={connectedProduct.priceNet}
                        priceCrossed={connectedProduct.priceCrossed}
                        imageSrc={connectedProduct.imageSrc}
                        isConnected={true}
                        showAddToCartHandler={false}
                        variant='sm'
                      />
                    ))}
                </HorizontalProductCard>
              ))}
            </div>
            <Section className='flex flex-col gap-8 px-0'>
              <SectionHeader className='hidden'>
                <SectionTitle level='h3' title='Összesítő táblázat' srOnly />
              </SectionHeader>
              <SectionContent className='grid grid-cols-1 gap-4'>
                <Summary>
                  <div className='flex flex-col gap-2'>
                    <SummarySubTotal />
                    <SummaryTaxRate />
                    <SummaryShippingCost />
                    <SummaryDiscount />
                  </div>
                  <SummaryTotal />
                </Summary>
              </SectionContent>
            </Section>
          </SectionContent>
        </Section>
      </div>
    </>
  );
}
