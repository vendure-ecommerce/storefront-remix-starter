import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import HorizontalProductCard from '~/components/cards/product/HorizontalProductCard';
import ProductCard from '~/components/cards/product/ProductCard';
import UserCard from '~/components/cards/user/UserCard';
import DeliveryInformation from '~/components/common/section/DeliveryInformation';
import Section from '~/components/common/section/Section';
import SectionContent from '~/components/common/section/SectionContent';
import SectionDescription from '~/components/common/section/SectionDescription';
import SectionFooter from '~/components/common/section/SectionFooter';
import SectionHeader from '~/components/common/section/SectionHeader';
import SectionTitle from '~/components/common/section/SectionTitle';
import Summary from '~/components/common/summary/Summary';
import SummaryDiscount from '~/components/common/summary/SummaryDiscount';
import SummaryTotal from '~/components/common/summary/SummaryProductTotal';
import SummaryShippingCost from '~/components/common/summary/SummaryShippingCost';
import SummarySubTotal from '~/components/common/summary/SummarySubTotal';
import SummaryTaxRate from '~/components/common/summary/SummaryTaxRate';
import PageTitle from '~/components/pages/PageTitle';
import { Button } from '~/components/ui-custom/MyButton';

export default function Cart() {
  const product = {} as any;
  const productOptions = null;

  return (
    <>
      <div className="flex flex-col gap-y-16">
        <Breadcrumbs items={[]} />
        <PageTitle title="5 termék a kosárban" />
        <Section className="grid grid-cols-1 gap-x-20 gap-y-20 lg:grid-cols-[50%_minmax(0,_1fr)]">
          <div className="flex flex-col gap-6">
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
                showProductAmountStepper={true}
                variant="sm"
              >
                {product.connectedProducts &&
                  (product.connectedProducts as Array<any>)?.map(
                    (connectedProduct, index) => (
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
                        showProductAmountStepper={true}
                        variant="sm"
                      />
                    ),
                  )}
              </HorizontalProductCard>
            ))}
          </div>
          <div className="flex flex-col gap-16">
            <Section className="flex flex-col gap-8 px-0">
              <SectionHeader className="hidden">
                <SectionTitle level="h3" title="Összesítő táblázat" srOnly />
              </SectionHeader>
              <SectionContent className="grid grid-cols-1 gap-4">
                <Summary>
                  <div className="flex flex-col gap-2">
                    <SummarySubTotal />
                    <SummaryTaxRate />
                    <SummaryShippingCost />
                    <SummaryDiscount />
                  </div>
                  <SummaryTotal />
                </Summary>
              </SectionContent>
              <SectionFooter>
                <a className="w-full" href="/checkout">
                  <Button className="h-16 w-full text-xl">
                    Biztonságos fizetés
                  </Button>
                </a>
              </SectionFooter>
            </Section>

            <DeliveryInformation />

            <Section className="gap-16">
              <SectionHeader>
                <SectionTitle
                  level="h2"
                  title="Ingyenes szaktanácsadás szakértőinktől:"
                  className="text-xl"
                />
              </SectionHeader>
              <SectionContent
                className="flex flex-wrap gap-6"
                layoutType="default"
              >
                {[...Array(3)].map((_, index) => (
                  <UserCard key={index} />
                ))}
              </SectionContent>
            </Section>
          </div>
        </Section>
      </div>

      <Section>
        <SectionHeader>
          <SectionTitle
            className="text-5xl"
            level="h2"
            title="Mások a következőket is megvásárolták"
          />
          <SectionDescription>Leírás</SectionDescription>
        </SectionHeader>
        <SectionContent layoutType="carousel">
          {productOptions &&
            (productOptions as Array<any>)?.map((option, index) => (
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
            ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className="text-5xl"
            level="h2"
            title="Kedvenc termékek"
          />
          <SectionDescription>Leírás</SectionDescription>
        </SectionHeader>
        <SectionContent layoutType="carousel">
          {productOptions &&
            (productOptions as Array<any>)?.map((option, index) => (
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
    </>
  );
}
