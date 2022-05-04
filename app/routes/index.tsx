import React from "react";
import { useLoaderData } from "@remix-run/react";
import { getCollections } from "../providers/collections/collections";
import { CollectionCard } from '~/components/collections/CollectionCard';

export async function loader({request}: any) {
    const collections = await getCollections(request);
    return {
        collections,
    };
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Index() {
    const {collections} = useLoaderData<LoaderData>();
    const headerImage = collections[0]?.featuredAsset?.preview;
    return (
        <>
            <div className="relative">
                {/* Decorative image and overlay */}
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                    {headerImage && <img
                        className="absolute inset-0 w-full"
                        src={headerImage + "?w=800"}
                        alt="header"
                    />}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-zinc-400 to-black mix-blend-darken"/>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gray-900 opacity-50"
                />
                <div
                    className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
                    <div className="relative group">
                        <div
                            className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-red-500 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="relative bg-zinc-800 bg-opacity-0 rounded-lg p-0">
                            <h1 className="text-6xl font-extrabold tracking-normal text-white lg:text-6xl">
                                Vendure Remix Starter
                            </h1>

                        </div>
                    </div>

                    <p className="mt-4 text-2xl text-white">
                        A headless commerce storefront starter kit built with{" "}
                        <a
                            href="https://www.vendure.io"
                            className="text-blue-300 hover:text-blue-500"
                        >
                            Vendure
                        </a>{" "}
                        &{" "}
                        <a
                            href="https://remix.run/"
                            className="text-red-300 hover:text-red-500"
                        >
                            Remix
                        </a>
                    </p>

                </div>
            </div>

            <section
                aria-labelledby="category-heading"
                className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
            >
                <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
                    <h2
                        id="category-heading"
                        className="text-2xl font-light tracking-tight text-gray-900"
                    >
                        Shop by Category
                    </h2>
                </div>

                <div className="mt-4 flow-root">
                    <div className="-my-2">
                        <div className="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
                            <div
                                className="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
                                {collections.map(collection => (
                                    <CollectionCard collection={collection}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 px-4 sm:hidden">
                    <a
                        href="#"
                        className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Browse all categories<span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </section>
        </>
    )
}
