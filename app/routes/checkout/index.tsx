import * as React from 'react';
import { FormEvent, useEffect, useState } from 'react';
import { LockClosedIcon, XCircleIcon } from '@heroicons/react/solid';
import {
    Form,
    useLoaderData,
    useNavigate,
    useOutletContext,
} from '@remix-run/react';
import { OutletContext } from '~/types';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import {
    getAvailableCountries,
    getEligibleShippingMethods,
} from '~/providers/checkout/checkout';
import { shippingFormDataIsValid } from '~/utils/validation';
import { sessionStorage } from '~/sessions';
import { classNames } from '~/utils/class-names';
import { getActiveCustomerAddresses } from '~/providers/customer/customer';
import { AddressForm } from '~/components/account/AddressForm';
import { activeChannel } from '~/providers/channel/channel';
import { EU_COUNTRIES } from '~/constants';

export async function loader({ params, request }: DataFunctionArgs) {
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );
    const error = session.get('activeOrderError');
    const availableCountries = await getAvailableCountries({ request });
    const { activeCustomer } = await getActiveCustomerAddresses({ request });

    const currentChannel = await activeChannel({ request });
    return {
        availableCountries,
        activeCustomer,
        currentChannel,
        error,
    };
}

export default function CheckoutShipping() {
    const { availableCountries, activeCustomer, currentChannel, error } =
        useLoaderData<typeof loader>();
    const { activeOrderFetcher, activeOrder, setActiveChannelToken } =
        useOutletContext<OutletContext>();
    let navigate = useNavigate();

    setActiveChannelToken(currentChannel.token);

    const { customer, shippingAddress, billingAddress } = activeOrder ?? {};
    const isSignedIn = !!activeCustomer?.id;
    const addresses = activeCustomer?.addresses ?? [];
    const defaultCustomerShippingAddress = addresses.find(
        (x) => x.defaultShippingAddress,
    );
    const defaultCustomerBillingAddress = addresses.find(
        (x) => x.defaultBillingAddress,
    );

    const [useDifferentShippingAddress, setUseDifferentShippingAddress] =
        useState(
            defaultCustomerBillingAddress &&
                defaultCustomerShippingAddress &&
                (defaultCustomerBillingAddress.city !=
                    defaultCustomerShippingAddress.city ||
                    defaultCustomerBillingAddress.company !=
                        defaultCustomerShippingAddress.company ||
                    defaultCustomerBillingAddress.country.code !=
                        defaultCustomerShippingAddress.country.code ||
                    defaultCustomerBillingAddress.fullName !=
                        defaultCustomerShippingAddress.fullName ||
                    defaultCustomerBillingAddress.postalCode !=
                        defaultCustomerShippingAddress.postalCode ||
                    defaultCustomerBillingAddress.province !=
                        defaultCustomerShippingAddress.province ||
                    defaultCustomerBillingAddress.streetLine1 !=
                        defaultCustomerShippingAddress.streetLine1 ||
                    defaultCustomerBillingAddress.streetLine2 !=
                        defaultCustomerShippingAddress.streetLine2),
        );

    const [isFetching, setIsFetching] = useState(false);

    const formValid =
        (isSignedIn ||
            (customer?.emailAddress &&
                customer.firstName &&
                customer.lastName)) &&
        (billingAddress?.streetLine1 ||
            defaultCustomerBillingAddress?.streetLine1) &&
        (billingAddress?.postalCode ||
            defaultCustomerBillingAddress?.postalCode) &&
        (!useDifferentShippingAddress ||
            ((shippingAddress?.streetLine1 ||
                defaultCustomerShippingAddress?.streetLine1) &&
                (shippingAddress?.postalCode ||
                    defaultCustomerShippingAddress?.postalCode)));

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    useEffect(() => {
        if (error) console.log(error);
        setIsFetching(false);
    },[currentChannel]);

    const submitAddressForm = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const isValid = event.currentTarget.checkValidity();
        if (isValid) {
            if (shippingFormDataIsValid(formData)) {
                formData.append('channel', currentChannel.token);
        
                setIsFetching(true);

                activeOrderFetcher.submit(formData, {
                    method: 'post',
                    action: '/api/active-order',
                });
            }
        }
    };

    function navigateToShipping() {
        navigate('/checkout/shipping');
    }

    return (
        <div>
            <Form
                method="post"
                action="/api/active-order"
                onBlur={submitAddressForm}
            >
                <input
                    type="hidden"
                    name="action"
                    value="setCheckoutShipping"
                />
                <div>
                    <h2 className="text-lg font-medium text-gray-900">
                        Billing information
                    </h2>
                </div>

                <div className="sm:col-span-2 mt-4">
                    <label
                        htmlFor="emailAddress"
                        className={
                            'block text-sm font-medium text-gray-700 required'
                        }
                    >
                        Email-Address
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            required
                            name="emailAddress"
                            id="emailAddress"
                            readOnly={isSignedIn}
                            defaultValue={customer?.emailAddress ?? ''}
                            className={classNames(
                                'read-only:opacity-60 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                                error?.errorCode ==
                                    'EMAIL_ADDRESS_CONFLICT_ERROR'
                                    ? 'border-red-500'
                                    : 'border-gray-300',
                            )}
                        />
                    </div>
                </div>

                <AddressForm
                    defaultFirstName={customer?.firstName}
                    defaultLastName={customer?.lastName}
                    prefix="billing_"
                    availableCountries={
                        activeOrder ? availableCountries : undefined
                    }
                    address={billingAddress}
                    customerAddress={defaultCustomerBillingAddress}
                ></AddressForm>

                <div className="sm:col-span-2 flex space-x-2 flex-row my-5 items-center">
                    <input
                        type="checkbox"
                        onChange={(x) =>
                            setUseDifferentShippingAddress(
                                !useDifferentShippingAddress,
                            )
                        }
                        checked={useDifferentShippingAddress}
                        name="useDifferentShippingAddress"
                        className="checked:bg-blue-500 rounded border-gray-300"
                    />
                    <label
                        htmlFor="useDifferentShippingAddress"
                        className="block text-md font-medium text-gray-700"
                    >
                        Ship to a different address?
                    </label>
                </div>

                {useDifferentShippingAddress ? (
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                            Shipping information
                        </h2>
                        <AddressForm
                            prefix="shipping_"
                            availableCountries={
                                activeOrder ? availableCountries : undefined
                            }
                            address={shippingAddress}
                            customerAddress={defaultCustomerShippingAddress}
                        ></AddressForm>
                    </div>
                ) : (
                    ''
                )}
            </Form>

            {error ? (
                <div className="my-5 rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon
                                className="h-5 w-5 text-red-400"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                {error.message}
                            </h3>
                            <p className="text-sm text-red-700 mt-2">
                                {error.errorCode}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}

            <button
                type="button"
                disabled={!formValid || isFetching}
                onClick={navigateToShipping}
                className="flex w-full items-center justify-center space-x-2 mt-10 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-500 disabled:bg-gray-400"
            >
                <LockClosedIcon className="w-5 h-5"></LockClosedIcon>
                <span>Proceed to Shipping</span>
                {isFetching ? (
                    <svg
                        aria-hidden="true"
                        className="ml-3 w-4 h-4 text-indigo-100 animate-spin dark:text-gray-100 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                ) : (
                    ''
                )}
            </button>
        </div>
    );
}
