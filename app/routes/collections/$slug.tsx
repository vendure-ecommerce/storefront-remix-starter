import { DataFunctionArgs, MetaFunction } from "@remix-run/server-runtime";
import { useLoaderData } from '@remix-run/react';
import { sdk } from "../../graphqlWrapper";
import { CollectionCard } from '~/components/collections/CollectionCard';
import { search } from '~/providers/products/products';
import { ProductCard } from '~/components/products/ProductCard';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { APP_META_TITLE } from '~/constants';

export type CollectionWithProducts = Awaited<ReturnType<typeof loader>>;

export const meta: MetaFunction = ({ data }) => {
    return {title: `${data.collection.name} - ${APP_META_TITLE}`};
};

export async function loader({params}: DataFunctionArgs) {
    const {search: {items: products}} = await search({
        input: {
            collectionSlug: params.slug,
            take: 999,
            groupByProduct: true
        }
    });
    const collection = (await sdk.collection({slug: params.slug})).collection;
    if (!collection?.id || !collection?.name) throw "Collection not found";

    return {
        collection,
        products,
    };
}

export default function CollectionSlug() {
    const {collection, products} = useLoaderData<CollectionWithProducts>();
    return (<div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-light tracking-tight text-gray-900 my-8">
            {collection.name}
        </h2>

        <Breadcrumbs items={collection.breadcrumbs}></Breadcrumbs>
        {collection.children?.length ? (
            <div className="max-w-2xl mx-auto px-4 py-16 sm:py-16 lg:max-w-none">
                <h2 className="text-2xl font-light text-gray-900">Collections</h2>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                    {collection.children.map(child => (
                        <CollectionCard key={child.id} collection={child}></CollectionCard>
                    ))}
                </div>
            </div>
        ) : (
            ""
        )}

        <div className="max-w-2xl mx-auto py-16 px-4 lg:max-w-6xl">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map(item => (
                    <ProductCard key={item.productId} {...item}></ProductCard>
                ))}
            </div>
        </div>
    </div>)
}
