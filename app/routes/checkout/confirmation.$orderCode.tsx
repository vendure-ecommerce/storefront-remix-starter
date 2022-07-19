import { DataFunctionArgs } from '@remix-run/server-runtime';
import { getOrderByCode } from '~/providers/orders/order';
import { useLoaderData } from '@remix-run/react';
import { CartContents } from '~/components/cart/CartContents';
import { CartTotals } from '~/components/cart/CartTotals';
import * as React from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { InformationCircleIcon } from '@heroicons/react/solid';

export async function loader({ params, request }: DataFunctionArgs) {
    const order = await getOrderByCode(params.orderCode!, { request });
    return {
        order,
    };
}

export default function CheckoutConfirmation() {
    const { order } = useLoaderData<typeof loader>();

    if (!order) {
        return (
            <div>
                <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
                    No matching order found!
                </h2>
            </div>
        );
    }
    return (
        <div>
            <h2 className="text-3xl flex items-center space-x-2 sm:text-5xl font-light tracking-tight text-gray-900 my-8">
                <CheckCircleIcon className="text-green-600 w-8 h-8 sm:w-12 sm:h-12"></CheckCircleIcon>
                <span>Order Summary</span>
            </h2>
            <p className="text-lg text-gray-700">
                Your order <span className="font-bold">{order.code}</span> has
                been received!
            </p>
            {order.active && (
                <div className="rounded-md bg-blue-50 p-4 my-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <InformationCircleIcon
                                className="h-5 w-5 text-blue-400"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-blue-700">
                                {' '}
                                Note: your payment is still being processed. You
                                will receive an email confirmation once the
                                payment has completed.
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-12">
                <div className="mb-6">
                    <CartContents
                        orderLines={order.lines}
                        currencyCode={order.currencyCode}
                        editable={false}
                    />
                </div>
                <CartTotals order={order}></CartTotals>
            </div>
        </div>
    );
}
