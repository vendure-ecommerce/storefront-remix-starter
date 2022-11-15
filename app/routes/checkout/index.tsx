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
    const { activeOrderFetcher, activeOrder, switchChannel } =
        useOutletContext<OutletContext>();
    let navigate = useNavigate();

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
        useState(defaultCustomerBillingAddress && defaultCustomerShippingAddress &&
             (
                defaultCustomerBillingAddress.city !=
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
                    defaultCustomerShippingAddress.streetLine2
            ),
        );

    const [formValid, setFormValid] = useState( isSignedIn &&
        (billingAddress?.streetLine1 || defaultCustomerBillingAddress?.streetLine1) &&
        (billingAddress?.postalCode || defaultCustomerBillingAddress?.postalCode) &&
        (!useDifferentShippingAddress ||
            ((shippingAddress?.streetLine1 || defaultCustomerShippingAddress?.streetLine1) && 
                (shippingAddress?.postalCode || defaultCustomerShippingAddress?.postalCode))));

    useEffect(() => {
        if (error) console.log(error);
    });

    const submitAddressForm = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const isValid = event.currentTarget.checkValidity();
        if (isValid) {
            if (shippingFormDataIsValid(formData)) {
                activeOrderFetcher.submit(formData, {
                    method: 'post',
                    action: '/api/active-order',
                });

                const country = formData.get('billing_countryCode');
                if (country == 'DE' && currentChannel?.token == 'row') {
                    switchChannel('eu');
                } else if (country == 'US' && currentChannel?.token == 'eu') {
                    switchChannel('row');
                }

                setFormValid(true);
            }
        } else {
            setFormValid(false);
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
                disabled={!formValid || error}
                onClick={navigateToShipping}
                className="flex w-full items-center justify-center space-x-2 mt-10 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-500 disabled:bg-gray-400"
            >
                <LockClosedIcon className="w-5 h-5"></LockClosedIcon>
                <span>Proceed to Shipping</span>
            </button>
        </div>
    );
}
