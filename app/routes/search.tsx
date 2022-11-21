import { useLoaderData } from '@remix-run/react';
import { ProductCard } from '~/components/products/ProductCard';
import { useRef, useState } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import FacetFilterControls from '~/components/facet-filter/FacetFilterControls';
import { filteredSearchLoader } from '~/utils/filtered-search-loader';
import { FiltersButton } from '~/components/FiltersButton';

export const loader = filteredSearchLoader;

export default function Search() {
  const { result, resultWithoutFacetValueFilters, term, facetValueIds } =
    useLoaderData<typeof loader>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {term ? `Results for "${term}"` : 'All results'}
        </h2>

        <FiltersButton
          filterCount={facetValueIds.length}
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>

      <div className="mt-6 grid sm:grid-cols-5 gap-x-4">
        <FacetFilterControls
          facetFilterTracker={facetValuesTracker.current}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />
        <div className="sm:col-span-5 lg:col-span-4">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {result.items.map((item) => (
              <ProductCard key={item.productId} {...item}></ProductCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
