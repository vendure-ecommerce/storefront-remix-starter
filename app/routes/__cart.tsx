import { Header } from '~/components/header/Header';
import { Outlet, ShouldReloadFunction } from '@remix-run/react';
import { CartTray } from '~/components/cart/CartTray';
import { useState } from 'react';
import { activeOrder } from '~/providers/orders/order';
import { DataFunctionArgs } from '@remix-run/server-runtime';

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


export default function Cart({children}: any) {
    const [open, setOpen] = useState(false)
    return (<><Header onCartIconClick={() => setOpen(!open)}/>
        <main className="">
            <Outlet/>
        </main>
        <CartTray open={open} onClose={setOpen}/></>)
}
