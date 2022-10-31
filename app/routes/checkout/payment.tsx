import { DataFunctionArgs, redirect } from '@remix-run/server-runtime';
import {
    addPaymentToOrder,
    createStripePaymentIntent,
    generateBraintreeClientToken,
    getEligiblePaymentMethods,
    getNextOrderStates,
    transitionOrderToState,
} from '~/providers/checkout/checkout';
import { Form, useLoaderData, useOutletContext } from '@remix-run/react';
import { CreditCardIcon, XCircleIcon } from '@heroicons/react/solid';
import { OutletContext } from '~/types';
import { sessionStorage } from '~/sessions';
import { ErrorCode, ErrorResult, GenerateBraintreeClientTokenDocument, Order, OrderAddress } from '~/generated/graphql';
import { StripePayments } from '~/components/checkout/stripe/StripePayments';
import { DummyPayments } from '~/components/checkout/DummyPayments';
import { BraintreeDropIn } from '~/components/checkout/braintree/BraintreePayment';

export async function loader({ params, request }: DataFunctionArgs) {
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );
    const { eligiblePaymentMethods } = await getEligiblePaymentMethods({
        request,
    });
    const error = session.get('activeOrderError');
    let stripePaymentIntent: string | undefined;
    let stripePublishableKey: string | undefined;
    let stripeError: string | undefined;
    if (
        eligiblePaymentMethods.find((method) => method.code.includes('stripe'))
    ) {
        try {
            const stripePaymentIntentResult = await createStripePaymentIntent({
                request,
            });
            stripePaymentIntent =
                stripePaymentIntentResult.createStripePaymentIntent ??
                undefined;
            stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
        } catch (e: any) {
            stripeError = e.message;
        }
    }

    let brainTreeKey: string | undefined;
    let brainTreeToken: string | undefined;
    let brainTreeError: string | undefined;
    if (
        eligiblePaymentMethods.find((method) => method.code.includes('braintree'))
    ) {
        try {
            brainTreeKey = process.env.BRAINTREE_TOKENIZATION_KEY;
            //const stripePaymentIntentResult = await generateBraintreeClientToken({
            //    request,
            //});
            //brainTreeToken = stripePaymentIntentResult.generateBraintreeClientToken ?? undefined;
        } catch (e: any) {
            //brainTreeError = e.message;
        }
    }

    return {
        eligiblePaymentMethods,
        stripePaymentIntent,
        stripePublishableKey,
        stripeError,
        brainTreeKey,
        brainTreeToken,
        brainTreeError,
        error,
    };
}

export async function action({ params, request }: DataFunctionArgs) {
    const body = await request.formData();
    const paymentMethodCode = body.get('paymentMethodCode');
    const paymentNonce = body.get('paymentNonce');
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
            { method: paymentMethodCode, metadata: {nonce: paymentNonce} },
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
    const {
        eligiblePaymentMethods,
        stripePaymentIntent,
        stripePublishableKey,
        stripeError,
        brainTreeKey,
        brainTreeToken,
        brainTreeError,
        error,
    } = useLoaderData<typeof loader>();
    const { activeOrderFetcher, activeOrder } =
        useOutletContext<OutletContext>();

    const paymentError = getPaymentError(error);

    return (
        <div className="flex flex-col items-center divide-gray-200 divide-y">
            {eligiblePaymentMethods.map((paymentMethod) =>
                paymentMethod.code.includes('braintree') ? (
                    <div className="py-3 w-full" key={paymentMethod.id}>
                        {brainTreeError ? (
                            <div>
                                <p className="text-red-700 font-bold">
                                    Braintree error:
                                </p>
                                <p className="text-sm">{brainTreeError}</p>
                            </div>
                        ) : (
                            <BraintreeDropIn fullAmount={activeOrder?.totalWithTax ?? 0} show={true} authorization={brainTreeKey} onPaymentCompleted={() => alert("test")} />
                        )}
                    </div>
                ) :
                    paymentMethod.code.includes('stripe') ? (
                        <div className="py-12" key={paymentMethod.id}>
                            {stripeError ? (
                                <div>
                                    <p className="text-red-700 font-bold">
                                        Stripe error:
                                    </p>
                                    <p className="text-sm">{stripeError}</p>
                                </div>
                            ) : (
                                <StripePayments
                                    orderCode={activeOrder?.code ?? ''}
                                    clientSecret={stripePaymentIntent}
                                    publishableKey={stripePublishableKey}
                                ></StripePayments>
                            )}
                        </div>
                    ) : (
                        <div className="py-12" key={paymentMethod.id}>
                            <DummyPayments
                                paymentMethod={paymentMethod}
                                paymentError={paymentError}
                            />
                        </div>
                    ),
            )}
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
