import { SearchFacetValuesQuery, SearchQuery } from '~/generated/graphql';

export interface FacetWithValues {
  id: string;
  name: string;
  values: Array<{
    id: string;
    name: string;
    selected: boolean;
  }>;
}

export class FacetFilterTracker {
  private _facetsWithValues: FacetWithValues[] = [];

  get facetsWithValues() {
    return this._facetsWithValues;
  }

  update(
    searchResult: SearchQuery['search'],
    resultWithoutFacetValueFilters: SearchFacetValuesQuery['search'],
    activeFacetValueIds: string[],
  ) {
    this._facetsWithValues = this.groupFacetValues(
      resultWithoutFacetValueFilters,
      searchResult.facetValues,
      activeFacetValueIds,
    );
  }

  private groupFacetValues(
    withoutFilters: SearchFacetValuesQuery['search'],
    current: SearchQuery['search']['facetValues'] | null,
    activeFacetValueIds: string[],
  ): FacetWithValues[] {
    if (!current) {
      return [];
    }
    const facetMap = new Map<string, FacetWithValues>();
    for (const {
      facetValue: { id, name, facet },
      count,
    } of withoutFilters.facetValues) {
      if (count === withoutFilters.totalItems) {
        continue;
      }
      const facetFromMap = facetMap.get(facet.id);
      const selected = activeFacetValueIds.includes(id);
      if (facetFromMap) {
        facetFromMap.values.push({ id, name, selected });
      } else {
        facetMap.set(facet.id, {
          id: facet.id,
          name: facet.name,
          values: [{ id, name, selected }],
        });
      }
    }
    return Array.from(facetMap.values());
  }
}
