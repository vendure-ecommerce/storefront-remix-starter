import * as React from 'react';
import { FormEvent, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/solid';
import { useOutletContext } from 'remix';
import { OutletContext } from '~/types';
import { Form, useLoaderData } from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import {
    getAvailableCountries,
    getEligibleShippingMethods,
} from '~/providers/checkout/checkout';
import { Price } from '~/components/products/Price';
import { shippingFormDataIsValid } from '~/utils/validation';
import { sessionStorage } from '~/sessions';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export async function loader({ params, request }: DataFunctionArgs) {
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );
    const { availableCountries } = await getAvailableCountries({ request });
    const { eligibleShippingMethods } = await getEligibleShippingMethods({
        request,
    });
    const error = session.get('activeOrderError');
    return { availableCountries, eligibleShippingMethods, error };
}

export default function CheckoutShipping() {
    const { availableCountries, eligibleShippingMethods, error } =
        useLoaderData<Awaited<ReturnType<typeof loader>>>();
    const { activeOrderFetcher, activeOrder } =
        useOutletContext<OutletContext>();
    const [customerFormChanged, setCustomerFormChanged] = useState(false);
    const [addressFormChanged, setAddressFormChanged] = useState(false);

    const { customer, shippingAddress } = activeOrder ?? {};
    const defaultFullName =
        shippingAddress?.fullName ??
        (customer ? `${customer.firstName} ${customer.lastName}` : ``);
    const canProceedToPayment =
        customer && shippingAddress && activeOrder?.shippingLines?.length;

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
        if (
            addressFormChanged &&
            isValid &&
            shippingFormDataIsValid(formData)
        ) {
            activeOrderFetcher.submit(formData, {
                method: 'post',
                action: '/api/active-order',
            });
            setAddressFormChanged(false);
        }
    };
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
    return (
        <div>
            <div>
                <Form
                    method="post"
                    action="/api/active-order"
                    onBlur={submitCustomerForm}
                    onChange={() => setCustomerFormChanged(true)}
                >
                    <input
                        type="hidden"
                        name="action"
                        value="setOrderCustomer"
                    />
                    <h2 className="text-lg font-medium text-gray-900">
                        Contact information
                    </h2>

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
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {error?.errorCode ===
                            'EMAIL_ADDRESS_CONFLICT_ERROR' && (
                            <p
                                className="mt-2 text-sm text-red-600"
                                id="email-error"
                            >
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
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
            <Form
                method="post"
                action="/api/active-order"
                onBlur={submitAddressForm}
                onChange={() => setAddressFormChanged(true)}
            >
                <input
                    type="hidden"
                    name="action"
                    value="setCheckoutShipping"
                />
                <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">
                        Shipping information
                    </h2>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                First name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    defaultValue={defaultFullName}
                                    autoComplete="given-name"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="company"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Company
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    defaultValue={
                                        shippingAddress?.company ?? ''
                                    }
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="streetLine1"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="streetLine1"
                                    id="streetLine1"
                                    defaultValue={
                                        shippingAddress?.streetLine1 ?? ''
                                    }
                                    autoComplete="street-address"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="streetLine2"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Apartment, suite, etc.
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="streetLine2"
                                    id="streetLine2"
                                    defaultValue={
                                        shippingAddress?.streetLine2 ?? ''
                                    }
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                            >
                                City
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    defaultValue={shippingAddress?.city ?? ''}
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="countryCode"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Country
                            </label>
                            <div className="mt-1">
                                {activeOrder && (
                                    <select
                                        id="countryCode"
                                        name="countryCode"
                                        defaultValue={
                                            shippingAddress?.countryCode ??
                                            undefined
                                        }
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {availableCountries.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.code}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="province"
                                className="block text-sm font-medium text-gray-700"
                            >
                                State / Province
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="province"
                                    id="province"
                                    defaultValue={
                                        shippingAddress?.province ?? ''
                                    }
                                    autoComplete="address-level1"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="postalCode"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Postal code
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    defaultValue={
                                        shippingAddress?.postalCode ?? ''
                                    }
                                    autoComplete="postal-code"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    defaultValue={
                                        shippingAddress?.phoneNumber ?? ''
                                    }
                                    autoComplete="tel"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Form>

            <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                    value={activeOrder?.shippingLines[0]?.shippingMethod.id}
                    onChange={submitSelectedShippingMethod}
                >
                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                        Delivery method
                    </RadioGroup.Label>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {eligibleShippingMethods.map((shippingMethod) => (
                            <RadioGroup.Option
                                key={shippingMethod.id}
                                value={shippingMethod.id}
                                className={({ checked, active }) =>
                                    classNames(
                                        checked
                                            ? 'border-transparent'
                                            : 'border-gray-300',
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
                                    )
                                }
                            >
                                {({ checked, active }) => (
                                    <>
                                        <span className="flex-1 flex">
                                            <span className="flex flex-col">
                                                <RadioGroup.Label
                                                    as="span"
                                                    className="block text-sm font-medium text-gray-900"
                                                >
                                                    {shippingMethod.name}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className="mt-6 text-sm font-medium text-gray-900"
                                                >
                                                    <Price
                                                        priceWithTax={
                                                            shippingMethod.priceWithTax
                                                        }
                                                        currencyCode={
                                                            activeOrder?.currencyCode
                                                        }
                                                    ></Price>
                                                </RadioGroup.Description>
                                            </span>
                                        </span>
                                        {checked ? (
                                            <CheckCircleIcon
                                                className="h-5 w-5 text-indigo-600"
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        <span
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked
                                                    ? 'border-indigo-500'
                                                    : 'border-transparent',
                                                'absolute -inset-px rounded-lg pointer-events-none',
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>

            <button
                type="button"
                disabled={!canProceedToPayment}
                className={classNames(
                    canProceedToPayment
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : 'bg-gray-400',
                    'flex w-full items-center justify-center space-x-2 mt-24 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                )}
            >
                <LockClosedIcon className="w-5 h-5"></LockClosedIcon>
                <span>Proceed to payment</span>
            </button>
        </div>
    );
}
