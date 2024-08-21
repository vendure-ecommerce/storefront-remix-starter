import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useOutletContext } from '@remix-run/react';
import HorizontalProductCard from '~/components/cards/product/HorizontalProductCard';
import Section from '~/components/common/section/Section';
import SectionContent from '~/components/common/section/SectionContent';
import SectionHeader from '~/components/common/section/SectionHeader';
import SectionTitle from '~/components/common/section/SectionTitle';
import Summary from '~/components/common/summary/Summary';
import SummaryDiscount from '~/components/common/summary/SummaryDiscount';
import SummaryTotal from '~/components/common/summary/SummaryProductTotal';
import SummaryShippingCost from '~/components/common/summary/SummaryShippingCost';
import SummarySubTotal from '~/components/common/summary/SummarySubTotal';
import SummaryTaxRate from '~/components/common/summary/SummaryTaxRate';
import CheckoutForm from '~/components/pages/checkout/checkoutForm';
import PageTitle from '~/components/pages/PageTitle';
import { TGlobalOutletContext } from '~/types/types';
import { isArrayValid } from '~/utils';

export default function Checkout() {
  const outlet = useOutletContext<TGlobalOutletContext>();
  const { activeOrder, removeItem, adjustOrderLine } = outlet;

  const product = {} as any;

  return (
    <>
      <PageTitle title="Rendelés" srOnly />
      <div className="flex flex-col gap-y-32">
        <div className="relative mx-auto grid max-w-screen-sm grid-cols-1 gap-16 lg:max-w-full lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-16">
            <CheckoutForm />
          </div>
          <div className="flex h-full flex-col gap-16">
            <div className="sticky top-[7.5625rem] -mr-3 max-h-[calc(100vh_-_8.5625rem)] overflow-y-hidden">
              <ScrollArea className="h-full w-full overscroll-contain">
                <div className="flex flex-col gap-16 pr-3">
                  <div className="flex flex-col gap-6">
                    {isArrayValid(activeOrder?.shippingLines) &&
                      activeOrder?.shippingLines.map((_, index) => (
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
                          variant={'sm'}
                        >
                          {product.connectedProducts &&
                            (product.connectedProducts as Array<any>).map(
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
                                  variant={'sm'}
                                />
                              ),
                            )}
                        </HorizontalProductCard>
                      ))}
                  </div>
                  <Section className="sticky bottom-0 flex flex-col gap-8 bg-background">
                    <div className="absolute -top-8 left-0 h-8 w-[calc(100%_-_0.5rem)] bg-gradient-to-t from-background from-10%"></div>
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
                          <SummarySubTotal />
                          <SummaryTaxRate />
                          <SummaryShippingCost />
                          <SummaryDiscount />
                        </div>
                        <SummaryTotal />
                      </Summary>
                    </SectionContent>
                  </Section>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
