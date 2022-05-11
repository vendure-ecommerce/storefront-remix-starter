import { Header } from '~/components/header/Header';
import { Outlet, ShouldReloadFunction } from '@remix-run/react';
import { CartTray } from '~/components/cart/CartTray';
import { useState } from 'react';
import { activeOrder, addItemToOrder } from '~/providers/orders/order';
import { DataFunctionArgs, redirect } from '@remix-run/server-runtime';

export type CartLoaderData = Awaited<ReturnType<typeof loader>>;


export const unstable_shouldReload: ShouldReloadFunction =
    ({params, submission}) => {
        const shouldReload = submission && submission.action.startsWith('/search') !== true;
        return !!shouldReload;
    };

export async function loader({request}: DataFunctionArgs) {
    return {
        activeOrder: await activeOrder({request}),
    };
}

export async function action({request, params}: DataFunctionArgs) {
    const body = await request.formData();
    const variantId = body.get("variantId")?.toString();
    const quantity = Number(body.get("quantity")?.toString() ?? 1);
    if (!variantId || !(quantity > 0)) {
        return {errors: ["Oops, invalid input" + quantity + variantId]};
    }
    const result = await addItemToOrder(variantId, quantity, {request});
    return { activeOrder: result.addItemToOrder }
}



export default function Cart({children}: any) {
    return (<></>)
}
