import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    ShouldReloadFunction,
    useFetcher,
} from "@remix-run/react";
import styles from "./styles/app.css";
import { Header } from "./components/header/Header";
import { DataFunctionArgs, MetaFunction, redirect } from "@remix-run/server-runtime";
import { getCollections } from '~/providers/collections/collections';
import { activeChannel } from '~/providers/channel/channel';
import { APP_META_TITLE } from '~/constants';
import { useEffect, useState } from 'react';
import { CartTray } from '~/components/cart/CartTray';
import { CartLoaderData } from '~/routes/active-order';
import { Fetcher } from '@remix-run/react/transition';

export const meta: MetaFunction = () => {
    return {title: APP_META_TITLE};
};

export function links() {
    return [
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
        },
        {rel: "stylesheet", href: styles},
    ];
}

// The root data does not change once loaded.
export const unstable_shouldReload: ShouldReloadFunction = () => false;

export async function loader({request}: DataFunctionArgs) {
    const collections = await getCollections(request);
    const topLevelCollections = collections.filter(
        collection => collection.parent?.name === "__root_collection__"
    )
    return {
        activeChannel: await activeChannel({request}),
        collections: topLevelCollections,
    };
}


export async function action({request, params}: DataFunctionArgs) {
    // const body = await request.formData();
    // const variantId = body.get("variantId")?.toString();
    // const quantity = Number(body.get("quantity")?.toString() ?? 1);
    // if (!variantId || !(quantity > 0)) {
    //     return {errors: ["Oops, invalid input" + quantity + variantId]};
    // }
    // const res = await addItemToOrder(variantId, quantity, {request});
    // return redirect(`/products/${params.slug}`, {headers: res._headers});
    const formData = await request.formData();
    console.log(`Root action called`, formData);
    console.log(`request.url`, request.url);
    return redirect(request.url);
}

export default function App() {
    const [open, setOpen] = useState(false);
    const activeOrderFetcher = useFetcher<CartLoaderData>();
    useEffect(() => {
        if (activeOrderFetcher.type === "init") {
            activeOrderFetcher.load("/active-order");
        }
    }, [activeOrderFetcher]);

    const {activeOrder} = activeOrderFetcher.data ?? {};
    return (
        <html lang="en" id="app">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link rel="icon" href="/favicon.ico" type="image/png"></link>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Header onCartIconClick={() => setOpen(!open)} cartQuantity={activeOrder?.totalQuantity ?? 0}/>
        <main className="">
            <Outlet context={{ activeOrderFetcher }}/>
        </main>
        <CartTray open={open} onClose={setOpen} activeOrder={activeOrder}/>
        <ScrollRestoration/>
        <Scripts/>
        {process.env.NODE_ENV === "development" && <LiveReload/>}
        <footer className="py-24 px-2 border-t mt-6">
            <div className="max-w-6xl mx-auto text-xs md:text-sm">
                <p>
                    Built with{" "}
                    <a
                        href="https://www.vendure.io/"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Vendure
                    </a>{" "}
                    &{" "}
                    <a
                        href="https://remix.run"
                        className="text-red-500 hover:text-red-700"
                    >
                        Remix
                    </a>
                </p>
                <p>
                    <a
                        className="font-medium text-gray-500 hover:text-gray-700"
                        href="https://github.com/vendure-ecommerce/storefront-remix-starter"
                    >
                        github.com/vendure-ecommerce/storefront-remix-starter
                    </a>
                </p>
            </div>
        </footer>
        </body>
        </html>
    );
}
