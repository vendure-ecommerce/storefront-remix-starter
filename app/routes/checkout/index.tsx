import { ScrollArea } from '@radix-ui/react-scroll-area';
import { json, redirect, useLoaderData, useOutletContext } from '@remix-run/react';
import { ActionFunction, ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/server-runtime';
import HorizontalProductCard from '~/components/cards/product/HorizontalProductCard';
import Section from '~/components/common/section/Section';
import SectionContent from '~/components/common/section/SectionContent';
import SectionHeader from '~/components/common/section/SectionHeader';
import SectionTitle from '~/components/common/section/SectionTitle';
import Summary from '~/components/common/summary/Summary';
import SummaryTotal from '~/components/common/summary/SummaryProductTotal';
import SummaryShippingCost from '~/components/common/summary/SummaryShippingCost';
import SummarySubTotal from '~/components/common/summary/SummarySubTotal';
import SummaryTaxRate from '~/components/common/summary/SummaryTaxRate';
import CheckoutForm from '~/components/pages/checkout/checkoutForm';
import PageTitle from '~/components/pages/PageTitle';
import { addPaymentToOrder, getAvailableCountries, getEligiblePaymentMethods, getEligibleShippingMethods } from '~/providers/checkout/checkout';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';
import { getActiveOrder, setCustomerForOrder, setOrderBillingAddress, setOrderShippingAddress, setOrderShippingMethod } from '~/providers/orders/order';
import { transitionOrderToState } from '~/providers/checkout/checkout';
import { getSessionStorage } from '~/sessions';
import { TGlobalOutletContext } from '~/types/types';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSessionStorage().then((sessionStorage) =>
    sessionStorage.getSession(request?.headers.get('Cookie')),
  );

  const activeOrder = await getActiveOrder({ request });

  console.log(activeOrder);

  //check if there is an active order if not redirect to homepage
/*   if (
    !session ||
    !activeOrder ||
    !activeOrder.active ||
    activeOrder.lines.length === 0
  ) {
    return redirect('/');
  } */

  const { activeCustomer } = await getActiveCustomerAddresses({ request });
  const { availableCountries } = await getAvailableCountries({ request });
  const { eligibleShippingMethods } = await getEligibleShippingMethods({ request });
  const { eligiblePaymentMethods } = await getEligiblePaymentMethods({ request });

  const error = session.get('activeOrderError');

  return json({
    availableCountries,
    eligibleShippingMethods,
    eligiblePaymentMethods,
    activeCustomer,
    error,
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  /* const email = formData.get('email');

  // Retrieving the shipping and billing addresses as objects
  const shippingAddress = {
    fullName: formData.get('shippingAddress[fullName]'),
    company: formData.get('shippingAddress[company]'),
    streetLine1: formData.get('shippingAddress[streetLine1]'),
    streetLine2: formData.get('shippingAddress[streetLine2]'),
    countryCode: formData.get('shippingAddress[countryCode]'),
    city: formData.get('shippingAddress[city]'),
    province: formData.get('shippingAddress[province]'),
    postalCode: formData.get('shippingAddress[postalCode]'),
    phoneNumber: formData.get('shippingAddress[phoneNumber]'),
  };

  const billingAddress = {
    fullName: formData.get('billingAddress[fullName]'),
    company: formData.get('billingAddress[company]'),
    streetLine1: formData.get('billingAddress[streetLine1]'),
    streetLine2: formData.get('billingAddress[streetLine2]'),
    countryCode: formData.get('billingAddress[countryCode]'),
    city: formData.get('billingAddress[city]'),
    province: formData.get('billingAddress[province]'),
    postalCode: formData.get('billingAddress[postalCode]'),
    phoneNumber: formData.get('billingAddress[phoneNumber]'),
  }; */

  const email = 'serdult.martin@hotmail.hu';

  const shippingAddress = {
    fullName: 'Serdult Martin',
    company: 'Storefront',
    streetLine1: 'Ihász utca',
    streetLine2: '13',
    countryCode: 'HU',
    city: 'Budapest',
    province: 'Budapest',
    postalCode: '1103',
    phoneNumber: '06306672959',
  };

  const billingAddress = {
    fullName: 'Serdult Martin',
    company: 'Storefront',
    streetLine1: 'Ihász utca',
    streetLine2: '13',
    countryCode: 'HU',
    city: 'Budapest',
    province: 'Budapest',
    postalCode: '1103',
    phoneNumber: '06306672959',
  };

  const setCustomerForOrderResult = await setCustomerForOrder({ 
      emailAddress: email,
      firstName: 'Martin',
      lastName: 'Serdult' 
    }, { request }
  );
  console.log('setCustomerForOrderResult', setCustomerForOrderResult); //This makes sense when you want to create a guest order


  const orderShippingAddressResult = await setOrderShippingAddress(shippingAddress, { request });
  console.log('orderShippingAddressResult', orderShippingAddressResult);

  const orderBillingAddressResult = await setOrderBillingAddress(billingAddress, { request });
  console.log('orderBillingAddressResult', setOrderBillingAddress);

  const orderShippingMethodResult = await setOrderShippingMethod('1', { request }); //We will get the Order ShippingMethod from one of the selected cards on the second section called 'Szállítási cím'
  console.log('orderShippingMethodResult', orderShippingMethodResult);

  const orderPaymentMethodResult = await addPaymentToOrder({ method: 'standard-payment', metadata: {} }, { request });// A Payment may only be added when Order is in "ArrangingPayment" state.
  console.log('orderPaymentMethodResult', orderPaymentMethodResult); // A Payment may only be added when Order is in "ArrangingPayment" state.

  const transitionOrderToStateResult = await transitionOrderToState('ArrangingPayment', { request });
  console.log('transitionOrderToStateResult', transitionOrderToStateResult);

  console.log("Shipping Address:", shippingAddress);
  console.log("Billing Address:", billingAddress);

  return { success: true, message: 'Order successfully placed!' };
};


export default function Checkout() {
  const outlet = useOutletContext<TGlobalOutletContext>();
  const { activeOrder, removeItem, adjustOrderLine } = outlet;
  const { availableCountries, eligibleShippingMethods, activeCustomer, eligiblePaymentMethods, error } = useLoaderData<typeof loader>();

  const product = {} as any;

  return (
    <>
      <PageTitle title="Rendelés" srOnly />
      <div className="flex flex-col gap-y-32">
        <div className="relative mx-auto grid max-w-screen-sm grid-cols-1 gap-16 lg:max-w-full lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-16">
            <CheckoutForm
            availableCountries={availableCountries}
            eligibleShippingMethods={eligibleShippingMethods}
            eligiblePaymentMethods={eligiblePaymentMethods}
            activeCustomer={activeCustomer}
            />
          </div>
          <div className="flex h-full flex-col gap-16">
            <div className="sticky top-[7.5625rem] -mr-3 max-h-[calc(100vh_-_8.5625rem)] overflow-y-hidden">
              <ScrollArea className="h-full w-full overscroll-contain">
                <div className="flex flex-col gap-16 pr-3">
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
                        imageSrc={option.featuredAsset?.preview || ""}
                        showAddToCartHandler={true}
                        showProductAmountStepper={true}
                        variant="sm"
                      >
                        {product.connectedProducts &&
                          (product.connectedProducts as Array<any>).map(
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
                        <div className='flex flex-col gap-2'>
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
                          className='text-xl font-bold'
                          value={activeOrder?.totalWithTax}
                          currencyCode={activeOrder?.currencyCode}
                        />
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
