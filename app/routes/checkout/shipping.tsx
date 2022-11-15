import { DataFunctionArgs } from '@remix-run/server-runtime';
import {
    getEligibleShippingMethods,
} from '~/providers/checkout/checkout';
import {
    useLoaderData,
    useNavigate,
    useOutletContext,
} from '@remix-run/react';
import {
    LockClosedIcon,
    XCircleIcon,
} from '@heroicons/react/solid';
import { OutletContext } from '~/types';
import { sessionStorage } from '~/sessions';
import { ShippingMethodSelector } from '~/components/checkout/ShippingMethodSelector';

export async function loader({ params, request }: DataFunctionArgs) {
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );
    const error = session.get('activeOrderError');

    const { eligibleShippingMethods } = await getEligibleShippingMethods({
        request,
    });

    return { eligibleShippingMethods, error };
}

export default function CheckoutPayment() {
    const { activeOrderFetcher, activeOrder } =
        useOutletContext<OutletContext>();

    const { eligibleShippingMethods, error } = useLoaderData<typeof loader>();

    let navigate = useNavigate();

    function navigateToPayment() {
        navigate('/checkout/payment');
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

    const canProceedToPayment = activeOrder?.shippingLines?.length;;

    return (
        <div className="flex flex-col divide-gray-200 divide-y">
            <div>
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
                <div className="mt-5">
                    <ShippingMethodSelector
                        eligibleShippingMethods={eligibleShippingMethods}
                        currencyCode={activeOrder?.currencyCode}
                        shippingMethodId={
                            activeOrder?.shippingLines[0]?.shippingMethod.id
                        }
                        onChange={submitSelectedShippingMethod}
                    />
                </div>
            </div>
            <button
                type="button"
                disabled={!canProceedToPayment}
                onClick={navigateToPayment}
                className="flex w-full items-center justify-center space-x-2 mt-20 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-500 disabled:bg-gray-400"
            >
                <LockClosedIcon className="w-5 h-5"></LockClosedIcon>
                <span>Proceed to Payment</span>
            </button>
        </div>
    );
}
