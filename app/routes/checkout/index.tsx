import { FormEvent, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import {
  Form,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from '@remix-run/react';
import { OutletContext } from '~/types';
import { DataFunctionArgs, redirect } from '@remix-run/server-runtime';
import {
  getAvailableCountries,
  getEligibleShippingMethods,
} from '~/providers/checkout/checkout';
import { shippingFormDataIsValid } from '~/utils/validation';
import { sessionStorage } from '~/sessions';
import { classNames } from '~/utils/class-names';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';
import { AddressForm } from '~/components/account/AddressForm';
import { ShippingMethodSelector } from '~/components/checkout/ShippingMethodSelector';
import { ShippingAddressSelector } from '~/components/checkout/ShippingAddressSelector';
import { getActiveOrder } from '~/providers/orders/order';

export async function loader({ request }: DataFunctionArgs) {
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );

  const activeOrder = await getActiveOrder({ request });
  
  //check if there is an active order if not redirect to homepage
  if (
    !session ||
    !activeOrder ||
    !activeOrder.active ||
    activeOrder.lines.length === 0
  ) {
    return redirect('/');
  }
  const { availableCountries } = await getAvailableCountries({ request });
  const { eligibleShippingMethods } = await getEligibleShippingMethods({
    request,
  });
  const { activeCustomer } = await getActiveCustomerAddresses({ request });
  const error = session.get('activeOrderError');
  return {
    availableCountries,
    eligibleShippingMethods,
    activeCustomer,
    error,
  };
}

export default function CheckoutShipping() {
  const { availableCountries, eligibleShippingMethods, activeCustomer, error } =
    useLoaderData<typeof loader>();
  const { activeOrderFetcher, activeOrder } = useOutletContext<OutletContext>();
  const [customerFormChanged, setCustomerFormChanged] = useState(false);
  const [addressFormChanged, setAddressFormChanged] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  let navigate = useNavigate();

  const { customer, shippingAddress } = activeOrder ?? {};
  const isSignedIn = !!activeCustomer?.id;
  const addresses = activeCustomer?.addresses ?? [];
  const defaultFullName =
    shippingAddress?.fullName ??
    (customer ? `${customer.firstName} ${customer.lastName}` : ``);
  const canProceedToPayment =
    customer &&
    ((shippingAddress?.streetLine1 && shippingAddress?.postalCode) ||
      selectedAddressIndex != null) &&
    activeOrder?.shippingLines?.length &&
    activeOrder?.lines?.length;

  const submitCustomerForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const { emailAddress, firstName, lastName } = Object.fromEntries<any>(
      formData.entries(),
    );
    const isValid = event.currentTarget.checkValidity();
    if (
      customerFormChanged &&
      isValid &&
      emailAddress &&
      firstName &&
      lastName
    ) {
      activeOrderFetcher.submit(formData, {
        method: 'post',
        action: '/api/active-order',
      });
      setCustomerFormChanged(false);
    }
  };
  const submitAddressForm = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const isValid = event.currentTarget.checkValidity();
    if (addressFormChanged && isValid) {
      setShippingAddress(formData);
    }
  };
  const submitSelectedAddress = (index: number) => {
    const selectedAddress = activeCustomer?.addresses?.[index];
    if (selectedAddress) {
      setSelectedAddressIndex(index);
      const formData = new FormData();
      Object.keys(selectedAddress).forEach((key) =>
        formData.append(key, (selectedAddress as any)[key]),
      );
      formData.append('countryCode', selectedAddress.country.code);
      formData.append('action', 'setCheckoutShipping');
      setShippingAddress(formData);
    }
  };

  function setShippingAddress(formData: FormData) {
    if (shippingFormDataIsValid(formData)) {
      activeOrderFetcher.submit(formData, {
        method: 'post',
        action: '/api/active-order',
      });
      setAddressFormChanged(false);
    }
  }

  const submitSelectedShippingMethod = (value?: string) => {
    if (value) {
      activeOrderFetcher.submit(
        {
          action: 'setShippingMethod',
          shippingMethodId: value,
        },
        {
          method: 'post',
          action: '/api/active-order',
        },
      );
    }
  };

  function navigateToPayment() {
    navigate('./payment');
  }

  return (
    <div>
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Contact information
        </h2>

        {isSignedIn ? (
          <div>
            <p className="mt-2 text-gray-600">
              {customer?.firstName} {customer?.lastName}
            </p>
            <p>{customer?.emailAddress}</p>
          </div>
        ) : (
          <Form
            method="post"
            action="/api/active-order"
            onBlur={submitCustomerForm}
            onChange={() => setCustomerFormChanged(true)}
            hidden={isSignedIn}
          >
            <input type="hidden" name="action" value="setOrderCustomer" />
            <div className="mt-4">
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  autoComplete="email"
                  defaultValue={customer?.emailAddress}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              {error?.errorCode === 'EMAIL_ADDRESS_CONFLICT_ERROR' && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {error.message}
                </p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    defaultValue={customer?.firstName}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    defaultValue={customer?.lastName}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>

      <Form
        method="post"
        action="/api/active-order"
        onBlur={submitAddressForm}
        onChange={() => setAddressFormChanged(true)}
      >
        <input type="hidden" name="action" value="setCheckoutShipping" />
        <div className="mt-10 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-medium text-gray-900">
            Shipping information
          </h2>
        </div>
        {isSignedIn && activeCustomer.addresses?.length ? (
          <div>
            <ShippingAddressSelector
              addresses={activeCustomer.addresses}
              selectedAddressIndex={selectedAddressIndex}
              onChange={submitSelectedAddress}
            />
          </div>
        ) : (
          <AddressForm
            availableCountries={activeOrder ? availableCountries : undefined}
            address={shippingAddress}
            defaultFullName={defaultFullName}
          ></AddressForm>
        )}
      </Form>

      <div className="mt-10 border-t border-gray-200 pt-10">
        <ShippingMethodSelector
          eligibleShippingMethods={eligibleShippingMethods}
          currencyCode={activeOrder?.currencyCode}
          shippingMethodId={activeOrder?.shippingLines[0]?.shippingMethod.id ?? ""}
          onChange={submitSelectedShippingMethod}
        />
      </div>

      <button
        type="button"
        disabled={!canProceedToPayment}
        onClick={navigateToPayment}
        className={classNames(
          canProceedToPayment
            ? 'bg-primary-600 hover:bg-primary-700'
            : 'bg-gray-400',
          'flex w-full items-center justify-center space-x-2 mt-24 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        )}
      >
        <LockClosedIcon className="w-5 h-5"></LockClosedIcon>
        <span>Proceed to payment</span>
      </button>
    </div>
  );
}
