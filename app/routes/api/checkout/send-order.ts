import { ActionFunctionArgs } from '@remix-run/server-runtime';
import { Address, CreateAddressInput } from '~/generated/graphql';
import {
  addPaymentToOrder,
  transitionOrderToState,
} from '~/providers/checkout/checkout';
import {
  setCustomerForOrder,
  setOrderShippingAddress,
  setOrderBillingAddress,
  setOrderShippingMethod,
} from '~/providers/orders/order';

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const emailAddress = formData.get('emailAddress') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const shippingAddress: CreateAddressInput = JSON.parse(
    formData.get('shippingAddress') as string,
  );
  const billingAddress: CreateAddressInput = JSON.parse(
    formData.get('billingAddress') as string,
  );
  const paymentMethodId = formData.get('paymentMethodId') as string;
  const isSubscribed = formData.get('isSubscribed') === 'true';

  console.log('------------------------------------');
  console.log('------------------------------------');
  console.log('------------------------------------');
  console.log('Customer emailAddress:', emailAddress);
  console.log('Customer firstName:', firstName);
  console.log('Customer lastName:', lastName);
  console.log('Shipping Address:', shippingAddress);
  console.log('Billing Address:', billingAddress);
  console.log('Payment Method ID:', paymentMethodId);
  console.log('Is Subscribed:', isSubscribed);
  console.log('------------------------------------');
  console.log('------------------------------------');
  console.log('------------------------------------');

  const setCustomerForOrderResult = await setCustomerForOrder(
    { emailAddress, firstName, lastName },
    { request },
  );

  const orderShippingAddressResult = await setOrderShippingAddress(
    { ...shippingAddress, countryCode: 'HU' },
    { request },
  );

  const orderBillingAddressResult = await setOrderBillingAddress(
    { ...billingAddress, countryCode: 'HU' },
    { request },
  );

  const orderShippingMethodResult = await setOrderShippingMethod('1', {
    request,
  }); //We will get the Order ShippingMethod from one of the selected cards on the second section called 'Szállítási cím'

  const orderPaymentMethodResult = await addPaymentToOrder(
    { method: 'standard-payment', metadata: {} },
    { request },
  ); // A Payment may only be added when Order is in "ArrangingPayment" state.

  const transitionOrderToStateResult = await transitionOrderToState(
    'ArrangingPayment',
    { request },
  );

  return { success: true, message: 'Order successfully placed!' };
}
