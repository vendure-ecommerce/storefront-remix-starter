import React, { FormEvent, useEffect, useState } from 'react'
import dropin, { Dropin } from "braintree-web-drop-in"
import { sdk } from '~/graphqlWrapper';
import { Order } from '~/generated/graphql';
import { classNames } from '~/utils/class-names';
import { useSubmit, useTransition } from "@remix-run/react";
import { Form, useActionData } from '@remix-run/react';
import { DataFunctionArgs, redirect } from '@remix-run/server-runtime';
import {
    addPaymentToOrder,
    createStripePaymentIntent,
    generateBraintreeClientToken,
    getEligiblePaymentMethods,
    getNextOrderStates,
    transitionOrderToState,
} from '~/providers/checkout/checkout';

export function BraintreeDropIn(props: { show: boolean, authorization: string, fullAmount: number, onPaymentCompleted: Function }) {
    const { show, authorization, fullAmount, onPaymentCompleted } = props;

    const [braintreeInstance, setBraintreeInstance] = useState<Dropin>();

    const submit = useSubmit();

    let enablePaymentButton = true;

    const submitPayment = async () => {
        if(braintreeInstance){

            let request = new Request("");

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

            const requestPaymentResult = await braintreeInstance.requestPaymentMethod();
            const addPaymentResult = await addPaymentToOrder({ method: "braintree", metadata: requestPaymentResult }, {request});

            if (addPaymentResult.addPaymentToOrder.__typename === 'Order') {
                return redirect(
                    `/checkout/confirmation/${addPaymentResult.addPaymentToOrder.code}`,
                );
            } else {
                throw new Response('Not Found', {
                    status: 400,
                    statusText: addPaymentResult.addPaymentToOrder?.message,
                });
            }
        }
    };

    useEffect(() => {
        if (show) {
            const initializeBraintree = () => dropin.create({
                authorization: authorization,
                container: '#braintree-drop-in-div',
                paypal: {
                    flow: 'checkout',
                    amount: fullAmount,
                    currency: 'EUR',
                }
            }, function (error, instance) {
                if (error)
                    console.error(error)
                else if (instance != null) {
                    setBraintreeInstance(instance);
                    instance.on("paymentMethodRequestable", (payload) => {
                        if (payload.type === 'CreditCard') {
                            enablePaymentButton = true;
                        }
                        if (payload.type === 'PayPalAccount') {
                            submitPayment();
                        }
                    });
                }
            });

            if (braintreeInstance) {
                braintreeInstance
                    .teardown()
                    .then(() => {
                        initializeBraintree();
                    });
            } else {
                initializeBraintree();
            }
        }
    }, [show])

    return (
        <div
            style={{ display: `${show ? "block" : "none"}` }}
            className={"w-full h-full"}
        >
            <div
                id={"braintree-drop-in-div"}
            />

            <input
                type="hidden"
                name="paymentMethodCode"
                value={"braintree"}
            />
            <button onClick={submitPayment}
                className={"braintreePayButton w-full bg-primary-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary-500"}
                disabled={!braintreeInstance || !enablePaymentButton}>
                {
                    "Pay"
                }
            </button>
        </div>
    )
}