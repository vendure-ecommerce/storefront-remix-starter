import { Button, IconButton } from "@mui/material";
import { Menu, ShoppingCart } from "@mui/icons-material";
import { Logo } from "../Logo";
import { Link, useLoaderData } from "@remix-run/react";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { ShoppingBagIcon } from "@heroicons/react/outline"
import { Price } from "../products/Price";
import { loader } from '~/root';

type LoaderDataType = Awaited<ReturnType<typeof loader>>;

export function Header() {
    const data = useLoaderData<LoaderDataType>();
    const order = data?.activeOrder?.activeOrder;
    const total = order?.subTotalWithTax ?? 0;
    const cartQuantity = order?.totalQuantity ?? 0;
    const currency = order?.currencyCode ?? "USD";
    return (
        <header className="bg-gradient-to-r from-zinc-700 to-zinc-900 shadow-lg">
            <div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
                <h1 className="text-white w-10">
                    <Link to="/">
                        {/*<StaticImage*/}
                        {/*    src="../images/cube-logo-line-icon-nostroke-white.png"*/}
                        {/*    width={75}*/}
                        {/*    quality={95}*/}
                        {/*    placeholder={""}*/}
                        {/*    formats={["auto", "webp", "avif"]}*/}
                        {/*    alt="Vendure logo"*/}
                        {/*/>*/}
                    </Link>
                </h1>
                <div className="flex space-x-4 hidden sm:block">
                    {data.collections.map(collection => (
                        <Link
                            className="text-sm md:text-base text-gray-200 hover:text-white"
                            to={"/collections/" + collection.slug}
                            key={collection.id}
                        >
                            {collection.name}
                        </Link>
                    ))}
                </div>
                <div className="flex-1 md:pr-8">
                    {/*<SearchBar></SearchBar>*/}
                </div>
                <div className="">
                    <button
                        className="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"

                    >
                        <ShoppingBagIcon></ShoppingBagIcon>
                        {cartQuantity ? (<div
                            className="absolute rounded-full -top-2 -right-2 bg-blue-600 w-6 h-6">{cartQuantity}</div>) : ''}
                    </button>
                </div>
            </div>
        </header>
    );
}
