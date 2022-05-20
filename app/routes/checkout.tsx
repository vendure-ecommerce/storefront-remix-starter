import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import { useFetcher } from '@remix-run/react';
import { CartLoaderData } from '~/routes/active-order';
import { CartContents } from '~/components/cart/CartContents';
import * as React from 'react';
import { useActiveOrder } from '~/utils/use-active-order';
import { CheckoutForm } from '~/components/checkout/CheckoutForm';
import { useOutletContext } from 'remix';
import { OutletContext } from '~/types';
import { Price } from '~/components/products/Price';

export default function Checkout() {
    const { activeOrder, adjustOrderLine, removeItem } =
        useOutletContext<OutletContext>();

    return (
        <div className="bg-gray-50">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <CheckoutForm></CheckoutForm>

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
