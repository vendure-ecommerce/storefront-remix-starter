import { DataFunctionArgs, MetaFunction, redirect } from "@remix-run/server-runtime";
import { useState } from "react";
import { Price } from "~/components/products/Price";
import { addItemToOrder } from "~/providers/orders/order";
import { getProductBySlug } from "~/providers/products/products";
import { Form, useLoaderData, useMatches, useTransition } from '@remix-run/react';
import { CheckIcon, HeartIcon } from '@heroicons/react/solid';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { APP_META_TITLE } from '~/constants';
import { CartLoaderData } from '~/routes/__cart';

export type Product = Awaited<ReturnType<typeof loader>>;

export const meta: MetaFunction = ({data}) => {
    return {title: `${data.name} - ${APP_META_TITLE}`};
};

export async function loader({params}: DataFunctionArgs) {
    const productRes = await getProductBySlug(params.slug!);
    if (!productRes.product) {
        throw new Response("Not Found", {
            status: 404,
        });
    }

    return productRes.product!;
}

export async function action({request, params}: DataFunctionArgs) {
    const body = await request.formData();
    const variantId = body.get("variantId")?.toString();
    const quantity = Number(body.get("quantity")?.toString() ?? 1);
    if (!variantId || !(quantity > 0)) {
        return {errors: ["Oops, invalid input" + quantity + variantId]};
    }
    const res = await addItemToOrder(variantId, quantity, {request});
    return redirect(`/products/${params.slug}`, {headers: res._headers});
}

export default function ProductSlug() {
    const product = useLoaderData<Product>();
    const cartLoaderData = useMatches().find(match => match.id === 'routes/__cart')?.data as CartLoaderData | undefined;
    const [selectedVariantId, setSelectedVariantId] = useState(
        product.variants[0].id
    );
    const transition = useTransition();
    const selectedVariant = product.variants.find(
        (v) => v.id === selectedVariantId
    )!;
    const qtyInCart = cartLoaderData?.activeOrder?.lines.find(l => l.productVariant.id === selectedVariantId)?.quantity ?? 0;

    const asset = product.assets[0];
    const brandName = product.facetValues.find(
        (fv) => fv.facet.code === "brand"
    )?.name;

    return (
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-5xl font-light tracking-tight text-gray-900 my-8">
                {product.name}
            </h2>
            <Breadcrumbs
                items={
                    product.collections[product.collections.length - 1]?.breadcrumbs ?? []
                }
            ></Breadcrumbs>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
                {/* Image gallery */}
                <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                  <span className="rounded-md overflow-hidden">
                    <div className="w-full h-full object-center object-cover rounded-lg">
                      <img
                          src={product.featuredAsset?.preview + '?w=800'}
                          alt={product.name}
                          className="w-full h-full object-center object-cover rounded-lg"
                      />
                    </div>
                  </span>
                </div>

                {/* Product info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>

                        <div
                            className="text-base text-gray-700 space-y-6"
                            dangerouslySetInnerHTML={{__html: product.description}}
                        />
                    </div>
                    <Form method="post">
                        {1 < product.variants.length ? (
                            <div>
                                <label
                                    htmlFor="option"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Location
                                </label>
                                <select
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    id="productVariant"
                                    value={selectedVariantId}
                                    name="variantId"
                                    onChange={(e) => setSelectedVariantId(e.target.value)}
                                >
                                    {product.variants.map(variant => (
                                        <option key={variant.id} value={variant.id}>{variant.name}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <input type="hidden" name="variantId" value={selectedVariantId}></input>
                        )}

                        <div className="mt-10 flex flex-col md:flex-row items-center">
                            <p className="text-3xl text-gray-900 mr-4">
                                <Price priceWithTax={selectedVariant.priceWithTax}
                                       currencyCode={selectedVariant.currencyCode}></Price>
                            </p>
                            <div className="flex sm:flex-col1 align-baseline">
                                <button
                                    type="submit"
                                    className={`max-w-xs flex-1 ${transition.state !== 'idle' ? 'bg-gray-400' : qtyInCart === 0 ? 'bg-indigo-600' : 'bg-green-600'}
                                     transition-colors border border-transparent rounded-md py-3 px-8 flex items-center
                                      justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none 
                                      focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full`}
                                    disabled={transition.state !== 'idle'}
                                >
                                    {qtyInCart ? <span className='flex items-center'><CheckIcon className='w-5 h-5 mr-1' /> {qtyInCart} in cart</span> : `Add to cart`}
                                </button>

                                <button
                                    type="button"
                                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <HeartIcon
                                        className="h-6 w-6 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Add to favorites</span>
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="details-heading" className="mt-12">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>
                        </section>
                    </Form>
                </div>
            </div>
        </div>
    );
}
