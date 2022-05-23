import { DataFunctionArgs, redirect } from '@remix-run/server-runtime';
import {
    addPaymentToOrder,
    getEligiblePaymentMethods,
    getNextOrderStates,
    transitionOrderToState,
} from '~/providers/checkout/checkout';
import { Form, useLoaderData, useOutletContext } from '@remix-run/react';
import { CreditCardIcon, XCircleIcon } from '@heroicons/react/solid';
import { OutletContext } from '~/types';
import { sessionStorage } from '~/sessions';
import { ErrorCode, ErrorResult } from '~/generated/graphql';

export async function loader({ params, request }: DataFunctionArgs) {
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );
    const { eligiblePaymentMethods } = await getEligiblePaymentMethods({
        request,
    });
    const error = session.get('activeOrderError');
    return { eligiblePaymentMethods, error };
}

export async function action({ params, request }: DataFunctionArgs) {
    const body = await request.formData();
    const paymentMethodCode = body.get('paymentMethodCode');
    if (typeof paymentMethodCode === 'string') {
        const { nextOrderStates } = await getNextOrderStates({
            request,
        });
        if (nextOrderStates.includes('ArrangingPayment')) {
            const transitionResult = await transitionOrderToState(
                'ArrangingPayment',
                { request },
            );
            if (
                transitionResult.transitionOrderToState?.__typename !== 'Order'
            ) {
                throw new Response('Not Found', {
                    status: 400,
                    statusText:
                        transitionResult.transitionOrderToState?.message,
                });
            }
        }

        const result = await addPaymentToOrder(
            { method: paymentMethodCode, metadata: {} },
            { request },
        );
        if (result.addPaymentToOrder.__typename === 'Order') {
            return redirect(
                `/checkout/confirmation/${result.addPaymentToOrder.code}`,
            );
        } else {
            throw new Response('Not Found', {
                status: 400,
                statusText: result.addPaymentToOrder?.message,
            });
        }
    }
}

export default function CheckoutPayment() {
    const { eligiblePaymentMethods, error } =
        useLoaderData<Awaited<ReturnType<typeof loader>>>();
    const { activeOrderFetcher, activeOrder } =
        useOutletContext<OutletContext>();

    const paymentError = getPaymentError(error);

    return (
        <div className="flex flex-col space-y-24 items-center">
            {eligiblePaymentMethods.map((paymentMethod) => (
                <div
                    key={paymentMethod.id}
                    className="flex flex-col items-center"
                >
                    <p className="text-gray-600 text-sm p-6">
                        This is a dummy payment for demonstration purposes only
                    </p>
                    {paymentError && (
                        <div className="rounded-md bg-red-50 p-4 mb-8">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircleIcon
                                        className="h-5 w-5 text-red-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        There was an error processing the
                                        payment
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        {paymentError}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <Form method="post">
                        <input
                            type="hidden"
                            name="paymentMethodCode"
                            value={paymentMethod.code}
                        />
                        <button
                            type="submit"
                            className="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <CreditCardIcon className="w-5 h-5"></CreditCardIcon>
                            <span>Pay with {paymentMethod.name}</span>
                        </button>
                    </Form>
                </div>
            ))}
        </div>
    );
}

function getPaymentError(error?: ErrorResult): string | undefined {
    if (!error || !error.errorCode) {
        return undefined;
    }
    switch (error.errorCode) {
        case ErrorCode.OrderPaymentStateError:
        case ErrorCode.IneligiblePaymentMethodError:
        case ErrorCode.PaymentFailedError:
        case ErrorCode.PaymentDeclinedError:
        case ErrorCode.OrderStateTransitionError:
        case ErrorCode.NoActiveOrderError:
            return error.message;
    }
}
