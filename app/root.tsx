import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from "@remix-run/react";
import styles from "./styles/app.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { Header } from "./components/header/Header";
import { DataFunctionArgs, MetaFunction } from "@remix-run/server-runtime";
import { activeOrder } from "./providers/orders/order";
import { getCollections } from '~/providers/collections/collections';

export const meta: MetaFunction = () => {
    return {title: "New Remix App"};
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

type LoaderData = Awaited<ReturnType<typeof loader>>;

export async function loader({request}: DataFunctionArgs) {
    const collections = await getCollections(request);
    const topLevelCollections = collections.filter(
        collection => collection.parent?.name === "__root_collection__"
    )
    return {
        activeOrder: await activeOrder({request}),
        collections: topLevelCollections,
    };
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <html lang="en" id="app">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <link rel="icon" href="/favicon.ico" type="image/png"></link>
                <Meta/>
                <Links/>
            </head>
            <body>
            <Header/>
            <main className="">
                <Outlet/>
            </main>
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
        </ThemeProvider>
    );
}
