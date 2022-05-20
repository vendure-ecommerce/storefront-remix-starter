import * as React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Outlet, useLocation } from '@remix-run/react';
import { CartContents } from '~/components/cart/CartContents';
import { useOutletContext } from 'remix';
import { OutletContext } from '~/types';
import { Price } from '~/components/products/Price';

const steps = [
    { name: 'Shipping', state: 'shipping' },
    { name: 'Payment', state: 'payment' },
    { name: 'Confirmation', state: 'confirmation' },
];

export default function Checkout() {
    const outletContext = useOutletContext<OutletContext>();
    const { activeOrder, adjustOrderLine, removeItem } = outletContext;
    const location = useLocation();
    let state = 'shipping';
    if (location.pathname === '/checkout/payment') {
        state = 'payment';
    } else if (location.pathname === '/checkout/confirmation') {
        state = 'confirmation';
    }

    return (
        <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-8 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>
                <nav
                    aria-label="Progress"
                    className="hidden sm:block pb-8 mb-8 border-b"
                >
                    <ol role="list" className="flex space-x-4 justify-center">
                        {steps.map((step, stepIdx) => (
                            <li key={step.name} className="flex items-center">
                                {step.state === state ? (
                                    <span
                                        aria-current="page"
                                        className="text-indigo-600"
                                    >
                                        {step.name}
                                    </span>
                                ) : (
                                    <span>{step.name}</span>
                                )}

                                {stepIdx !== steps.length - 1 ? (
                                    <ChevronRightIcon
                                        className="w-5 h-5 text-gray-300 ml-4"
                                        aria-hidden="true"
                                    />
                                ) : null}
                            </li>
                        ))}
                    </ol>
                </nav>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <Outlet context={outletContext} />

                    {/* Order summary */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <CartContents
                            orderLines={activeOrder?.lines ?? []}
                            currencyCode={activeOrder?.currencyCode!}
                            editable={true}
                            removeItem={removeItem}
                            adjustOrderLine={adjustOrderLine}
                        ></CartContents>
                        <dl className="border-t border-gray-200 py-6 px-4 space-y-6">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    <Price
                                        priceWithTax={
                                            activeOrder?.subTotalWithTax
                                        }
                                        currencyCode={activeOrder?.currencyCode}
                                    ></Price>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm">Shipping</dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    <Price
                                        priceWithTax={
                                            activeOrder?.shippingWithTax ?? 0
                                        }
                                        currencyCode={activeOrder?.currencyCode}
                                    ></Price>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt className="text-base font-medium">Total</dt>
                                <dd className="text-base font-medium text-gray-900">
                                    <Price
                                        priceWithTax={activeOrder?.totalWithTax}
                                        currencyCode={activeOrder?.currencyCode}
                                    ></Price>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
