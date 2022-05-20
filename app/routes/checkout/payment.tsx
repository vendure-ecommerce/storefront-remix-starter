import { DataFunctionArgs } from '@remix-run/server-runtime';
import { getEligiblePaymentMethods } from '~/providers/checkout/checkout';
import { useLoaderData } from '@remix-run/react';
import { CreditCardIcon, XCircleIcon } from '@heroicons/react/solid';
import { useOutletContext } from 'remix';
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

export default function CheckoutPayment() {
    const { eligiblePaymentMethods, error } =
        useLoaderData<Awaited<ReturnType<typeof loader>>>();
    const { activeOrderFetcher, activeOrder } =
        useOutletContext<OutletContext>();

    const paymentError = getPaymentError(error);

    function addPaymentToOrder(paymentMethodCode: string) {
        activeOrderFetcher.submit(
            {
                action: 'addPaymentToOrder',
                paymentMethodCode,
            },
            {
                method: 'post',
                action: '/api/active-order',
            },
        );
    }

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
                    <button
                        onClick={() => addPaymentToOrder(paymentMethod.code)}
                        className="flex px-6 bg-indigo-600 hover:bg-indigo-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <CreditCardIcon className="w-5 h-5"></CreditCardIcon>
                        <span>Pay with {paymentMethod.name}</span>
                    </button>
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
