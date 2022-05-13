import { search, searchFacetValues } from '~/providers/products/products';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { ProductCard } from '~/components/products/ProductCard';
import { useRef, useState } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import { FilterIcon } from '@heroicons/react/solid';
import { filteredSearchLoader } from '~/utils/filtered-search-loader';

export const loader = filteredSearchLoader;

export default function Search() {
    const {result, resultWithoutFacetValueFilters, term, facetValueIds} = useLoaderData<Awaited<ReturnType<typeof loader>>>();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const facetValuesTracker = useRef(new FacetFilterTracker());
    facetValuesTracker.current.update(result, resultWithoutFacetValueFilters, facetValueIds);
    return (<div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
                {term ? `Results for "${term}"` : 'All results'}
            </h2>

            <button
                type="button"
                className="flex space-x-2 items-center border rounded p-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
            >
                <span>Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true"/>
            </button>
        </div>


        <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
            <FacetFilterControls facetFilterTracker={facetValuesTracker.current}
                                 mobileFiltersOpen={mobileFiltersOpen}
                                 setMobileFiltersOpen={setMobileFiltersOpen}/>
            <div className="sm:col-span-5 lg:col-span-4">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {result.items.map(item => (
                        <ProductCard key={item.productId} {...item}></ProductCard>
                    ))}
                </div>
            </div>
        </div>
    </div>)
}
