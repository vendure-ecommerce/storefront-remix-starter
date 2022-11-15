import {
    addItemToOrder,
    adjustOrderLine,
    getActiveOrder,
    removeOrderLine,
    setCustomerForOrder,
    setOrderBillingAddress,
    setOrderShippingAddress,
    setOrderShippingMethod,
} from '~/providers/orders/order';
import { DataFunctionArgs, json } from '@remix-run/server-runtime';
import {
    CreateAddressInput,
    CreateCustomerInput,
    ErrorCode,
    ErrorResult,
    OrderDetailFragment,
} from '~/generated/graphql';
import { sessionStorage } from '~/sessions';
import { shippingFormDataIsValid } from '~/utils/validation';
import {
    addPaymentToOrder,
    getNextOrderStates,
    transitionOrderToState,
} from '~/providers/checkout/checkout';
import {
    getActiveCustomer,
    updateCustomer,
} from '~/providers/customer/customer';
import { EU_COUNTRIES } from '~/constants';

export type CartLoaderData = Awaited<ReturnType<typeof loader>>;

export async function loader({ request }: DataFunctionArgs) {
    return {
        activeOrder: await getActiveOrder({ request }),
    };
}

async function switchChannel(
    session: any,
    request: Request,
    activeOrder: any,
    channel: string,
) {
    session.flash('channel', channel);

    const order = await getActiveOrder({ request });

    //Cancel order
    const result = await transitionOrderToState('Cancelled', {
        request,
    });
    activeOrder =
        result.transitionOrderToState?.__typename === 'Order'
            ? result.transitionOrderToState
            : activeOrder;

    request.headers.set('vendure-token', channel);

    if (order) {
        //Add all items again
        for (let i = 0; i < order!.lines.length; i++) {
            const addResult = await addItemToOrder(
                order!.lines[i].productVariant.id,
                order!.lines[i].quantity,
                { request },
            );
            activeOrder =
                addResult.addItemToOrder?.__typename === 'Order'
                    ? addResult.addItemToOrder
                    : activeOrder;
        }

        //Reset address
        if (activeOrder.customer) {
            const resetCustomerResult = await setCustomerForOrder(
                {
                    emailAddress: activeOrder.customer.emailAddress,
                    firstName: activeOrder.customer.firstName,
                    lastName: activeOrder.customer.lastName,
                },
                { request },
            );

            if (
                resetCustomerResult.setCustomerForOrder.__typename ===
                'Order'
            ) {
                activeOrder = resetCustomerResult.setCustomerForOrder;
            }
        }

        if (order.billingAddress && order.billingAddress?.countryCode) {
            const resetBilling = await setOrderBillingAddress(
                {
                    city: order.billingAddress.city,
                    company: order.billingAddress.company,
                    countryCode: order.billingAddress?.countryCode ?? '',
                    fullName: order.billingAddress.fullName,
                    postalCode: order.billingAddress.postalCode,
                    province: order.billingAddress.province,
                    streetLine1: order.billingAddress.streetLine1 ?? '',
                    streetLine2: order.billingAddress.streetLine2,
                },
                { request },
            );

            if (
                resetBilling.setOrderBillingAddress.__typename ===
                'Order'
            ) {
                activeOrder = resetBilling.setOrderBillingAddress;
            }
        }

        if (order.shippingAddress && order.shippingAddress?.countryCode) {
            const resetShippingAdress = await setOrderShippingAddress(
                {
                    city: order.shippingAddress.city,
                    company: order.shippingAddress.company,
                    countryCode:
                    order.shippingAddress.countryCode ?? '',
                    fullName: order.shippingAddress.fullName,
                    postalCode: order.shippingAddress.postalCode,
                    province: order.shippingAddress.province,
                    streetLine1:
                    order.shippingAddress.streetLine1 ?? '',
                    streetLine2: order.shippingAddress.streetLine2,
                },
                { request },
            );

            if (
                resetShippingAdress.setOrderShippingAddress
                    .__typename === 'Order'
            ) {
                activeOrder =
                    resetShippingAdress.setOrderShippingAddress;
            }
        }
    }

    return activeOrder;
}
export async function action({ request, params }: DataFunctionArgs) {
    const body = await request.formData();
    const formAction = body.get('action');
    let activeOrder: OrderDetailFragment | undefined = undefined;
    let error: ErrorResult | undefined;

    let headers: ResponseInit['headers'] = {};
    const session = await sessionStorage.getSession(
        request?.headers.get('Cookie'),
    );

    switch (formAction) {
        case 'setCheckoutShipping':
            if (shippingFormDataIsValid(body)) {
                const formData = Object.fromEntries<any>(body.entries());

                const isEu = EU_COUNTRIES.indexOf(formData.billing_countryCode) > -1;

                if (isEu && formData.channel == 'row') {
                    activeOrder = await switchChannel(session, request, activeOrder, "eu");
                } else if (!isEu && formData.channel == 'eu') {
                    activeOrder = await switchChannel(session, request, activeOrder, "row");
                }

                const activeCustomerResult = await getActiveCustomer({
                    request,
                });

                if (!activeCustomerResult.activeCustomer?.user?.verified) {
                    //Guest
                    const setCustomerForOrderResult = await setCustomerForOrder(
                        {
                            emailAddress: formData.emailAddress,
                            firstName: formData.billing_firstName,
                            lastName: formData.billing_lastName,
                        },
                        { request },
                    );
                    if (
                        setCustomerForOrderResult.setCustomerForOrder
                            .__typename === 'Order'
                    ) {
                        activeOrder =
                            setCustomerForOrderResult.setCustomerForOrder;
                    } else {
                        error = setCustomerForOrderResult.setCustomerForOrder;
                        break;
                    }
                } else {
                    //Signed in
                    await updateCustomer(
                        {
                            firstName: formData.billing_firstName,
                            lastName: formData.billing_lastName,
                        },
                        { request },
                    );
                }

                let billingAddr = {
                    city: formData.billing_city,
                    company: formData.billing_company,
                    countryCode: formData.billing_countryCode,
                    customFields: formData.billing_customFields,
                    fullName:
                        formData.billing_firstName +
                        ' ' +
                        formData.billing_lastName,
                    phoneNumber: formData.billing_phoneNumber,
                    postalCode: formData.billing_postalCode,
                    province: formData.billing_province,
                    streetLine1: formData.billing_streetLine1,
                    streetLine2: formData.billing_streetLine2,
                };

                const resultSetBilling = await setOrderBillingAddress(
                    billingAddr,
                    { request },
                );

                if (
                    resultSetBilling.setOrderBillingAddress.__typename ===
                    'Order'
                ) {
                    activeOrder = resultSetBilling.setOrderBillingAddress;
                } else {
                    error = resultSetBilling.setOrderBillingAddress;
                    break;
                }

                const resultSetShipping = await setOrderShippingAddress(
                    formData.useDifferentShippingAddress
                        ? {
                              city: formData.shipping_city,
                              company: formData.shipping_company,
                              countryCode: formData.shipping_countryCode,
                              customFields: formData.shipping_customFields,
                              fullName:
                                  formData.shipping_firstName +
                                  ' ' +
                                  formData.shipping_lastName,
                              phoneNumber: formData.shipping_phoneNumber,
                              postalCode: formData.shipping_postalCode,
                              province: formData.shipping_province,
                              streetLine1: formData.shipping_streetLine1,
                              streetLine2: formData.shipping_streetLine2,
                          }
                        : billingAddr,
                    { request },
                );

                if (
                    resultSetShipping.setOrderShippingAddress.__typename ===
                    'Order'
                ) {
                    activeOrder = resultSetShipping.setOrderShippingAddress;
                } else {
                    error = resultSetShipping.setOrderShippingAddress;
                    break;
                }
            }
            break;
        case 'setShippingMethod': {
            const shippingMethodId = body.get('shippingMethodId');
            if (typeof shippingMethodId === 'string') {
                const result = await setOrderShippingMethod(shippingMethodId, {
                    request,
                });
                if (result.setOrderShippingMethod.__typename === 'Order') {
                    activeOrder = result.setOrderShippingMethod;
                } else {
                    error = result.setOrderShippingMethod;
                }
            }
            break;
        }
        case 'removeItem': {
            const lineId = body.get('lineId');
            const result = await removeOrderLine(lineId?.toString() ?? '', {
                request,
            });
            if (result.removeOrderLine.__typename === 'Order') {
                activeOrder = result.removeOrderLine;
            } else {
                error = result.removeOrderLine;
            }
            break;
        }
        case 'adjustItem': {
            const lineId = body.get('lineId');
            const quantity = body.get('quantity');
            if (lineId && quantity != null) {
                const result = await adjustOrderLine(
                    lineId?.toString(),
                    +quantity,
                    { request },
                );
                if (result.adjustOrderLine.__typename === 'Order') {
                    activeOrder = result.adjustOrderLine;
                } else {
                    error = result.adjustOrderLine;
                }
            }
            break;
        }
        case 'addItemToOrder': {
            const variantId = body.get('variantId')?.toString();
            const quantity = Number(body.get('quantity')?.toString() ?? 1);
            if (!variantId || !(quantity > 0)) {
                throw new Error(
                    `Invalid input: variantId ${variantId}, quantity ${quantity}`,
                );
            }
            const result = await addItemToOrder(variantId, quantity, {
                request,
            });
            if (result.addItemToOrder.__typename === 'Order') {
                activeOrder = result.addItemToOrder;
            } else {
                error = result.addItemToOrder;
            }
            break;
        }
        case 'addPaymentToOrder': {
        }
        case 'switchChannel': {
            const channel = body.get('channel');

            activeOrder = await  switchChannel(session, request, activeOrder, channel?.toString() ?? "row");

            break;
        }
        default:
        // Don't do anything
    }
    request.headers.delete('vendure-token');

    session.flash('activeOrderError', error);
    headers = {
        'Set-Cookie': await sessionStorage.commitSession(session),
    };
    return json(
        { activeOrder: activeOrder || (await getActiveOrder({ request })) },
        {
            headers,
        },
    );
}
