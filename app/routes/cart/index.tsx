import { Outlet, useOutletContext } from '@remix-run/react';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import HorizontalProductCard from '~/components/cards/product/HorizontalProductCard';
import ProductCard from '~/components/cards/product/ProductCard';
import UserCard from '~/components/cards/user/UserCard';
import Navbar from '~/components/common/navbar/Navbar';
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
import { userCardDummies } from '~/constants';
import { useActiveOrder } from '~/utils/use-active-order';

export default function Cart() {
  const product: any = {};
  const productOptions: any[] = [];
  const { activeOrder } = useActiveOrder();

  return (
    <>
      <Navbar />
      <div className="mx-auto w-full px-6 lg:max-w-screen-2xl">
        <div className="flex flex-col gap-20 py-12">
          <Outlet />
          <div className="flex flex-col gap-y-16">
            <Breadcrumbs items={[]} />
            <PageTitle
              title={`${activeOrder?.lines.length || 0} termék a kosárban`}
            />
            <Section className="grid grid-cols-1 gap-x-20 gap-y-20 lg:grid-cols-[50%_minmax(0,_1fr)]">
              <div className="flex flex-col gap-6">
                {activeOrder?.lines.map((option, index) => (
                  <HorizontalProductCard
                    key={index}
                    id={option.productVariant.id}
                    lineItemId={option.id}
                    title={option.productVariant.name}
                    number={option.quantity.toString()}
                    priceNormal={option.unitPriceWithTax}
                    priceNet={option.unitPriceWithTax}
                    priceCrossed={option.unitPriceWithTax}
                    imageSrc={option.featuredAsset?.preview || ''}
                    showAddToCartHandler={true}
                    showProductAmountStepper={true}
                    variant="sm"
                  >
                    {product.connectedProducts &&
                      (product.connectedProducts as Array<any>)?.map(
                        (connectedProduct, index) => (
                          <HorizontalProductCard
                            key={index}
                            id={connectedProduct.id}
                            lineItemId={connectedProduct.id}
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
                    <SectionTitle
                      level="h3"
                      title="Összesítő táblázat"
                      srOnly
                    />
                  </SectionHeader>
                  <SectionContent className="grid grid-cols-1 gap-4">
                    <Summary>
                      <div className="flex flex-col gap-2">
                        <SummarySubTotal
                          value={activeOrder?.subTotalWithTax}
                          currencyCode={activeOrder?.currencyCode}
                        />
                        <SummaryTaxRate
                          tax={activeOrder?.taxSummary[0]}
                          value={activeOrder?.taxSummary[0]?.taxTotal}
                          currencyCode={activeOrder?.currencyCode}
                        />
                        <SummaryShippingCost
                          value={activeOrder?.shippingWithTax}
                          currencyCode={activeOrder?.currencyCode}
                        />
                        {/* <SummaryDiscount
                          
                        /> */}
                      </div>
                      <SummaryTotal
                        className="text-xl font-bold"
                        value={activeOrder?.totalWithTax}
                        currencyCode={activeOrder?.currencyCode}
                      />
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
                    {userCardDummies.map((props, index) => (
                      <UserCard key={index} {...props} />
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
        </div>
      </div>
    </>
  );
}
