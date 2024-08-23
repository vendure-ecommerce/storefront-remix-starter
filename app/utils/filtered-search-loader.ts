import { search, searchFacetValues } from '~/providers/products/products';
import { redirect } from '@remix-run/server-runtime';

import { paginationValidationSchema } from '~/utils/pagination';
import { LoaderFunctionArgs } from '@remix-run/router';
import { SortOrder } from '~/generated/graphql';

function getSortOptions(order: string) {
  switch (order) {
    case 'price-from-expensive':
      return { price: SortOrder.Desc };
    case 'price-from-cheap':
      return { price: SortOrder.Asc }; // Ár növekvő sorrend
    case 'name-a-z':
      return { name: SortOrder.Asc }; // Név A-Z
    case 'name-z-a':
      return { name: SortOrder.Desc }; // Név Z-A
    default:
      return {}; // Alapértelmezett rendezés
  }
}

/**
 * This loader deals with loading product searches, which is used in both the search page and the
 * category list page.
 */
export function filteredSearchLoaderFromPagination(
  allowedPaginationLimits: Set<number>,
  paginationLimitMinimumDefault: number,
) {
  const searchPaginationSchema = paginationValidationSchema(
    allowedPaginationLimits,
  );

  return {
    validator: searchPaginationSchema,
    filteredSearchLoader: async ({ params, request }: LoaderFunctionArgs) => {
      const url = new URL(request.url);
      const term = url.searchParams.get('q');
      const facetValueIds = url.searchParams.getAll('fvid');
      const limit =
        url.searchParams.get('limit') ?? paginationLimitMinimumDefault;
      const page = url.searchParams.get('page') ?? 1;

      const order = url.searchParams.get('order') ?? 'default';

      const zodResult = searchPaginationSchema.safeParse({ limit, page });
      if (!zodResult.success) {
        url.search = '';
        throw redirect(url.href);
      }

      const sortOptions = getSortOptions(order);

      let resultPromises: [
        ReturnType<typeof search>,
        ReturnType<typeof searchFacetValues>,
      ];

      console.log(facetValueIds);
      const searchResultPromise = search(
        {
          input: {
            groupByProduct: true,
            term,
            facetValueFilters: [{ or: facetValueIds }],
            collectionSlug: params.slug,
            take: zodResult.data.limit,
            skip: (zodResult.data.page - 1) * zodResult.data.limit,
            sort: sortOptions,
          },
        },
        { request },
      );
      if (facetValueIds.length) {
        resultPromises = [
          searchResultPromise,
          searchFacetValues(
            {
              input: {
                groupByProduct: true,
                term,
                collectionSlug: params.slug,
              },
            },
            { request },
          ),
        ];
      } else {
        resultPromises = [searchResultPromise, searchResultPromise];
      }
      const [result, resultWithoutFacetValueFilters] = await Promise.all(
        resultPromises,
      );
      return {
        term,
        facetValueIds,
        result: result.search,
        resultWithoutFacetValueFilters: resultWithoutFacetValueFilters.search,
        appliedPaginationLimit: zodResult.data.limit,
        appliedPaginationPage: zodResult.data.page,
      };
    },
  };
}
