import type { Route } from './+types/search';
import { useLoaderData, useSubmit } from 'react-router';
import { useRef, useState } from 'react';
import { FacetFilterTracker } from '~/components/facet-filter/facet-filter-tracker';
import { filteredSearchLoaderFromPagination } from '~/utils/filtered-search-loader';
import { FiltersButton } from '~/components/FiltersButton';
import { ValidatedForm } from '@rvf/react-router';
import { withZod } from '@rvf/zod';
import { paginationValidationSchema } from '~/utils/pagination';
import { FilterableProductGrid } from '~/components/products/FilterableProductGrid';
import { useTranslation } from 'react-i18next';

const paginationLimitMinimumDefault = 25;
const allowedPaginationLimits = new Set<number>([
  paginationLimitMinimumDefault,
  50,
  100,
]);
const validator = withZod(paginationValidationSchema(allowedPaginationLimits));
const { filteredSearchLoader } = filteredSearchLoaderFromPagination(allowedPaginationLimits, paginationLimitMinimumDefault);

  export async function loader({ params, request, context }: Route.LoaderArgs) {
    const { result, resultWithoutFacetValueFilters, facetValueIds, appliedPaginationLimit, appliedPaginationPage, term } = await filteredSearchLoader({
      params,
      request,
      context,
    });

    return {
      term,
      result,
      resultWithoutFacetValueFilters,
      facetValueIds,
      appliedPaginationLimit,
      appliedPaginationPage,
    };
  }

export default function Search({ loaderData }: Route.ComponentProps) {
  const { result, resultWithoutFacetValueFilters, term, facetValueIds } = loaderData;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const facetValuesTracker = useRef(new FacetFilterTracker());
  facetValuesTracker.current.update(
    result,
    resultWithoutFacetValueFilters,
    facetValueIds,
  );
  const submit = useSubmit();
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {term
            ? `${t('common.resultsFor')} "${term}"`
            : t('common.allResults')}
        </h2>

        <FiltersButton
          filterCount={facetValueIds.length}
          onClick={() => setMobileFiltersOpen(true)}
        />
      </div>

      <ValidatedForm
        validator={validator}
        method="get"
        onChange={(e) => submit(e.currentTarget, { preventScrollReset: true })}
      >
        <FilterableProductGrid
          allowedPaginationLimits={allowedPaginationLimits}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          {...loaderData}
        />
      </ValidatedForm>
    </div>
  );
}
