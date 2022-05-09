import { search } from '~/providers/products/products';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { ProductCard } from '~/components/products/ProductCard';

export async function loader({params, request}: DataFunctionArgs) {
    const url = new URL(request.url);
    const term = url.searchParams.get("q");
    const result = await search({
        input: {
            groupByProduct: true,
            term,
        }
    })
    return {
        term,
        result: result.search,
    }
}

export default function Search() {
    const { result, term } = useLoaderData<Awaited<ReturnType<typeof loader>>>();
    return (<div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-light tracking-tight text-gray-900 my-8">
            { term ? `Results for "${term}"` : 'All results' }
        </h2>

        <div className="max-w-2xl mx-auto py-16 px-4 lg:max-w-6xl">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {result.items.map(item => (
                    <ProductCard key={item.productId} {...item}></ProductCard>
                ))}
            </div>
        </div>
    </div>)
}
